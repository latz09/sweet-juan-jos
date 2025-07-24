import crypto from 'crypto';
import transporter from '@/lib/nodemailer';
import { generateCustomerEmail } from '@/components/promotions/email-templates/online-ordering/generateCustomerEmail';
import { generateInternalEmail } from '@/components/promotions/email-templates/online-ordering/generateInternalEmail';
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

	const WEBHOOK_URL = process.env.OL_WEBHOOK_URL;
	const SIGNATURE_KEY = process.env.OL_WEBHOOK_KEY;

	const rawBody = await getRawBody(req);
	const signature =
		req.headers['x-square-hmacsha256-signature'] ||
		req.headers['x-square-signature'];

	const expectedHmac = crypto
		.createHmac('sha256', SIGNATURE_KEY)
		.update(WEBHOOK_URL + rawBody)
		.digest('base64');

	if (signature !== expectedHmac) {
		console.warn('❌ Invalid signature');
		return res.status(401).send('Unauthorized');
	}

	let event;
	try {
		event = JSON.parse(rawBody);
	} catch (err) {
		console.error('❌ Malformed JSON:', err);
		return res.status(400).send('Bad Request');
	}

	if (event.type === 'payment.updated') {
		const payment = event.data?.object?.payment;
		if (payment?.status === 'COMPLETED') {
			try {
				const thirtyMinAgo = new Date(
					Date.now() - 30 * 60 * 1000
				).toISOString();
				const order = await sanityClient.fetch(
					`*[_type=="submittedOrder" && status=="pending" && createdAt > $t][0]`,
					{ t: thirtyMinAgo }
				);

				if (!order) {
					console.warn('⚠️ No pending order found to update');
					return res.status(200).send('OK');
				}

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

				const onlineOrderingSettings = await sanityClient.fetch(
					`*[_type=="onlineOrderingSettings"][0]`
				);

				const customerEmail = generateCustomerEmail(
					updatedOrder,
					onlineOrderingSettings
				);
				const internalEmail = generateInternalEmail(
					updatedOrder,
					onlineOrderingSettings
				);

				await Promise.all([
					transporter.sendMail({
						from: 'Sweet Juanjos <sweetjuanjos@gmail.com>',
						to: updatedOrder.contactInfo.email,
						subject: customerEmail.subject,
						text: customerEmail.text,
						html: customerEmail.html,
					}),
					transporter.sendMail({
						from: 'Sweet Juanjos <sweetjuanjos@gmail.com>',
						to: process.env.CLIENT_EMAIL,
						subject: internalEmail.subject,
						text: internalEmail.text,
						html: internalEmail.html,
					}),
				]);

				console.log('📧 Emails sent to customer and owner');
			} catch (err) {
				console.error('❌ Error updating Sanity or sending emails:', err);
				return res.status(500).send('Server Error');
			}
		}
	}

	return res.status(200).send('OK');
}
