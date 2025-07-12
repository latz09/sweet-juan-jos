// pages/api/onlineOrderingWebhook.js
import crypto from 'crypto';
import { sanityClient } from '@/lib/sanityConnection';

export const config = { api: { bodyParser: false } };

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
		return res.status(405).send('Method Not Allowed');
	}

	const rawBody = await getRawBody(req);
	const signature = req.headers['x-square-hmacsha256-signature'];
	const signatureKey = process.env.OL_WEBHOOK_KEY;
	// const webhookUrl = process.env.OL_WEBHOOK_URL;
	const webhookUrl = 'https://sweet-juan-jos-git-online-ordering-sweet-juanjos.vercel.app/api/onlineOrderingWebhook';

	console.log('🔐 Webhook URL from env:', webhookUrl);
	console.log('🔑 Signature present:', !!signature);

	// Verify webhook signature
	const hmac = crypto
		.createHmac('sha256', signatureKey)
		.update(webhookUrl + rawBody)
		.digest('base64');

	if (hmac !== signature) {
		console.error('❌ Invalid webhook signature');
		console.error('Expected:', hmac);
		console.error('Received:', signature);
		return res.status(403).send('Invalid signature');
	}

	let event;
	try {
		event = JSON.parse(rawBody);
	} catch (err) {
		console.error('❌ Invalid JSON body:', err);
		return res.status(400).send('Invalid JSON');
	}

	console.log('✅ Webhook event:', event.type);

	// Check both 'payment.updated' and 'payment' event types
	if (
		event.type === 'payment.updated' ||
		(event.type === 'payment' && event.data?.object?.payment)
	) {
		const payment = event.data.object.payment;
		const { status, id: paymentId, order_id: squareOrderId } = payment;

		console.log('💳 Payment status:', status);
		console.log('💳 Payment ID:', paymentId);
		console.log('📦 Square Order ID:', squareOrderId);

		if (status === 'COMPLETED') {
			console.log(`💸 Payment completed: ${paymentId}`);

			try {
				// Instead of fetching from Square, find the order by squareOrderId
				// We stored the Square order ID in our checkout process
				console.log('🔍 Finding order with Square Order ID:', squareOrderId);

				// First, let's find all pending orders to see what we have
				const pendingOrders = await sanityClient.fetch(
					`*[_type == "submittedOrder" && status == "pending"] {
						_id,
						squareOrderId,
						createdAt,
						total
					}`,
					{}
				);

				console.log('📦 Found pending orders:', pendingOrders);

				// Find the most recent pending order (within last 5 minutes)
				const fiveMinutesAgo = new Date(
					Date.now() - 5 * 60 * 1000
				).toISOString();
				const recentOrder = pendingOrders
					.filter((order) => order.createdAt > fiveMinutesAgo)
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

				if (!recentOrder) {
					console.warn('❗ No recent pending order found');
					return res
						.status(200)
						.json({ success: false, message: 'No recent order found' });
				}

				const orderId = recentOrder._id;
				console.log('📦 Found order:', orderId);

				// Update order status in Sanity
				console.log('📝 Updating order status to paid...');
				await sanityClient
					.patch(orderId)
					.set({
						status: 'paid',
						paidAt: new Date().toISOString(),
						paymentId,
						squareOrderId,
						customerEmail: payment.buyer_email_address || '',
					})
					.commit();

				console.log(`✅ Order ${orderId} marked as paid`);

				// TODO: Send confirmation email
				// const emailOptions = generateOrderEmail({ order, payment });
				// await transporter.sendMail(emailOptions);
				// console.log('📧 Confirmation email sent');
			} catch (err) {
				console.error('❌ Webhook processing error:', err);
				console.error('Error stack:', err.stack);
				return res.status(500).send('Webhook processing failed');
			}
		} else {
			console.log(`⏭️ Payment status ${status} - skipping`);
		}
	} else {
		console.log(`⏭️ Event type ${event.type} - not handled`);
	}

	return res.status(200).json({ success: true });
}
