// pages/api/promotionsOrderingWebhook.js

import crypto from 'crypto';
import transporter from '@/lib/nodemailer';
import { generateCustomerConfirmationEmail } from '@/components/promotions/email-templates/promotions/generateAutoReplyEmailForPromotion';
import { generateKatieJosPromotionOrder } from '@/components/promotions/email-templates/promotions/generateKatieJosPromotionOrder';
import { sanityClient } from '@/lib/sanityConnection';

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
	let data = '';
	for await (const chunk of req) data += chunk;
	return data;
}

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		return res.status(405).send('Method Not Allowed');
	}

	const WEBHOOK_URL = process.env.PROMO_WEBHOOK_URL;
	const SIGNATURE_KEY = process.env.PROMO_WEBHOOK_KEY;

	const rawBody = await getRawBody(req);
	const signature =
		req.headers['x-square-hmacsha256-signature'] ||
		req.headers['x-square-signature'];

	const expectedHmac = crypto
		.createHmac('sha256', SIGNATURE_KEY)
		.update(WEBHOOK_URL + rawBody)
		.digest('base64');

	if (signature !== expectedHmac) {
		console.warn('❌ [PROMO WEBHOOK] Invalid signature');
		return res.status(401).send('Unauthorized');
	}

	let event;
	try {
		event = JSON.parse(rawBody);
	} catch (err) {
		console.error('❌ [PROMO WEBHOOK] Malformed JSON:', err);
		return res.status(400).send('Bad Request');
	}

	if (event.type === 'payment.updated') {
		const payment = event.data?.object?.payment;
		if (payment?.status === 'COMPLETED') {
			try {
				// Get Square Order ID from payment
				const squareOrderId = payment.order_id;

				if (!squareOrderId) {
					console.warn('⚠️ [PROMO WEBHOOK] No order_id in payment');
					return res.status(200).send('OK');
				}

				console.log(
					'🔍 [PROMO WEBHOOK] Looking for order with Square Order ID:',
					squareOrderId
				);

				// Find pending order that matches this Square Order ID
				const order = await sanityClient.fetch(
					`*[_type=="promotionOrders" 
					   && status=="pending" 
					   && squareOrderId == $squareOrderId
					][0]`,
					{ squareOrderId }
				);

				if (!order) {
					console.warn(
						'⚠️ [PROMO WEBHOOK] No matching pending order found for Square Order ID:',
						squareOrderId
					);
					return res.status(200).send('OK');
				}

				console.log('🎯 [PROMO WEBHOOK] Found matching order:', order._id);

				// Update order to 'paid' status
				const updatedOrder = await sanityClient
					.patch(order._id)
					.set({
						status: 'paid',
						paidAt: new Date().toISOString(),
						paymentId: payment.id,
						squareOrderId: payment.order_id,
						customerEmail: payment.buyer_email_address || '',
					})
					.commit();

				console.log(
					'✅ [PROMO WEBHOOK] Order updated to paid:',
					updatedOrder._id
				);

				// Prepare data for email generation
				const {
					orderedBy = {},
					recipientDetails = {},
					items = [],
					selectedDateTime = {},
				} = updatedOrder;

				const cartData = items.map((item) => ({
					name: item.name,
					price: item.price,
					quantity: item.quantity,
				}));

				const cartTotal = cartData.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				);

				// Extract address components
				const addressParts = (orderedBy.address || '').split(', ');
				const street = addressParts[0] || '';
				const city = addressParts[1] || '';
				const zip = addressParts[2] || '';

				// Generate emails with the SAME data structure as submitPromotionOrder
				const customerEmail = generateCustomerConfirmationEmail({
					name: orderedBy.name || '',
					email: orderedBy.email || '',
					phone: orderedBy.phone || '',
					paymentLink: updatedOrder.paymentLink || '',
					recipientName: recipientDetails.recipientName || '',
					giftNote: recipientDetails.giftNote || '',
					street,
					city,
					zip,
					payNow: true, // They paid, so this is true
					orderMethod: orderedBy.orderMethod || 'pickup',
					promotionDetails: {}, // Webhook doesn't have access to full promotion details
					cartData,
					selectedDate: selectedDateTime.date || '',
					selectedTimeSlot: selectedDateTime.timeSlot || '',
				});

				const internalEmail = generateKatieJosPromotionOrder({
					cartData,
					orderMethod: orderedBy.orderMethod || 'pickup',
					name: orderedBy.name || '',
					email: orderedBy.email || '',
					phone: orderedBy.phone || '',
					recipientName: recipientDetails.recipientName || '',
					giftNote: recipientDetails.giftNote || '',
					street,
					city,
					zip,
					cartTotal,
					payNow: true,
					promotionDetails: {},
					selectedDate: selectedDateTime.date || '',
					selectedTimeSlot: selectedDateTime.timeSlot || '',
				});

				// Send both emails
				await Promise.all([
					transporter.sendMail({
						from: 'Sweet Juanjos <sweetjuanjos@gmail.com>',
						to: orderedBy.email,
						subject: customerEmail.subject,
						html: customerEmail.html,
					}),
					transporter.sendMail({
						from: 'Promotional Order - Payment Received <sweetjuanjos@gmail.com>',
						to: process.env.CLIENT_EMAIL,
						subject: internalEmail.subject,
						text: internalEmail.text,
						html: internalEmail.html,
					}),
				]);

				console.log('📧 [PROMO WEBHOOK] Confirmation emails sent');
			} catch (err) {
				console.error(
					'❌ [PROMO WEBHOOK] Error updating Sanity or sending emails:',
					err
				);
				return res.status(500).send('Server Error');
			}
		}
	}

	return res.status(200).send('OK');
}
