// pages/api/onlineOrderingCheckout.js
import { v4 as uuidv4 } from 'uuid';
import { SquareClient, SquareEnvironment } from 'square';
import { sanityClient } from '@/lib/sanityConnection';

const squareClient = new SquareClient({
  token: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
  // token: process.env.OL_SANDBOX_ACCESS_TOKEN,
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
  if (!contactInfo.name || !contactInfo.phone || !contactInfo.email) {
    return res.status(400).json({ message: 'Missing contact information.' });
  }

  let orderId;
  try {
    orderId = `order-${uuidv4()}`;
    const createdAt = new Date().toISOString();

    // 1️⃣ Normalize cart items for Sanity
    const enrichedCart = cart.map((item) => {
      let price = 0,
        totalPrice = 0;
      if (item.totalPrice != null) {
        totalPrice = item.totalPrice;
        price = item.basePrice || item.price || item.totalPrice;
      } else {
        price = item.price || 0;
        totalPrice = price * (item.quantityUnits || 1);
      }

      return {
        _key: uuidv4(),
        cartItemId: item.cartItemId || uuidv4(),
        title: item.title || item.name || 'Product',
        price,
        totalPrice,
        quantity: item.quantityUnits ?? item.quantity ?? 1,
        ...(item.quantityLabel && { selectedQuantity: item.quantityLabel }),
        ...(item.flavor && { selectedFlavor: item.flavor }),
        ...(item.frosting && { selectedFrosting: item.frosting }),
        ...(item.specialInstructions && {
          specialInstructions: item.specialInstructions,
        }),
      };
    });

    // Calculate totals
    const subtotal = enrichedCart.reduce(
      (sum, i) => sum + (i.totalPrice || 0),
      0
    );
    const total = subtotal + (selectedMethod === 'delivery' ? deliveryFee : 0);

    // Build Sanity order doc
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
    if (selectedMethod === 'delivery') {
      sanityOrder.deliveryAddress = {
        address: deliveryAddress.address || '',
        city: deliveryAddress.city || '',
        state: deliveryAddress.state || '',
        zip: deliveryAddress.zip || '',
      };
    }
    if (giftInfo) {
      sanityOrder.giftInfo = {
        name: giftInfo.name || '',
        note: giftInfo.note || '',
      };
    }

    // Store in Sanity
    await sanityClient.create(sanityOrder);

    // Build Square line items
    const lineItems = enrichedCart.map((item) => {
      const name = item.title;
      return {
        name,
        quantity: String(item.quantity),
        basePriceMoney: {
          amount: BigInt(Math.round(item.totalPrice * 100)),
          currency: 'USD',
        },
        note: JSON.stringify({ orderId }),
      };
    });
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
        locationId: process.env.SQUARE_SANDBOX_LOCATION_ID,
        // locationId: process.env.OL_LOCATION_ID,
        lineItems,
      },
      checkoutOptions: {
        askForShippingAddress: false,
        redirectUrl: `${process.env.NEXTAUTH_URL ||
          'https://www.sweetjuanjos.com'}/online-ordering/order-success`,
      },
      prePopulatedData: {
        buyerEmail: contactInfo.email,
      },
    };

    // Create Square payment link
    const { paymentLink } = await squareClient.checkout.paymentLinks.create(
      payload
    );

    if (!paymentLink?.url) {
      throw new Error('No payment link returned from Square');
    }
    return res.status(200).json({
      success: true,
      paymentLink: paymentLink.url,
    });
  } catch (err) {
    console.error('💥 Error creating checkout link:', err);
    if (orderId) {
      try {
        await sanityClient.delete(orderId);
      } catch {}
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to create checkout link.',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal error',
    });
  }
}
