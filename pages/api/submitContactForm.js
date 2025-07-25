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

// Date formatting function
const formatDate = (dateString) => {
	const date = new Date(dateString);
	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

	// Adding the suffix (st, nd, rd, th) to the day
	const day = date.getDate();
	let daySuffix;
	if (day > 3 && day < 21) daySuffix = 'th';
	else
		switch (day % 10) {
			case 1:
				daySuffix = 'st';
				break;
			case 2:
				daySuffix = 'nd';
				break;
			case 3:
				daySuffix = 'rd';
				break;
			default:
				daySuffix = 'th';
				break;
		}

	// Inject suffix before the year
	return formattedDate.replace(`${day}`, `${day}${daySuffix}`);
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

		// Format the event date
		const formattedEventDate = safeEventDate
			? formatDate(safeEventDate)
			: 'N/A';

		// Generate image URLs using Sanity's image URL builder
		const imageUrls = uploadedImages.map(
			(image) =>
				`https://cdn.sanity.io/images/5veay66n/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${image.asset._ref.split('-')[1]}-${image.asset._ref.split('-')[2]}.${image.asset._ref.split('-')[3]}`
		);

		// Nodemailer email sending code
		const mailOptions = {
			from: `Contact Form Submission <${email[0]}>`,
			to: process.env.CLIENT_EMAIL,
			subject: `Thank you, ${name[0]}, for your interest in Sweet Juanjo's! `,
			text: `A new form has been submitted with the following details:
            Name: ${name[0]}
            Email: ${email[0]}
            Phone Number: ${phoneNumber[0]}
            Event Date: ${formattedEventDate}
            Amount: ${amount[0]}
            Interests: ${parsedInterests}
            Additional Details: ${additionalDetails[0]}
            You can view the form submission here: https://sweet-juanjos.sanity.studio/structure/contactForm`,
			html: `
            <p>A new form has been submitted with the following details:</p>
            <ul>
                <li><strong>Name:</strong> ${name[0]}</li>
                <li><strong>Email:</strong> ${email[0]}</li>
                <li><strong>Phone Number:</strong> <a href="tel:${phoneNumber[0]}">${phoneNumber[0]}</a></li>
                <li><strong>Event Date:</strong> ${formattedEventDate}</li>
                <li><strong>Interests:</strong> ${parsedInterests}</li>
                <li><strong>Amount:</strong> ${amount[0]}</li>
                <li><strong>Additional Details:</strong> ${additionalDetails[0]}</li>
            </ul>
            <p><Strong>Inspiration Photos:</Strong></p>
            <ul>
                ${imageUrls.map((url) => `<li><img src="${url}" alt="Inspiration Photo" style="max-width: 100%;"></li>`).join('')}
            </ul>
            <a href="https://sweet-juanjos.sanity.studio/structure/contactForm" target="_blank">
                <p>You can view the form submission here.</p>
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
