// pages/api/onlineOrderingWebhook.js
import crypto from 'crypto';
import { sanityClient } from '@/lib/sanityConnection';

export const config = { api: { bodyParser: false } };

// 🔒 Hard‑code your live webhook URL and signing key for testing:
const WEBHOOK_URL =
	'https://sweet-juan-jos-git-online-ordering-sweet-juanjos.vercel.app/api/onlineOrderingWebhook';
const SIGNATURE_KEY = 'P0SJCv0JS88OISMLTqpNQw';

async function getRawBody(req) {
	let data = '';
	for await (const chunk of req) {
		data += chunk;
	}
	return data;
}

export default async function handler(req, res) {
	console.log('🔔 Webhook received:', req.method, req.url);

	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const rawBody = await getRawBody(req);
	// Try both possible header names
	const signature =
		req.headers['x-square-hmacsha256-signature'] ||
		req.headers['x-square-signature'];

	if (!signature) {
		console.error('❌ Missing signature header');
		return res.status(401).json({ message: 'Missing signature' });
	}

	// Compute HMAC over the exact URL + raw body
	const hmac = crypto
		.createHmac('sha256', SIGNATURE_KEY)
		.update(WEBHOOK_URL + rawBody)
		.digest('base64');

	if (hmac !== signature) {
		console.error('❌ Signature mismatch');
		return res.status(401).json({ message: 'Invalid signature' });
	}

	let event;
	try {
		event = JSON.parse(rawBody);
	} catch (err) {
		console.error('❌ Invalid JSON:', err);
		return res.status(400).json({ message: 'Malformed JSON' });
	}

	console.log('✅ Webhook event type:', event.type);

	// Only act on completed payments
	if (event.type === 'payment.updated') {
		const payment = event.data?.object?.payment;
		if (payment?.status === 'COMPLETED') {
			try {
				const thirtyMinAgo = new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString();
				// Grab the most recent pending order
				const order = await sanityClient.fetch(
					`*[_type=="submittedOrder" && status=="pending" && createdAt > $t]
            | order(createdAt desc)[0]`,
					{ t: thirtyMinAgo }
				);
				if (!order) {
					console.warn('❗ No pending order found in last 30m');
					return res.status(200).json({ success: true });
				}

				// Patch to “paid”
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
				return res.status(200).json({ success: true });
			} catch (err) {
				console.error('❌ Error updating Sanity:', err);
				return res.status(500).json({ message: 'Server error' });
			}
		}
	}

	// Ignore other event types
	return res.status(200).json({ success: true });
}
