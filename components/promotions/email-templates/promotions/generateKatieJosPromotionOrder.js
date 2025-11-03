export function generateKatieJosPromotionOrder({
  cartData = [],
  orderMethod = '',
  name = '',
  email = '',
  phone = '',
  recipientName = '',
  giftNote = '',
  street = '',
  city = '',
  zip = '',
  cartTotal = 0,
  payNow = false, 
  giftOption = false,
  promotionDetails = {},
  selectedDate = '', // NEW
  selectedTimeSlot = '', // NEW
}) {
  // Extract promotion details
  const { deliveryDetails = '', pickupDetails = '', autoResponseEmailData } = promotionDetails;

  // Determine Greeting Based on Time
  const currentHour = new Date().getHours();
  let greeting =
    currentHour < 11
      ? 'Good Morning Katie Jo,'
      : currentHour < 17
      ? 'Good Afternoon Katie Jo,'
      : 'Good Evening Katie Jo,';

  // Format Address
  const fullAddress =
    orderMethod === 'delivery'
      ? `${street}, ${city}, ${zip}`
      : 'Pickup at 5598 Cabernet Ct, Stevens Point, WI 54482';

  // Format date for display (e.g., "2024-12-23" → "December 23, 2024")
  const formatDate = (dateString) => {
    if (!dateString) return 'Not selected';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formattedDate = formatDate(selectedDate);
  const formattedTimeSlot = selectedTimeSlot || 'Not selected';

  // Format Ordered Items List (Styled)
  const itemListHTML = cartData
    .map(
      (item) =>
        `<li style="margin-bottom: 2px"><strong>${item.name}</strong> ${
          item.itemSubtitle ? `(${item.itemSubtitle})` : ''
        } x <strong>${item.quantity}</strong></li>`
    )
    .join('');

  const itemListText = cartData
    .map(
      (item) =>
        `${item.name} ${
          item.itemSubtitle ? `(${item.itemSubtitle})` : ''
        } x ${item.quantity}`
    )
    .join(', ');

  // Determine Payment Status
  const paymentStatus = payNow
    ? 'Paid on Square (cross-reference for confirmation).'
    : 'Payment will be made upon receiving the items.';

  // Gift Note (Styled)
  const giftNoteHTML = giftNote
    ? `<blockquote style="font-style: italic; background-color: #CBFFFD; padding: 10px; border-left: 4px solid #29B2AC; margin: 10px 0;">
				${giftNote}
			</blockquote>`
    : '<p style="color: #555;">No gift note provided.</p>';

  const giftNoteText = giftNote ? `Gift Note:\n${giftNote}` : 'No gift note provided.';

  // Ensure Recipient Info is Always Included
  const recipientDetailsHTML = `
    <h3 style="color: #29B2AC;">Recipient Information:</h3>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Recipient Name:</strong> ${recipientName || 'N/A'}</li>
      <li><strong>Gift Note:</strong> ${giftNote || 'No gift note provided.'}</li>
    </ul>`;

  const recipientDetailsText = `
    Recipient Name: ${recipientName || 'N/A'}
    Gift Note: ${giftNote || 'No gift note provided.'}`;

  // Construct Email Content
  return {
    subject: `New Promotion Order from ${name || 'Unknown'}`,
    text: `
    ${greeting}

    A new promotion order has been submitted!

    Order Details:
    Cart Total: $${cartTotal}
    Items Ordered: ${itemListText}
    Payment Status: ${paymentStatus}
    Order Type: ${orderMethod.toUpperCase()}
    Date: ${formattedDate}
    Time: ${formattedTimeSlot}
    Address: ${fullAddress}

    Ordered By:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}

    ${recipientDetailsText}

    See your Dashboard for more details.
    `.trim(),

    html: `
    <div style="font-family: Arial, sans-serif; color: #012623; background-color: #F0FFFE; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <img 
          src="https://cdn.sanity.io/images/5veay66n/production/6911cf0024adacb9f474ae910bcefec7072ae74b-400x225.png" 
          alt="Client Logo" 
          style="max-width: 200px; height: auto; opacity: 0.6;" 
        />
      </div>

      <h4 style="color: #012623; opacity: 0.8;">${greeting}</h4>
      <h2 style="color: #29B2AC;">A new promotion order has been submitted!</h2>
      
      <hr style="border: 1px solid #29B2AC; margin: 20px 0;" />

      <h3 style="color: #29B2AC;">Order Details:</h3>
      <h3 style="color: #012623";>Order Amount: $${cartTotal}</h3>
      <ul style="list-style: none; padding: 0;">
        ${itemListHTML}
        <li style="margin-top: 10px"><strong>Order Type:</strong> ${orderMethod.toUpperCase()}</li>
        <li><strong>Date:</strong> ${formattedDate}</li>
        <li><strong>Time:</strong> ${formattedTimeSlot}</li>
        <li><strong>Address:</strong> ${fullAddress}</li>
        <li style="margin-top: 10px"><strong>Payment Status:</strong> ${paymentStatus}</li>
      </ul>

      <hr style="border: 1px solid #29B2AC; margin: 20px 0;" />

      <h3 style="color: #29B2AC;">Ordered By:</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> <a href="mailto:${email}" style="color: #29B2AC;">${email}</a></li>
        <li><strong>Phone:</strong> <a href="tel:${phone}" style="color: #29B2AC;">${phone}</a></li>
      </ul>

      ${recipientDetailsHTML}

      <p style="margin-top: 20px;">See your <a href="https://sweet-juanjos.sanity.studio/structure/promotionOrders" style="color: #29B2AC;">Dashboard</a> for more details.</p>
    </div>
    `,
  };
}