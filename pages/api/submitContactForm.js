import { sanityClient } from '@/lib/sanityConnection';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const {
			name,
			email,
			phoneNumber,
			eventDate,
			amount,
			interests,
			inspirationPhotos,
			additionalDetails,
		} = req.body;

		const safeEventDate =
			eventDate && !isNaN(new Date(eventDate).getTime())
				? new Date(eventDate).toISOString()
				: null;

		try {
			const result = await sanityClient.create({
				_type: 'contactForm',
				name,
				email,
				phoneNumber,
				eventDate: safeEventDate,
				amount: parseInt(amount, 10),
				interests,
				inspirationPhotos,
				additionalDetails,
				sentAt: new Date().toISOString(),
			});
			res.status(200).json({
				success: true,
				message: 'Form submitted successfully',

				data: result,
			});
		} catch (error) {
			console.error('Form submission failed:', error);
			res
				.status(500)
				.json({ success: false, message: 'Failed to submit form' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
