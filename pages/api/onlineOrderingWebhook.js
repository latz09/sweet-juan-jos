// pages/api/onlineOrderingWebhook.js
import crypto from 'crypto';
import { sanityClient } from '@/lib/sanityConnection';

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
	let data = '';
	for await (const chunk of req) data += chunk;
	return data;
}

export default async function handler(req, res) {
	// Only POST allowed
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		return res.status(405).send('Method Not Allowed');
	}

	const WEBHOOK_URL = process.env.OL_WEBHOOK_URL;
	const SIGNATURE_KEY = process.env.OL_WEBHOOK_KEY;
	if (!WEBHOOK_URL || !SIGNATURE_KEY) {
		console.error(
			'❌ Webhook misconfigured: missing OL_WEBHOOK_URL or OL_WEBHOOK_KEY'
		);
		return res.status(500).send('Webhook misconfigured');
	}

	// Read raw body for signature verification
	const rawBody = await getRawBody(req);
	const signature =
		req.headers['x-square-hmacsha256-signature'] ||
		req.headers['x-square-signature'];
	if (!signature) {
		console.warn('❌ Missing signature header');
		return res.status(401).send('Unauthorized');
	}

	// Verify HMAC
	const expectedHmac = crypto
		.createHmac('sha256', SIGNATURE_KEY)
		.update(WEBHOOK_URL + rawBody)
		.digest('base64');

	if (signature !== expectedHmac) {
		console.warn('❌ Invalid signature');
		return res.status(401).send('Unauthorized');
	}

	// Parse the event
	let event;
	try {
		event = JSON.parse(rawBody);
	} catch (err) {
		console.error('❌ Malformed JSON:', err);
		return res.status(400).send('Bad Request');
	}

	// Only process completed payments
	if (event.type === 'payment.updated') {
		const payment = event.data?.object?.payment;
		if (payment?.status === 'COMPLETED') {
			try {
				// Find the most recent pending order in the last 30 minutes
				const thirtyMinAgo = new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString();
				const order = await sanityClient.fetch(
					`*[_type=="submittedOrder" && status=="pending" && createdAt > $t]
            | order(createdAt desc)[0]`,
					{ t: thirtyMinAgo }
				);

				if (order) {
					await sanityClient
						.patch(order._id)
						.set({
							status: 'paid',
							paidAt: new Date().toISOString(),
							paymentId: payment.id,
							squareOrderId: payment.order_id,
							customerEmail: payment.buyer_email_address || '',
						})
						.commit();
					console.log(`✅ Order ${order._id} marked as paid`);
				} else {
					console.warn('⚠️ No pending order found to update');
				}
			} catch (err) {
				console.error('❌ Error updating Sanity order:', err);
				return res.status(500).send('Server Error');
			}
		}
	}

	// Acknowledge all other events
	return res.status(200).send('OK');
}
