export function generateKatieJosPromotionOrder({
	itemTitle,
	method,
	name,
	email,
	phone,
	recipientName,
	giftNote,
	address,
	payNow,
}) {
	// Determine the time of day for greeting
	const currentHour = new Date().getHours();
	let greeting;

	if (currentHour < 12) {
		greeting = 'Good Morning Katie Jo';
	} else if (currentHour < 18) {
		greeting = 'Good Afternoon Katie Jo';
	} else {
		greeting = 'Good Evening Katie Jo';
	}

	// Determine payment status and method
	const paymentStatus = payNow
		? 'Paid on Square (cross-reference for confirmation).'
		: 'Payment will be made upon receiving the items.';
	const orderType =
		method === 'Delivery' ? `Delivery to:<br>${address}` : 'Pickup';

	// Determine gift note content
	const giftNoteContent = giftNote
		? `
        <blockquote style="font-style: italic; background-color: ${'#CBFFFD'}; padding: 10px; border-left: 4px solid ${'#29B2AC'}; margin: 10px 0;">
          ${giftNote}
        </blockquote>`
		: '<p style="color: #555;">No gift note provided.</p>';

	return {
		subject: `New Promotion Order from ${name || 'Unknown'}`,
		text: `
        ${greeting},
  
        A new promotion order has been submitted!
  
        Order Details:
        Item Ordered: ${itemTitle}
  
        Payment Status:
        ${paymentStatus}
  
        Method:
        ${method}
  
        Address (if applicable):
        ${method === 'Delivery' ? address : 'Pickup'}
  
        Ordered By:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
  
        Gift Information:
        Recipient: ${recipientName}
        Gift Note: ${giftNote || 'No gift note provided.'}
      `,
		html: `
        <div style="font-family: Arial, sans-serif; color: ${'#012623'}; background-color: ${'#F0FFFE'}; padding: 20px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://cdn.sanity.io/images/5veay66n/production/6911cf0024adacb9f474ae910bcefec7072ae74b-400x225.png" alt="Client Logo" style="max-width: 200px; height: auto;" />
        </div>
          <h4 style="color: ${'#29B2AC'};">${greeting}</h4>
          <h2 style="color: ${'#29B2AC'};">A new promotion order has been submitted!</h2>
          
          <hr style="border: 1px solid ${'#29B2AC'}; margin: 20px 0;" />
  
          <h3 style="color: ${'#29B2AC'};">Order Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Item Ordered:</strong> ${itemTitle}</li>
            <li><strong>Payment Status:</strong> ${paymentStatus}</li>
            <li><strong>Order Type:</strong> ${orderType}</li>
          </ul>
  
          <hr style="border: 1px solid ${'#29B2AC'}; margin: 20px 0;" />
  
          <h3 style="color: ${'#29B2AC'};">Ordered By:</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}" style="color: ${'#29B2AC'};">${email}</a></li>
            <li><strong>Phone:</strong> <a href="tel:${phone}" style="color: ${'#29B2AC'};">${phone}</a></li>
          </ul>
  
          <hr style="border: 1px solid ${'#29B2AC'}; margin: 20px 0;" />
  
          <h3 style="color: ${'#29B2AC'};">Gift Information:</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Recipient:</strong> ${recipientName}</li>
            <li><strong>Gift Note:</strong></li>
            ${giftNoteContent}
          </ul>
  
          <p style="margin-top: 20px;">See your <a href="https://sweet-juanjos.sanity.studio/structure/promotionOrders" style="color: ${'#29B2AC'};">Dashboard</a> for more details.</p>
        </div>
      `,
	};
}
