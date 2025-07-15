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
		return res.status(405).json({ message: 'Method Not Allowed' });
	}

	const rawBody = await getRawBody(req);
	const signature = req.headers['x-square-hmacsha256-signature'];
	const signatureKey = process.env.OL_WEBHOOK_KEY;

	// Dynamically build full webhook URL
	const protocol = req.headers['x-forwarded-proto'] || 'https';
	const host = req.headers['host'];
	const webhookUrl = `${protocol}://${host}${req.url}`;

	// Verify webhook signature
	if (!signature || !signatureKey || !webhookUrl) {
		console.error('❌ Missing required webhook configuration');
		return res.status(403).json({ message: 'Missing webhook configuration' });
	}

	const hmac = crypto
		.createHmac('sha256', signatureKey)
		.update(webhookUrl + rawBody)
		.digest('base64');

	if (hmac !== signature) {
		console.error('❌ Invalid webhook signature');
		console.error('Expected HMAC:', hmac);
		console.error('Received Signature:', signature);
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

	// Handle payment completion
	if (event.type === 'payment.updated') {
		const payment = event.data?.object?.payment;

		if (!payment) {
			console.log('❌ No payment object found');
			return res
				.status(200)
				.json({ success: true, message: 'No payment object' });
		}

		const { status, id: paymentId, order_id: squareOrderId } = payment;

		console.log('💳 Payment status:', status, 'ID:', paymentId);

		if (status === 'COMPLETED') {
			console.log(`💸 Payment completed: ${paymentId}`);

			try {
				const thirtyMinutesAgo = new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString();

				const pendingOrders = await sanityClient.fetch(
					`*[_type == "submittedOrder" && status == "pending" && createdAt > $thirtyMinutesAgo] | order(createdAt desc)`,
					{ thirtyMinutesAgo }
				);

				console.log('📦 Found recent pending orders:', pendingOrders.length);

				if (pendingOrders.length === 0) {
					console.warn('❗ No recent pending orders found');
					return res.status(200).json({
						success: false,
						message: 'No recent pending orders found',
					});
				}

				const order = pendingOrders[0];
				const orderId = order._id;

				console.log('📦 Updating order:', orderId);

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

				return res.status(200).json({
					success: true,
					message: `Order ${orderId} updated successfully`,
				});
			} catch (err) {
				console.error('❌ Error processing payment webhook:', err);
				return res.status(500).json({
					success: false,
					error: 'Failed to process payment',
				});
			}
		} else {
			console.log(`⏭️ Payment status ${status} - not processing`);
		}
	} else {
		console.log(`⏭️ Event type ${event.type} - not handled`);
	}

	return res.status(200).json({ success: true });
}
