import crypto from 'crypto';
import { sanityClient } from '@/lib/sanityConnection';

export const config = { api: { bodyParser: false } };

// hardcode your ngrok URL and webhook key here:
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
	const signature = req.headers['x-square-hmacsha256-signature'];

	// Verify webhook signature
	if (!signature) {
		console.error('❌ Missing signature header');
		return res.status(403).json({ message: 'Missing signature' });
	}

	const hmac = crypto
		.createHmac('sha256', SIGNATURE_KEY)
		.update(WEBHOOK_URL + rawBody)
		.digest('base64');

	if (hmac !== signature) {
		console.error('❌ Invalid webhook signature');
		return res.status(403).json({ message: 'Invalid signature' });
	}

	let event;
	try {
		event = JSON.parse(rawBody);
	} catch (err) {
		console.error('❌ Invalid JSON body:', err);
		return res.status(400).json({ message: 'Invalid JSON' });
	}

	console.log('✅ Webhook event type:', event.type);

	// now handle the payment.updated event
	if (event.type === 'payment.updated') {
		const payment = event.data?.object?.payment;
		if (!payment) {
			console.warn('❌ No payment object found');
			return res.status(200).json({ success: true });
		}

		const { status, id: paymentId, order_id: squareOrderId } = payment;
		console.log('💳 Payment status:', status, 'ID:', paymentId);

		if (status === 'COMPLETED') {
			try {
				const thirtyMinutesAgo = new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString();
				const pendingOrders = await sanityClient.fetch(
					`*[_type == "submittedOrder" && status == "pending" && createdAt > $time] | order(createdAt desc)`,
					{ time: thirtyMinutesAgo }
				);

				if (!pendingOrders.length) {
					console.warn('❗ No recent pending orders found');
					return res.status(200).json({ success: false });
				}

				const order = pendingOrders[0];
				await sanityClient
					.patch(order._id)
					.set({
						status: 'paid',
						paidAt: new Date().toISOString(),
						paymentId,
						squareOrderId,
						customerEmail: payment.buyer_email_address || '',
					})
					.commit();

				console.log(`✅ Order ${order._id} marked as paid`);
				return res.status(200).json({ success: true });
			} catch (err) {
				console.error('❌ Error processing payment webhook:', err);
				return res
					.status(500)
					.json({ success: false, error: 'Failed to process payment' });
			}
		}
	} else {
		console.log(`⏭️ Event type ${event.type} – not handled`);
	}

	return res.status(200).json({ success: true });
}
