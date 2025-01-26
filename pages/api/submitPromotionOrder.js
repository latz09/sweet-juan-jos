import { sanityClient } from '@/lib/sanityConnection';
import transporter from '@/lib/nodemailer';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res
			.status(405)
			.json({ message: `Method ${req.method} not allowed` });
	}

	try {
		// 1. Parse JSON from request body
		const {
			itemTitle,
			method,
			name,
			email,
			phone,
			recipientName,
			giftNote,
			address,
			payNow,
		} = req.body;

		// 2. Store in Sanity
		const doc = {
			_type: 'promotionOrders',
			itemTitle: itemTitle || 'Unknown Item',
			method: method || 'Unknown',
			name: name || 'N/A',
			email: email || 'N/A',
			phone: phone || 'N/A',
			recipientName: recipientName || '',
			giftNote: giftNote || '',
			address: address || '',
			createdAt: new Date().toISOString(),
			payNow: !!payNow, // Convert to boolean
		};

		const sanityResult = await sanityClient.create(doc);

		// 3. Send Email
		await transporter.sendMail({
			from: 'Order Form <latzwebresources@gmail.com>', // or your desired "from"
			to: 'jordan@latzwebdesign.com',
			subject: `New Promotion Order from ${name || 'Unknown'}`,
			text: `
        A new order has been submitted!
        Item: ${itemTitle}
        Method: ${method}
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Recipient: ${recipientName}
        Gift Note: ${giftNote}
        Address: ${address}
        Pay Now? ${payNow ? 'Yes' : 'No'}

        See your Sanity Studio for more info.
      `,
			html: `
        <h3>A new order has been submitted!</h3>
        <ul>
          <li><strong>Item:</strong> ${itemTitle}</li>
          <li><strong>Method:</strong> ${method}</li>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Recipient:</strong> ${recipientName}</li>
          <li><strong>Gift Note:</strong> ${giftNote}</li>
          <li><strong>Address:</strong> ${address}</li>
          <li><strong>Pay Now?</strong> ${payNow ? 'Yes' : 'No'}</li>
        </ul>
        <p>See your Sanity Studio for more info.</p>
      `,
		});

		// 4. Respond with success
		return res.status(200).json({
			success: true,
			message: 'Order submitted and stored in Sanity successfully',
			data: sanityResult,
		});
	} catch (error) {
		console.error('Error submitting promotion order:', error);
		return res.status(500).json({
			success: false,
			message: 'Something went wrong submitting the order.',
			error: error.message,
		});
	}
}
