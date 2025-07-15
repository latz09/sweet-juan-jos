// pages/api/onlineOrderingWebhook.js
import crypto from 'crypto';
import { sanityClient } from '@/lib/sanityConnection';

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  let data = '';
  for await (const chunk of req) data += chunk;
  return data;
}

// 🔒 Hard‑coded for testing:
const WEBHOOK_URL =
  'https://fbfb80034188.ngrok-free.app/api/onlineOrderingWebhook';
const SIGNATURE_KEY = 'P0SJCv0JS88OISMLTqpNQw';

export default async function handler(req, res) {
  console.log('🔔 Webhook received:', req.method, req.url);
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const rawBody = await getRawBody(req);
  // Square might send either header name
  const signature =
    req.headers['x-square-hmacsha256-signature'] ||
    req.headers['x-square-signature'];
  console.log('🪪 Incoming signature header:', signature);

  // Compute the HMAC over the exact URL + raw body
  const computedHmac = crypto
    .createHmac('sha256', SIGNATURE_KEY)
    .update(WEBHOOK_URL + rawBody)
    .digest('base64');
  console.log('🔑 Computed HMAC:', computedHmac);

  // ——— OPTION A: Strict check ———
  if (signature !== computedHmac) {
    console.error('❌ Signature mismatch; rejecting with 401');
    return res.status(401).send('Invalid signature');
  }
  console.log('✅ Signature verified');

  // ——— OPTION B: Bypass check for now ———
  // comment out the `if (signature !== computedHmac)` block
  // to force the handler to continue and let you verify order updates

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (err) {
    console.error('❌ Invalid JSON body:', err);
    return res.status(400).send('Invalid JSON');
  }
  console.log('📬 Webhook event type:', event.type);

  if (event.type === 'payment.updated') {
    const payment = event.data?.object?.payment;
    if (payment?.status === 'COMPLETED') {
      try {
        const since = new Date(Date.now() - 30 * 60 * 1000).toISOString();
        const order = await sanityClient.fetch(
          `*[_type=="submittedOrder" && status=="pending" && createdAt > $t]
            | order(createdAt desc)[0]`,
          { t: since }
        );
        if (!order) {
          console.warn('⚠️ No pending order found');
          return res.status(200).json({ success: true });
        }

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
        return res.status(500).send('Processing error');
      }
    }
  }

  // For all other events just return 200
  return res.status(200).json({ success: true });
}
