import { SquareClient, SquareEnvironment } from 'square';

function sanitizePhoneNumber(phone) {
  let digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    return `+1${digits}`;
  } else {
    return ''; // Square will ignore an empty string
  }
}

const squareClient = new SquareClient({
  token: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
  environment:
    process.env.SQUARE_ENV === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export default squareClient;

export async function createCheckoutLink({
  cartData = [],
  name = '',
  email,
  street,
  city,
  zip,
  phone,
  slug,
  locationId = process.env.SQUARE_SANDBOX_LOCATION_ID,
}) {
  

  if (!locationId) throw new Error('SQUARE_SANDBOX_LOCATION_ID is missing!');
  if (!cartData.length) {
    throw new Error('Cart is empty. Cannot create payment link.');
  }

  const sanitizedPhone = sanitizePhoneNumber(phone || '');

  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  const lineItems = cartData.map((item) => ({
    name: item.name,
    quantity: item.quantity.toString(),
    basePriceMoney: {
      amount: BigInt(Math.round(item.price * 100)),
      currency: 'USD',
    },
  }));

  const body = {
    idempotencyKey: `${Date.now()}-${Math.random()}`,
    order: {
      locationId,
      lineItems,
    },
    checkoutOptions: {
      askForShippingAddress: false,
      prePopulateBuyerEmail: email,
      redirectUrl: `https://www.sweetjuanjos.com/promotions/${slug}`,
    },
    prePopulatedData: {
      buyerEmail: email,
      buyerPhoneNumber: sanitizedPhone, // Only passes valid 10-digit numbers
      buyerAddress: {
        addressLine1: street,
        locality: city,
        postalCode: zip,
        country: 'US',
      },
      buyerFirstName: firstName,
      buyerLastName: lastName,
    },
  };

  try {
    const response = await squareClient.checkout.paymentLinks.create(body);
    return response.paymentLink.url;
  } catch (error) {
    console.error('Error creating Square Payment Link:', error);
    throw error;
  }
}
