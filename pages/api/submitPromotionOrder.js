import { v4 as uuidv4 } from 'uuid';
import { sanityClient } from '@/lib/sanityConnection';
import transporter from '@/lib/nodemailer';
import { createCheckoutLink } from '@/lib/createCheckoutLink';

import { generateKatieJosPromotionOrder } from '@/components/promotions/email-templates/promotions/generateKatieJosPromotionOrder';
import { generateCustomerConfirmationEmail } from '@/components/promotions/email-templates/promotions/generateAutoReplyEmailForPromotion';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res
			.status(405)
			.json({ message: `Method ${req.method} not allowed` });
	}

	try {
		// 1) Destructure request
		const {
			cartData = [],
			street = '',
			city = '',
			zip = '',
			name = 'N/A',
			email = 'N/A',
			phone = 'N/A',
			recipientName = '',
			giftNote = '',
			promotionDetails = {},
			orderMethod = '',
			payNow = false,
			cartTotal = '0',
			slug = '',
		} = req.body;

		// 2) Additional from promotionDetails
		const {
			deliveryDetails = '',
			pickupDetails = '',
			giftOption = false,
		} = promotionDetails;

		// 3) Generate payment link unconditionally
		let paymentLink = await createCheckoutLink({
			cartData,
			name,
			email,
			street,
			city,
			zip,
			phone,
			orderMethod,
			slug,
		});

		// 4) Prepare the doc for Sanity (now we can safely reference paymentLink if we want to store it)
		const fullAddress = [street, city, zip].filter(Boolean).join(', ');

		const doc = {
			_type: 'promotionOrders',
			createdAt: new Date().toISOString(),
			orderedBy: {
				name,
				email,
				phone,
				address: fullAddress,
				orderMethod,
				payNow,
			},
			recipientDetails: {
				recipientName,
				giftNote,
			},
			items: cartData.map((item) => ({
				_key: uuidv4(),
				_type: 'cartItem',
				name: item.name,
				price: item.price,
				quantity: item.quantity,
			})),

			// Optionally store the link at the top level.
			// If you only want it once, add it here (not inside every item).
			paymentLink,
		};

		// 5) Create doc in Sanity
		const sanityResult = await sanityClient.create(doc);

		// 6) Generate email content (pass paymentLink so they can use or display it)
		const internalEmailContent = generateKatieJosPromotionOrder({
			name,
			email,
			phone,
			recipientName,
			giftNote,
			street,
			city,
			zip,
			orderMethod,
			payNow,
			promotionDetails,
			cartData,
			cartTotal,
			
		});

		const customerEmailContent = generateCustomerConfirmationEmail({
			name,
			email,
			phone,
			recipientName,
			giftNote,
			street,
			city,
			zip,
			orderMethod,
			promotionDetails,
			cartData,
			payNow,
			paymentLink,
		});

		// 7) Send both emails concurrently
		const internalEmailPromise = transporter.sendMail({
			from: 'Promotional Order Received <sweetjuanjos@gmail.com>',
			to: process.env.CLIENT_EMAIL,
			// to: 'jordan@latzwebdesign.com',
			subject: internalEmailContent.subject,
			text: internalEmailContent.text,
			html: internalEmailContent.html,
		});

		const customerEmailPromise = transporter.sendMail({
			from: 'Sweet Juanjos <sweetjuanjos@gmail.com>',
			to: email, // Send to customer
			subject: customerEmailContent.subject,
			text: customerEmailContent.text,
			html: customerEmailContent.html,
		});

		await Promise.all([internalEmailPromise, customerEmailPromise]);

		// 8) Respond
		return res.status(200).json({
			success: true,
			message: 'Order submitted to Sanity and emails sent successfully.',
			data: sanityResult,
			paymentLink,
		});
	} catch (error) {
		console.error('Error submitting order to Sanity or sending emails:', error);
		return res.status(500).json({
			success: false,
			message: 'Something went wrong.',
			error: error.message,
		});
	}
}
