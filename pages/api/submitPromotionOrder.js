// pages/api/submitPromotionOrder.js

import { sanityClient } from '@/lib/sanityConnection';
import transporter from '@/lib/nodemailer';
import { generateAutoReplyEmailForPromotion } from '@/components/promotions/email-templates/promotions/generateAutoReplyEmailForPromotion';
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
			giftOption,
			autoResponseEmailData,
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
			giftOption: !!giftOption, // Convert to boolean
		};

		const sanityResult = await sanityClient.create(doc);

		// 3. Generate internal email content
		const internalEmailContent = generateKatieJosPromotionOrder({
			itemTitle,
			method,
			name,
			email,
			phone,
			recipientName,
			giftNote,
			address,
			payNow,
			giftOption,
		});

		// 4. Generate auto-response email content
		const autoReplyEmailContent = generateAutoReplyEmailForPromotion({
			itemTitle,
			method,
			name,
			email,
			phone,
			recipientName,
			giftNote,
			address,
			payNow,
			giftOption,
			autoResponseEmailData,
		});

		// 5. Send internal email
		const internalEmailPromise = transporter.sendMail({
			from: 'Order Form <latzwebresources@gmail.com>',
			to: 'sweetjuanjos@gmail.com',
			subject: internalEmailContent.subject,
			text: internalEmailContent.text,
			html: internalEmailContent.html,
		});

		// 6. Send auto-response email to customer
		const autoResponseEmailPromise = transporter.sendMail({
			from: 'Katie Jo <sweetjuanjos@gmail.com>', // Replace with your sender email
			to: email,
			subject: autoReplyEmailContent.subject,
			text: autoReplyEmailContent.text,
			html: autoReplyEmailContent.html,
		});

		// Await both email promises
		await Promise.all([internalEmailPromise, autoResponseEmailPromise]);

		// 7. Respond with success
		return res.status(200).json({
			success: true,
			message: 'Order submitted and emails sent successfully.',
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
