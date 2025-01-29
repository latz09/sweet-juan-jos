// /lib/createPaymentLink.js
import { Client, Environment } from 'square';

/**
 * Initialize Square client
 * Make sure you have a .env or environment variables for:
 *   process.env.SQUARE_ACCESS_TOKEN
 *   process.env.SQUARE_ENV ("production" or "sandbox")
 */
const squareClient = new Client({
  accessToken: process.env.SQUARE_SANDBOX_ACCESS_TOKEN, // Updated to match your .env variable
  environment:
    process.env.SQUARE_ENV === 'production'
      ? Environment.Production
      : Environment.Sandbox,
});

/**
 * This function calls Square's createPaymentLink endpoint,
 * transforming your cartData into the lineItems Square expects,
 * optionally adding buyer info, etc.
 */
export async function createCheckoutLink({
  cartData = [],
  name,
  email,
  street,
  city,
  zip,
  phone,
  orderMethod,
  // add any other fields you need here
}) {
  // 1. Prepare the line items for Square
  // Square expects each line item to have a name and an amount in cents (priceMoney).
  const lineItems = cartData.map((item) => {
    // Convert price to the smallest currency unit, e.g. 10 USD => 1000 cents
    const priceInCents = Math.round(item.price * 100);

    return {
      name: item.name, // e.g. "Chocolate Chip"
      quantity: item.quantity.toString(), // Must be a string
      basePriceMoney: {
        amount: priceInCents,
        currency: 'USD',
      },
    };
  });

  // 2. Build the order object
  // locationId is required; you must get this from your Square dashboard
  const locationId = process.env.SQUARE_LOCATION_ID; // ensure you set this

  const orderPayload = {
    locationId,
    lineItems,
  };

  // 3. Add pre-population data if you want Square’s checkout to
  //    display buyer info, shipping address, etc.
  //    This is optional, but here’s how to do it:
  const prePopulatedData = {
    buyerEmail: email,
    buyerPhoneNumber: phone,
    buyerAddress: {
      addressLine1: street || '',
      locality: city || '',
      postalCode: zip || '',
      // country code if needed: country: 'US'
    },
    buyerName: name,
  };

  // 4. The main payload to pass to createPaymentLink
  //    The `idempotencyKey` ensures if you call this same request again,
  //    it doesn’t create multiple links for the same order. Use something unique.
  const body = {
    idempotencyKey: `${Date.now()}-${Math.random()}`, // or use uuid
    order: orderPayload,
    checkoutOptions: {
      // This ensures that, if you want shipping, you set shipping as required or not
      // askForShippingAddress: true, // or false, depending on your needs

      // If you have the email or address, it can pre-populate:
      prePopulateBuyerEmail: email || '',
      // For phone/address, you can do that with `pre_populate_shipping_address`
      // or other advanced fields. The official docs have more advanced examples.
    },
    // (Optional) pass in "prePopulatedData" if you want more advanced pre-population:
    // "pre_populate_buyer_email" is a simpler option that we set in checkoutOptions above
  };

  // 5. Make the API call
  try {
    const response = await squareClient.checkoutApi.createPaymentLink(body);

    // If successful, Square returns { paymentLink: { url: ..., id: ..., etc } }
    const { result } = response;
    if (result && result.paymentLink) {
      // Return the URL to your calling code
      return result.paymentLink.url;
    } else {
      // Handle unexpected shape
      throw new Error('No payment link returned from Square.');
    }
  } catch (error) {
    console.error('Error creating Square Payment Link:', error);
    throw error;
  }
}
