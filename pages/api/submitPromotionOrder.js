import { sanityClient } from '@/lib/sanityConnection';
import transporter from '@/lib/nodemailer';
import { generateKatieJosPromotionOrder } from '@/components/promotions/email-templates/promotions/generateKatieJosPromotionOrder';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res
			.status(405)
			.json({ message: `Method ${req.method} not allowed` });
	}

	try {
		// 1. Parse JSON from request body
		const {
			itemTitle,
			method,
			name,
			email,
			phone,
			recipientName,
			giftNote,
			address,
			payNow,
		} = req.body;

		// 2. Store in Sanity
		const doc = {
			_type: 'promotionOrders',
			itemTitle: itemTitle || 'Unknown Item',
			method: method || 'Unknown',
			name: name || 'N/A',
			email: email || 'N/A',
			phone: phone || 'N/A',
			recipientName: recipientName || '',
			giftNote: giftNote || '',
			address: address || '',
			createdAt: new Date().toISOString(),
			payNow: !!payNow, // Convert to boolean
		};

		const sanityResult = await sanityClient.create(doc);

		// 3. Generate email content using the template
		const emailContent = generateKatieJosPromotionOrder({
			itemTitle,
			method,
			name,
			email,
			phone,
			recipientName,
			giftNote,
			address,
			payNow,
		});

		// 4. Send Email
		await transporter.sendMail({
			from: 'Order Form <latzwebresources@gmail.com>',
			to: 'jordan@latzwebdesign.com',
			subject: emailContent.subject,
			text: emailContent.text,
			html: emailContent.html,
		});

		// 5. Respond with success
		return res.status(200).json({
			success: true,
			message: 'Order submitted and stored in Sanity successfully',
			data: sanityResult,
		});
	} catch (error) {
		console.error('Error submitting promotion order:', error);
		return res.status(500).json({
			success: false,
			message: 'Something went wrong submitting the order.',
			error: error.message,
		});
	}
}
