export function generateInternalEmail(order, onlineOrderingSettings) {
	const {
		contactInfo,
		fulfillmentMethod,
		deliveryAddress = {},
		giftInfo = {},
		cart = [],
		total,
	} = order;

	const { allowGifting = false } = onlineOrderingSettings || {};

	const customerName = contactInfo?.name || 'Unknown Customer';
	const addressString =
		fulfillmentMethod === 'delivery'
			? `${deliveryAddress.address}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zip}`
			: 'Pickup at Sweet Juanjo’s';

	const formatCartItems = cart
		.map((item) => {
			const options = [];
			if (item.selectedQuantity) options.push(item.selectedQuantity);
			if (item.selectedFlavor) options.push(`Flavor: ${item.selectedFlavor}`);
			if (item.selectedFrosting)
				options.push(`Frosting: ${item.selectedFrosting}`);
			const optionText = options.length ? ` (${options.join(', ')})` : '';
			return `<li style="margin-bottom:4px;">${item.title}${optionText}</li>`;
		})
		.join('');

	const giftSection =
		allowGifting && giftInfo?.name
			? `<div style="margin-top:15px;"><strong>Gift For:</strong> ${giftInfo.name}<br/><em>${giftInfo.note || 'No message provided.'}</em></div>`
			: '';

	return {
		subject: `New Order Received - ${customerName}`,
		html: `
      <div style="font-family:Arial,sans-serif;background:#F0FFFE;padding:20px;border-radius:8px;">
        <div style="text-align:center;margin-bottom:20px;">
          <img src="https://cdn.sanity.io/images/5veay66n/production/6911cf0024adacb9f474ae910bcefec7072ae74b-400x225.png" alt="Sweet Juanjo’s" style="max-width:180px;opacity:0.8;" />
        </div>
        <h2 style="color:#012623;border-bottom:2px solid #29B2AC;padding-bottom:8px;">New Order Alert!</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${contactInfo.email}</p>
        <p><strong>Phone:</strong> ${contactInfo.phone}</p>
        <p><strong>Method:</strong> ${fulfillmentMethod.toUpperCase()}</p>
        <p><strong>Address:</strong> ${addressString}</p>
        <ul style="margin-top:10px;padding-left:20px;color:#012623;">${formatCartItems}</ul>
        <p style="margin-top:10px;"><strong>Total:</strong> $${total.toFixed(2)}</p>
        ${giftSection}
      </div>`,
		text: `
New Order!

Name: ${customerName}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone}
Method: ${fulfillmentMethod}
Address: ${addressString}

Items:
${cart
	.map((item) => {
		const options = [];
		if (item.selectedQuantity) options.push(item.selectedQuantity);
		if (item.selectedFlavor) options.push(`Flavor: ${item.selectedFlavor}`);
		if (item.selectedFrosting)
			options.push(`Frosting: ${item.selectedFrosting}`);
		const optionText = options.length ? ` (${options.join(', ')})` : '';
		return `${item.title}${optionText}`;
	})
	.join(', ')}

Total: $${total.toFixed(2)}

${
	allowGifting && giftInfo?.name
		? `Gift For: ${giftInfo.name}\nMessage: ${giftInfo.note || 'No message provided.'}`
		: ''
}
    `,
	};
}
