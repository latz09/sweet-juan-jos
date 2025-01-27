// emailTemplates/promotionOrderEmail.js

export function generateAutoReplyEmailForPromotion({
	itemTitle,
	itemSubtitle,
	method,
	name,
	email,
	phone,
	recipientName,
	giftNote,
	address,
	payNow,
	giftOption,
	autoResponseEmailData,
}) {
	const getCurrentGreeting = () => {
		const currentHour = new Date().toLocaleString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
			timeZone: 'America/Chicago',
		});
		if (currentHour < '11:30') return 'Good Morning';
		if (currentHour < '16:30') return 'Good Afternoon';
		return 'Good Evening';
	};

	const formatPaymentStatus = () =>
		payNow
			? 'You have chosen to pay now. Please ensure your payment was successfully completed on Square.'
			: `You have chosen to pay later. Payment will be collected at the time of ${
					method.toLowerCase() === 'delivery' ? 'delivery' : 'pickup'
				}.`;

	const formatOrderType = () =>
		method.toLowerCase() === 'delivery'
			? `Delivery to:<br>${address}`
			: 'Pickup';

	const formatGiftNote = () =>
		giftNote
			? `
			<blockquote style="font-style: italic; background-color: #CBFFFD; padding: 10px; border-left: 4px solid #29B2AC; margin: 10px 0;">
				${giftNote}
			</blockquote>`
			: '<p style="color: #555;">No gift note provided.</p>';

	const formatGiftInformation = () =>
		giftOption
			? `
			<h3 style="color: #29B2AC;">Gift Information:</h3>
			<ul style="list-style: none; padding: 0;">
				<li><strong>Recipient:</strong> ${recipientName}</li>
				<li><strong>Gift Note:</strong></li>
				${formatGiftNote()}
			</ul>
			`
			: '';

	const formatEmailContent = () =>
		autoResponseEmailData.emailContent.map((line) => `<p>${line}</p>`).join('');

	const formatMethodDetails = () =>
		`<p>${
			method.toLowerCase() === 'delivery'
				? autoResponseEmailData.deliveryDetailsLine
				: autoResponseEmailData.pickupDetailsLine
		}</p>`;

	const greeting = getCurrentGreeting();
	const paymentStatus = formatPaymentStatus();
	const giftInformationHtml = formatGiftInformation();
	const emailContentHtml = formatEmailContent();
	const methodDetailsLine = formatMethodDetails();

	return {
		subject: `${name}, thank You for Your Order!`,
		text: 
		`
			${greeting} ${name},

			${autoResponseEmailData.emailContent.join('\n\n')}

			${method.toLowerCase() === 'delivery' ? 'Delivery Details:' : 'Pickup Details:'}
			${method.toLowerCase() === 'delivery' ? autoResponseEmailData.deliveryDetailsLine : autoResponseEmailData.pickupDetailsLine}

			Order Details:
			Item Ordered: ${itemTitle} - ${itemSubtitle}
			Method: ${method}
			${method.toLowerCase() === 'delivery' ? `Address: ${address}` : 'Pickup Location'}

			${giftOption ? `Recipient Name: ${recipientName}\nGift Note: ${giftNote || 'No gift note provided.'}` : ''}

			${paymentStatus}

			We look forward to baking for you!

			Best regards,
			Katie Jo
		`,

		html: `
			<div style="font-family: Arial, sans-serif; color: #012623; background-color: #F0FFFE; padding: 20px; border-radius: 8px;">
				<div style="text-align: center; margin-bottom: 20px;">
					<img 
						src="https://cdn.sanity.io/images/5veay66n/production/6911cf0024adacb9f474ae910bcefec7072ae74b-400x225.png" 
						alt="Client Logo" 
						style="max-width: 200px; height: auto; opacity: 0.6;" 
					/>
				</div>

				<h4 style="color: #012623; opacity: 0.8;">${greeting} ${name},</h4>				
					${emailContentHtml}
					${methodDetailsLine}
				<h3 style="color: #29B2AC;">Order Details:</h3>
				<ul style="list-style: none; padding: 0;">      
					<li><strong>Sweet Ordered:</strong> ${itemTitle} - (${itemSubtitle})</li>
					<li><strong>Method:</strong> ${method}</li>
					${
						method.toLowerCase() === 'delivery'
							? `<li><strong>Address:</strong> ${address}</li>`
							: '<li><strong>Pickup Location:</strong> 5598 Cabernet Ct, Stevens Point, WI 54482 </li>'
					}
				</ul>

				${giftInformationHtml}

				<p style="margin-top: 20px;">${paymentStatus}</p>

				<p>We look forward to serving you!</p>

				<p>Best regards,<br/>Katie Jo</p>
			</div>
		`,
	};
}
