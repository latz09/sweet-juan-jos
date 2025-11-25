// pages/api/submitPromotionOrder.js

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
			selectedDate = '',
			selectedTimeSlot = '',
		} = req.body;

		// 2) Additional from promotionDetails
		const {
			deliveryDetails = '',
			pickupDetails = '',
			giftOption = false,
		} = promotionDetails;

		// 3) Generate payment link and get Square Order ID
		const { url: paymentLink, orderId: squareOrderId } =
			await createCheckoutLink({
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

		// 4) Prepare the doc for Sanity
		const fullAddress = [street, city, zip].filter(Boolean).join(', ');

		const doc = {
			_type: 'promotionOrders',
			status: 'pending', // Explicitly set initial status
			createdAt: new Date().toISOString(),
			orderedBy: {
				name,
				email,
				phone,
				address: fullAddress,
				orderMethod,
				payNow,
			},
			selectedDateTime: {
				date: selectedDate,
				timeSlot: selectedTimeSlot,
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
			paymentLink,
			squareOrderId, // Store Square Order ID for webhook matching
		};

		// 5) Create doc in Sanity
		const sanityResult = await sanityClient.create(doc);

		// 6) ONLY send emails if Pay Later (payNow === false)
		// For Pay Now, the webhook will send emails after payment confirmation
		if (!payNow) {
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
				selectedDate,
				selectedTimeSlot,
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
				selectedDate,
				selectedTimeSlot,
			});

			// Send both emails concurrently
			await Promise.all([
				transporter.sendMail({
					from: 'Promotional Order Received <sweetjuanjos@gmail.com>',
					to: process.env.CLIENT_EMAIL,
					subject: internalEmailContent.subject,
					text: internalEmailContent.text,
					html: internalEmailContent.html,
				}),
				transporter.sendMail({
					from: 'Sweet Juanjos <sweetjuanjos@gmail.com>',
					to: email,
					subject: customerEmailContent.subject,
					text: customerEmailContent.text,
					html: customerEmailContent.html,
				}),
			]);

			console.log('📧 Emails sent for Pay Later order');
		} else {
			console.log(
				'💳 Pay Now order created - emails will be sent by webhook after payment'
			);
		}

		// 7) Respond
		return res.status(200).json({
			success: true,
			message: payNow
				? 'Order submitted to Sanity successfully. Emails will be sent after payment confirmation.'
				: 'Order submitted to Sanity and emails sent successfully.',
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
