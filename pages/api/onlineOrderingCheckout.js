// pages/api/onlineOrderingCheckout.js
import { v4 as uuidv4 } from 'uuid';
import { SquareClient, SquareEnvironment } from 'square';
import { sanityClient } from '@/lib/sanityConnection';

const isProduction = process.env.NODE_ENV === 'production';

const squareClient = new SquareClient({
	token: process.env.OL_SANDBOX_ACCESS_TOKEN,
	environment: SquareEnvironment.Sandbox,
});

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ message: `Method ${req.method} not allowed` });
	}

	const {
		cart = [],
		contactInfo = {},
		selectedMethod = 'pickup',
		deliveryAddress = {},
		deliveryFee = 0,
		giftInfo = {},
	} = req.body;

	if (!cart.length) {
		return res.status(400).json({ message: 'Cart is empty.' });
	}

	// Basic validation
	if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
		return res.status(400).json({ message: 'Missing contact information.' });
	}

	let orderId;

	try {
		orderId = `order-${uuidv4()}`;
		const createdAt = new Date().toISOString();

		// Map cart items to match the schema
		const enrichedCart = cart.map((item) => {
			// Handle the price based on what's in the cart item
			let price = 0;
			let totalPrice = 0;

			// If item has totalPrice (calculated with options), use it
			if (item.totalPrice) {
				totalPrice = item.totalPrice;
				price = item.basePrice || item.price || item.totalPrice;
			} else if (item.price) {
				// If only price exists, use it for both
				price = item.price;
				totalPrice = item.price * (item.quantity || 1);
			}

			return {
				_key: uuidv4(),
				cartItemId: item.cartItemId || uuidv4(),
				title: item.title || item.name || 'Product',
				price: price,
				totalPrice: totalPrice,
				quantity: item.quantity || 1,
				// Include any custom options if they exist
				...(item.selectedQuantity && {
					selectedQuantity: item.selectedQuantity,
				}),
				...(item.selectedFlavor && { selectedFlavor: item.selectedFlavor }),
				...(item.selectedFrosting && {
					selectedFrosting: item.selectedFrosting,
				}),
				...(item.specialInstructions && {
					specialInstructions: item.specialInstructions,
				}),
			};
		});

		// Calculate totals
		const subtotal = enrichedCart.reduce(
			(sum, item) => sum + (item.totalPrice || 0),
			0
		);
		const total = subtotal + (selectedMethod === 'delivery' ? deliveryFee : 0);

		// Store order in Sanity first
		const sanityOrder = {
			_id: orderId,
			_type: 'submittedOrder',
			status: 'pending',
			createdAt,
			cart: enrichedCart,
			contactInfo: {
				name: contactInfo.name,
				phone: contactInfo.phone,
				email: contactInfo.email,
			},
			fulfillmentMethod: selectedMethod,
			subtotal,
			deliveryFee: selectedMethod === 'delivery' ? deliveryFee : 0,
			total,
		};

		// Add delivery address if delivery method
		if (selectedMethod === 'delivery' && deliveryAddress) {
			sanityOrder.deliveryAddress = {
				address: deliveryAddress.address || '',
				city: deliveryAddress.city || '',
				state: deliveryAddress.state || '',
				zip: deliveryAddress.zip || '',
			};
		}

		// Add gift info if provided
		if (giftInfo) {
			sanityOrder.giftInfo = {
				name: giftInfo.name || '',
				note: giftInfo.note || '',
			};
		}

		await sanityClient.create(sanityOrder);

		// Build line items for Square
		const lineItems = cart.map((item) => {
			// Build a descriptive name for the line item
			let itemName = item.title || item.name || 'Order Item';

			// Add selected options to the name for clarity
			const options = [];
			if (item.selectedQuantity) options.push(item.selectedQuantity);
			if (item.selectedFlavor) options.push(`Flavor: ${item.selectedFlavor}`);
			if (item.selectedFrosting)
				options.push(`Frosting: ${item.selectedFrosting}`);

			if (options.length > 0) {
				itemName += ` (${options.join(', ')})`;
			}

			return {
				name: itemName,
				quantity: String(item.quantity || 1),
				basePriceMoney: {
					amount: BigInt(
						Math.round((item.totalPrice || item.price || 0) * 100)
					),
					currency: 'USD',
				},
				// Store the orderId in the note so webhook can find it
				note: JSON.stringify({ orderId }),
			};
		});

		// Add delivery fee if applicable
		if (selectedMethod === 'delivery' && deliveryFee > 0) {
			lineItems.push({
				name: 'Delivery Fee',
				quantity: '1',
				basePriceMoney: {
					amount: BigInt(Math.round(deliveryFee * 100)),
					currency: 'USD',
				},
			});
		}

		const payload = {
			idempotencyKey: uuidv4(),
			order: {
				locationId: process.env.OL_LOCATION_ID,
				lineItems,
			},
			checkoutOptions: {
				askForShippingAddress: false, // We're collecting this ourselves
				redirectUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/online-ordering/order-success`,
			},
		};

		// Add customer email if available
		if (contactInfo.email) {
			payload.prePopulatedData = {
				buyerEmail: contactInfo.email,
			};
		}

		const { paymentLink } =
			await squareClient.checkout.paymentLinks.create(payload);

		if (!paymentLink?.url) {
			throw new Error('No payment link returned from Square');
		}

		return res.status(200).json({
			success: true,
			paymentLink: paymentLink.url,
		});
	} catch (err) {
		console.error('💥 Error creating checkout link:', err);
		console.error('Error details:', err.response?.data || err.message);

		// Clean up the order if Square fails and we have an orderId
		if (orderId) {
			try {
				await sanityClient.delete(orderId);
			} catch (deleteErr) {
				console.error('Failed to clean up order:', deleteErr);
			}
		}

		return res.status(500).json({
			success: false,
			message: 'Failed to create checkout link.',
			error:
				process.env.NODE_ENV === 'development' ? err.message : 'Internal error',
		});
	}
}
