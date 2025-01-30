import { v4 as uuidv4 } from 'uuid';
import { sanityClient } from '@/lib/sanityConnection';
import { generateKatieJosPromotionOrder } from '@/components/promotions/email-templates/promotions/generateKatieJosPromotionOrder';
import { generateCustomerConfirmationEmail } from '@/components/promotions/email-templates/promotions/generateAutoReplyEmailForPromotion';
import transporter from '@/lib/nodemailer';
import { createCheckoutLink } from '@/lib/createCheckoutLink';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ message: `Method ${req.method} not allowed` });
	}

	try {
		// 1. Destructure request
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
			slug = '',
		} = req.body;

		// 2. Additional from promotionDetails
		const {
			deliveryDetails = '',
			pickupDetails = '',
			giftOption = false,
		} = promotionDetails;

		// 3. Create doc for Sanity
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
		};

		const sanityResult = await sanityClient.create(doc);

		// 4. Generate email content for internal notification
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
			promotionDetails, // includes pickup/delivery, giftOption, etc.
			cartData,
		});

		// 5. Generate customer confirmation email content
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
		});

		// 6. Send both emails concurrently
		const internalEmailPromise = transporter.sendMail({
			from: 'Promotional Order Received <sweetjuanjos@gmail.com>',
			// to: 'sweetjuanjos@gmail.com',
			to: process.env.CLIENT_EMAIL,
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

		// Await both emails to finish sending
		await Promise.all([internalEmailPromise, customerEmailPromise]);

		let paymentLink = null;
		if (payNow) {
		  paymentLink = await createCheckoutLink({
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
		}

		// 7. Respond
		return res.status(200).json({
			success: true,
			message: 'Order submitted to Sanity and emails sent successfully.',
			data: sanityResult, paymentLink,
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
