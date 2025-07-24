// /lib/email/generateOrderEmails.js

export function generateOrderEmails(order, onlineOrderingSettings) {
	const {
		contactInfo,
		fulfillmentMethod,
		deliveryAddress = {},
		giftInfo = {},
		cart = [],
		total,
	} = order;

	const {
		confirmationSubject = 'Sweet Juanjo’s Order Confirmation',
		confirmationBody = [],
		pickupInfo = [],
		deliveryInfo = [],
		allowGifting = false,
	} = onlineOrderingSettings || {};

	const customerName = contactInfo?.name || 'Valued Customer';
	const addressString =
		fulfillmentMethod === 'delivery'
			? `${deliveryAddress.address}, ${deliveryAddress.city}, ${deliveryAddress.state} ${deliveryAddress.zip}`
			: 'Pickup at Sweet Juanjo’s';

	const giftSection =
		allowGifting && giftInfo?.name
			? `
    <h3>Gift for: ${giftInfo.name}</h3>
    <blockquote style="font-style: italic; background-color: #CBFFFD; padding: 10px; border-left: 4px solid #29B2AC; margin: 10px 0;">
      ${giftInfo.note || 'No message provided.'}
    </blockquote>
    `
			: '';

	const cartItemsListHTML = cart
		.map((item) => {
			const options = [];
			if (item.flavor) options.push(item.flavor);
			if (item.frosting) options.push(item.frosting);
			const optionText = options.length > 0 ? ` (${options.join(', ')})` : '';
			return `<li>${item.name}${optionText} x ${item.quantityUnits} ($${item.totalPrice.toFixed(2)})</li>`;
		})
		.join('');

	const cartItemsListText = cart
		.map((item) => {
			const options = [];
			if (item.flavor) options.push(item.flavor);
			if (item.frosting) options.push(item.frosting);
			const optionText = options.length > 0 ? ` (${options.join(', ')})` : '';
			return `${item.name}${optionText} x ${item.quantityUnits} ($${item.totalPrice.toFixed(2)})`;
		})
		.join(', ');

	const openingLinesHTML = confirmationBody
		.map((line) => `<p>${line}</p>`)
		.join('');

	const openingLinesText = confirmationBody.join('\n');

	const methodInfoHTML =
		fulfillmentMethod === 'delivery'
			? deliveryInfo.map((line) => `<p>${line}</p>`).join('')
			: pickupInfo.map((line) => `<p>${line}</p>`).join('');

	const methodInfoText =
		fulfillmentMethod === 'delivery'
			? deliveryInfo.join('\n')
			: pickupInfo.join('\n');

	const customerEmail = {
		subject: confirmationSubject,
		html: `
      <div style="font-family: Arial, sans-serif; color: #012623; background-color: #F0FFFE; padding: 20px; border-radius: 8px;">
        <h2>Thank you, ${customerName}!</h2>
        ${openingLinesHTML}
        ${methodInfoHTML}
        <p><strong>Address:</strong> ${addressString}</p>
        <ul>${cartItemsListHTML}</ul>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        ${giftSection}
        <p>We can't wait to bake for you! ❤️</p>
      </div>
    `,
		text: `
Thank you, ${customerName}!

${openingLinesText}

${methodInfoText}
Address: ${addressString}
Items: ${cartItemsListText}
Total: $${total.toFixed(2)}

${allowGifting && giftInfo?.name ? `Gift for: ${giftInfo.name}\nMessage: ${giftInfo.note || 'No message provided.'}` : ''}

We can't wait to bake for you!
    `,
	};

	const internalEmail = {
		subject: `New Order Received - ${customerName}`,
		html: `
      <div style="font-family: Arial, sans-serif; color: #012623; padding: 20px;">
        <h2>New Order Alert!</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${contactInfo.email}</p>
        <p><strong>Phone:</strong> ${contactInfo.phone}</p>
        <p><strong>Method:</strong> ${fulfillmentMethod.toUpperCase()}</p>
        <p><strong>Address:</strong> ${addressString}</p>
        <ul>${cartItemsListHTML}</ul>
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        ${
					allowGifting && giftInfo?.name
						? `<p><strong>Gift For:</strong> ${giftInfo.name}</p>
               <blockquote>${giftInfo.note || 'No message provided.'}</blockquote>`
						: ''
				}
      </div>
    `,
		text: `
New Order!

Name: ${customerName}
Email: ${contactInfo.email}
Phone: ${contactInfo.phone}
Method: ${fulfillmentMethod}
Address: ${addressString}
Items: ${cartItemsListText}
Total: $${total.toFixed(2)}

${allowGifting && giftInfo?.name ? `Gift For: ${giftInfo.name}\nMessage: ${giftInfo.note || 'No message provided.'}` : ''}
    `,
	};

	return { customerEmail, internalEmail };
}
