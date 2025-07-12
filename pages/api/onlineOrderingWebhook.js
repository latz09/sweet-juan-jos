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
	console.log('🔗 Request headers:', JSON.stringify(req.headers, null, 2));

	if (req.method !== 'POST') {
		console.log('❌ Method not allowed:', req.method);
		return res.status(405).send('Method Not Allowed');
	}

	const rawBody = await getRawBody(req);
	const signature = req.headers['x-square-hmacsha256-signature'];
	const signatureKey = process.env.OL_WEBHOOK_KEY;
	// const webhookUrl = process.env.OL_WEBHOOK_URL;
	const webhookUrl = 'https://sweet-juan-jos-git-online-ordering-sweet-juanjos.vercel.app/api/onlineOrderingWebhook';

	console.log('🔐 Webhook URL from env:', webhookUrl);
	console.log('🔑 Signature present:', !!signature);
	console.log('🔑 Signature key present:', !!signatureKey);
	console.log('📄 Raw body length:', rawBody.length);

	// TEMPORARILY SKIP SIGNATURE VERIFICATION FOR TESTING
	console.log('⚠️ SKIPPING SIGNATURE VERIFICATION FOR TESTING');
	
	// Uncomment this when you're ready to verify signatures
	/*
	if (!signature || !signatureKey) {
		console.error('❌ Missing signature or signature key');
		return res.status(403).send('Missing signature');
	}

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
		console.log('📨 Full event object:', JSON.stringify(event, null, 2));
	} catch (err) {
		console.error('❌ Invalid JSON body:', err);
		return res.status(400).send('Invalid JSON');
	}

	console.log('✅ Webhook event type:', event.type);
	console.log('📄 Event data keys:', Object.keys(event.data || {}));

	// Check both 'payment.updated' and 'payment' event types
	if (
		event.type === 'payment.updated' ||
		(event.type === 'payment' && event.data?.object?.payment)
	) {
		const payment = event.data.object.payment;
		const { status, id: paymentId, order_id: squareOrderId } = payment;

		console.log('💳 Payment details:');
		console.log('  - Status:', status);
		console.log('  - Payment ID:', paymentId);
		console.log('  - Square Order ID:', squareOrderId);
		console.log('  - Buyer Email:', payment.buyer_email_address);

		if (status === 'COMPLETED') {
			console.log(`💸 Payment completed: ${paymentId}`);

			try {
				// Log Sanity connection status
				console.log('🔌 Attempting to connect to Sanity...');
				
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
				console.log('📦 Pending orders:', JSON.stringify(pendingOrders, null, 2));

				// Find the most recent pending order (within last 15 minutes)
				const fifteenMinutesAgo = new Date(
					Date.now() - 15 * 60 * 1000
				).toISOString();

				console.log('⏰ Looking for orders after:', fifteenMinutesAgo);

				const recentOrders = pendingOrders
					.filter((order) => {
						console.log(`📅 Order ${order._id} created at: ${order.createdAt}`);
						return order.createdAt > fifteenMinutesAgo;
					})
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

				console.log('📦 Recent orders (last 15 min):', recentOrders.length);

				if (recentOrders.length === 0) {
					console.warn('❗ No recent pending order found');
					console.warn('❗ All pending orders:', pendingOrders.map(o => ({
						id: o._id,
						created: o.createdAt,
						total: o.total
					})));
					return res
						.status(200)
						.json({ success: false, message: 'No recent order found' });
				}

				// Take the most recent order
				const recentOrder = recentOrders[0];
				const orderId = recentOrder._id;
				console.log('📦 Using order:', orderId);
				console.log('📦 Order details:', JSON.stringify(recentOrder, null, 2));

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
				console.log('📝 Update result:', JSON.stringify(result, null, 2));

				return res.status(200).json({
					success: true,
					message: `Order ${orderId} updated successfully`,
					orderId,
					paymentId
				});
			} catch (err) {
				console.error('❌ Webhook processing error:', err);
				console.error('❌ Error name:', err.name);
				console.error('❌ Error message:', err.message);
				console.error('❌ Error stack:', err.stack);
				return res.status(500).json({
					success: false,
					error: err.message,
					errorName: err.name
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

