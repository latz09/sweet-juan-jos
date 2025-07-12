// Temporarily disable signature verification to test the webhook logic
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
	console.log('🌍 Environment:', process.env.NODE_ENV);

	if (req.method !== 'POST') {
		return res.status(405).send('Method Not Allowed');
	}

	const rawBody = await getRawBody(req);
	const signature = req.headers['x-square-hmacsha256-signature'];
	const signatureKey = process.env.OL_WEBHOOK_KEY;
	// const webhookUrl = process.env.OL_WEBHOOK_URL;
	const webhookUrl = process.env.OL_WEBHOOK_URL;

	console.log('🔐 Webhook URL from env:', webhookUrl);
	console.log('🔑 Signature present:', !!signature);
	console.log('🔑 Signature key present:', !!signatureKey);

	// TEMPORARILY SKIP SIGNATURE VERIFICATION FOR TESTING
	console.log('⚠️ SKIPPING SIGNATURE VERIFICATION FOR TESTING');
	/*
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
	console.log('✅ Signature verified');
	*/

	let event;
	try {
		event = JSON.parse(rawBody);
	} catch (err) {
		console.error('❌ Invalid JSON body:', err);
		return res.status(400).send('Invalid JSON');
	}

	console.log('✅ Webhook event:', event.type);
	console.log('📄 Event data keys:', Object.keys(event.data || {}));

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
				// First, let's find all pending orders to see what we have
				const pendingOrders = await sanityClient.fetch(
					`*[_type == "submittedOrder" && status == "pending"] {
						_id,
						squareOrderId,
						createdAt,
						total,
						contactInfo
					}`,
					{}
				);

				console.log('📦 Found pending orders:', pendingOrders.length);

				// Find the most recent pending order (within last 15 minutes)
				const fifteenMinutesAgo = new Date(
					Date.now() - 15 * 60 * 1000
				).toISOString();

				const recentOrders = pendingOrders
					.filter((order) => order.createdAt > fifteenMinutesAgo)
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

				console.log('📦 Recent orders (last 15 min):', recentOrders.length);

				if (recentOrders.length === 0) {
					console.warn('❗ No recent pending order found');
					return res
						.status(200)
						.json({ success: false, message: 'No recent order found' });
				}

				// Take the most recent order
				const recentOrder = recentOrders[0];
				const orderId = recentOrder._id;
				console.log('📦 Using order:', orderId);

				// Update order status in Sanity
				console.log('📝 Updating order status to paid...');
				const result = await sanityClient
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
				console.log('📝 Update result:', result);

				return res.status(200).json({
					success: true,
					message: `Order ${orderId} updated successfully`,
				});
			} catch (err) {
				console.error('❌ Webhook processing error:', err);
				console.error('Error stack:', err.stack);
				return res.status(500).json({
					success: false,
					error: err.message,
				});
			}
		} else {
			console.log(`⏭️ Payment status ${status} - skipping`);
			return res.status(200).json({
				success: true,
				message: `Payment status ${status} - not processed`,
			});
		}
	} else {
		console.log(`⏭️ Event type ${event.type} - not handled`);
		return res.status(200).json({
			success: true,
			message: `Event type ${event.type} not handled`,
		});
	}

	return res.status(200).json({ success: true });
}
