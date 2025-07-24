function parseMarkdownBold(input) {
  return input.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export function generateCustomerEmail(order, onlineOrderingSettings) {
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

  const formatCartItems = cart
    .map((item) => {
      const options = [];
      if (item.selectedQuantity) options.push(item.selectedQuantity);
      if (item.selectedFlavor) options.push(`Flavor: ${item.selectedFlavor}`);
      if (item.selectedFrosting) options.push(`Frosting: ${item.selectedFrosting}`);
      const optionText = options.length ? ` (${options.join(', ')})` : '';
      return `<li style="margin-bottom:4px;">${item.title}${optionText}</li>`;
    })
    .join('');

  const formatCartItemsText = cart
    .map((item) => {
      const options = [];
      if (item.selectedQuantity) options.push(item.selectedQuantity);
      if (item.selectedFlavor) options.push(`Flavor: ${item.selectedFlavor}`);
      if (item.selectedFrosting) options.push(`Frosting: ${item.selectedFrosting}`);
      const optionText = options.length ? ` (${options.join(', ')})` : '';
      return `${item.title}${optionText}`;
    })
    .join(', ');

  const openingLinesHTML = confirmationBody.map((l) => `<p>${parseMarkdownBold(l)}</p>`).join('');
  const openingLinesText = confirmationBody.join('\n');

  const methodInfoHTML =
    fulfillmentMethod === 'delivery'
      ? deliveryInfo.map((l) => `<p>${parseMarkdownBold(l)}</p>`).join('')
      : pickupInfo.map((l) => `<p>${parseMarkdownBold(l)}</p>`).join('');
  const methodInfoText =
    fulfillmentMethod === 'delivery'
      ? deliveryInfo.join('\n')
      : pickupInfo.join('\n');

  const giftSection =
    allowGifting && giftInfo?.name
      ? `<div style="margin-top:15px;"><strong>Gift for:</strong> ${giftInfo.name}<br/><em>${giftInfo.note || 'No message provided.'}</em></div>`
      : '';

  return {
    subject: confirmationSubject,
    html: `
      <div style="font-family:Arial,sans-serif;background:#F0FFFE;padding:20px;border-radius:8px;">
        <div style="text-align:center;margin-bottom:20px;">
          <img src="https://cdn.sanity.io/images/5veay66n/production/6911cf0024adacb9f474ae910bcefec7072ae74b-400x225.png" alt="Sweet Juanjo’s" style="max-width:180px;opacity:0.85;" />
        </div>
        <h2 style="color:#012623;border-bottom:2px solid #29B2AC;padding-bottom:8px;">Thank you, ${customerName}!</h2>
        ${openingLinesHTML}
        ${methodInfoHTML}
        <p style="margin-top:10px;"><strong>Address:</strong> ${addressString}</p>
        <ul style="margin-top:10px;padding-left:20px;color:#012623;">${formatCartItems}</ul>
        <p style="margin-top:10px;"><strong>Amount Paid:</strong> $${total.toFixed(2)}</p>
        ${giftSection}
        <p style="margin-top:20px;color:#29B2AC;font-weight:bold;">We can't wait to bake for you! ❤️</p>
        <p style="margin-top:10px;font-style:italic;">Thanks,<br/>Katie Jo</p>
      </div>`,
    text: `
Thank you, ${customerName}!

${openingLinesText}

${methodInfoText}

Address: ${addressString}

Items:
${formatCartItemsText}

Amount Paid: $${total.toFixed(2)}

${
  allowGifting && giftInfo?.name
    ? `Gift for: ${giftInfo.name}\nMessage: ${giftInfo.note || 'No message provided.'}`
    : ''
}

We can't wait to bake for you!

Thanks,
Katie Jo
    `,
  };
}
