import { sanityClient } from '@/lib/sanityConnection';
import transporter from '../../lib/nodemailer';
import multiparty from 'multiparty';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const config = {
	api: {
		bodyParser: false,
	},
};

const parseForm = (req, form) => {
	return new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) reject(err);
			else resolve({ fields, files });
		});
	});
};

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
		return;
	}

	const form = new multiparty.Form({ uploadDir: '/tmp' });

	try {
		const { fields, files } = await parseForm(req, form);

		const {
			name,
			email,
			phoneNumber,
			eventDate,
			amount,
			interests,
			additionalDetails,
			readTermsAndConditions,
		} = fields;

		const safeEventDate =
			eventDate && !isNaN(new Date(eventDate).getTime())
				? new Date(eventDate).toISOString()
				: null;

		let parsedInterests;
		try {
			parsedInterests = JSON.parse(interests[0]);
		} catch (e) {
			throw new Error('Invalid JSON in interests field');
		}

		const uploadedImages = await Promise.all(
			(files.inspirationPhotos || []).map(async (file) => {
				try {
					const asset = await sanityClient.assets.upload(
						'image',
						fs.createReadStream(file.path),
						{
							filename: file.originalFilename,
						}
					);
					fs.unlinkSync(file.path); // Clean up temp file
					return {
						_type: 'image',
						asset: {
							_type: 'reference',
							_ref: asset._id,
						},
						_key: uuidv4(), // Add unique key for each image
					};
				} catch (uploadError) {
					fs.unlinkSync(file.path); // Ensure temp file is cleaned up on error
					throw new Error('Failed to upload image');
				}
			})
		);

		const result = await sanityClient.create({
			_type: 'contactForm',
			name: name[0],
			email: email[0],
			phoneNumber: phoneNumber[0],
			eventDate: safeEventDate,
			amount: parseInt(amount[0], 10),
			interests: parsedInterests,
			inspirationPhotos: uploadedImages,
			additionalDetails: additionalDetails[0],
			sentAt: new Date().toISOString(),
			status: 'active', // Set status to active
			readTermsAndConditions: readTermsAndConditions[0] === 'true',
		});

		const mailOptions = {
			from: `Request Information Form <${email}>`,
			to: process.env.CLIENT_EMAIL, // Replace with your client's email address
			subject: `${name} Submitted a Request Information Form`,
			text: `A new form has been submitted with the following details:
			Name: ${name}
			Email: ${email}
			Phone Number: ${phoneNumber}
			Message: ${message}
			You can view the form submission here: https://www.sweetjuanjos.com/admin/contact-forms`,
			html: `
			<p>A new form has been submitted with the following details:</p>
			<ul>
				<li><strong>Name:</strong> ${name}</li>
				<li><strong>Email:</strong> ${email}</li>
				<li><strong>Phone Number:</strong> ${phoneNumber}</li>
				<li><strong>Event Date:</strong> ${eventDate}</li>
				<li><strong>Amount:</strong> ${amount}</li>
				<li><strong>Additional Details:</strong> ${additionalDetails}</li>
				
			</ul>
			<a href="https://www.sweetjuanjos.com/admin/contact-forms" target="_blank">
				<p>View your Contact Forms</p>
			</a>
`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({
			success: true,
			message: 'Form submitted successfully',
			data: result,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
}
