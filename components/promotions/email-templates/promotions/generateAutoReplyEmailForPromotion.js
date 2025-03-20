export function generateCustomerConfirmationEmail({
	name,
	email,
	phone,
	paymentLink,
	recipientName,
	giftNote,
	street,
	city,
	zip,
	payNow,
	orderMethod,
	promotionDetails = {},
	cartData = [],
}) {
	// Extract fields from promotionDetails
	const {
		pickupDetails = '',
		deliveryDetails = '',
		autoResponseEmailData = {},
		giftOption = false,
	} = promotionDetails;

	// Extract autoResponseEmailData fields
	const {
		emailContent = [],
		deliveryDetailsLine = '',
		pickupDetailsLine = '',
	} = autoResponseEmailData;

	// Construct full address (only if it's delivery)
	const address =
		orderMethod === 'delivery'
			? [street, city, zip].filter(Boolean).join(', ')
			: 'Pickup';

	// Format Ordered Items
	const formatItemListHTML = () =>
		cartData
			.map((item) => {
				const sub = item.itemSubtitle ? `(${item.itemSubtitle})` : '';
				return `<li><strong>${item.name}</strong> ${sub} x <strong>${item.quantity}</strong></li>`;
			})
			.join('');

	// Greeting based on time of day
	const getCurrentGreeting = () => {
		const now = new Date();
		const hour = new Intl.DateTimeFormat('en-US', {
			hour: 'numeric',
			hour12: false,
			timeZone: 'America/Chicago',
		}).format(now);

		if (hour < 11) return 'Good Morning';
		if (hour < 17) return 'Good Afternoon';
		return 'Good Evening';
	};

	const greeting = getCurrentGreeting();

	// Map through emailContent to create opening lines
	const formatEmailContentHTML = () =>
		emailContent
			.map((line) => `<p style="margin: 10px 0;">${line}</p>`)
			.join('');

	// Determine which details line to display based on orderMethod
	const formatMethodDetailsHTML = () => {
		if (orderMethod === 'delivery') {
			return `<p style="margin: 10px 0;">${deliveryDetailsLine}</p>`;
		} else if (orderMethod === 'pickup') {
			return `<p style="margin: 10px 0;">${pickupDetailsLine}</p>`;
		}
		return '';
	};

	// Gift Note Block
	const formatGiftNoteHTML = () =>
		giftNote
			? `
			<blockquote style="font-style: italic; background-color: #CBFFFD; padding: 10px; border-left: 4px solid #29B2AC; margin: 10px 0;">
				${giftNote}
			</blockquote>`
			: '<p style="color: #555;">No gift note provided.</p>';

	// Gift Information Block
	const formatGiftInformationHTML = () =>
		giftOption
			? `
			<h3 style="color: #29B2AC;">Gift Information:</h3>
			<ul style="list-style: none; padding: 0;">
				<li><strong>Recipient:</strong> ${recipientName}</li>
				<li><strong>Gift Note:</strong></li>
				${formatGiftNoteHTML()}
			</ul>
			`
			: '';

	const formatPaymentDetailsHTML = () => {
		// Basic inline styles for a "button" link:
		const buttonStyle = `
				  display: inline-block;
				  margin-top: 10px;
				  background-color: #29B2AC;
				  color: #ffffff;
				  text-decoration: none;
				  padding: 10px 20px;
				  border-radius: 4px;
				  font-weight: bold;
				`;

		if (payNow) {
			// They chose to pay online
			return `<p style="margin: 10px 0;">You chose to pay online. Please verify that the payment was processed successfully.</p>`;
		} else {
			// They chose "pay upon receiving," but we still offer the Pay Now link
			return `
					<p style="margin: 10px 0;">You chose to pay upon receiving your sweets.</p>
					<strong>Accepted payment methods:</strong>
					<ul style="padding-left: 20px; margin-top: 5px;">
					  <li><strong>Cash</strong></li>
					  <li><strong>Venmo:</strong> @JoTrzeb</li>
					  <li><strong>Check:</strong> Payable to <em>Sweet Juanjo’s</em></li>
					  <li><strong>Zelle:</strong> sweetjuanjos@gmail.com</li>
					</ul>
			  
					<!-- Also show a "Pay Now" button if they'd like to switch to online payment -->
					<p style="margin: 15px 0 5px;">If you'd prefer to pay ahead of time, use the link below:</p>
					<a href="${paymentLink}" target="_blank" rel="noopener" style="${buttonStyle}">
					  Pay Now
					</a>
				  `;
		}
	};

	// Compile Customer Email Content
	return {
		subject: `Sweet Juanjo's - Order Confirmation for ${name}`,

		// HTML Email
		html: `
		<div style="font-family: Arial, sans-serif; color: #012623; background-color: #F0FFFE; padding: 20px; border-radius: 8px;">
		    <div style="text-align: center; margin-bottom: 45px;">
				<img 
				src="https://cdn.sanity.io/images/5veay66n/production/6911cf0024adacb9f474ae910bcefec7072ae74b-400x225.png" 
				alt="Client Logo" 
				style="max-width: 200px; height: auto; opacity: 0.6;" 
				/>
			</div>
			<h4 style="color: #012623; opacity: 0.8;">${greeting} ${name},</h4>		

			<!-- Opening Lines from emailContent -->
			${formatEmailContentHTML()}

			<!-- Conditional Delivery or Pickup Details Line -->
			${formatMethodDetailsHTML()}

			

			<hr style="border: 1px solid #29B2AC; margin: 20px 0;" />

			<h3 style="color: #29B2AC;">Order Details:</h3>
			<ul style="list-style: none; padding: 0;">  
				${formatItemListHTML()}
				<li style="margin-top: 10px"><strong>Method:</strong> ${orderMethod.toUpperCase()}</li>
				<li><strong>Address:</strong> ${address}</li>
			</ul>

				${formatGiftInformationHTML()} 
				<div style="margin-top: 10px margin-bottom: 10px">${formatPaymentDetailsHTML()}	</div>
			<p>We look forward to baking for you! </p>

			<p>Best regards,<br/>Sweet Juanjo's</p>
		</div>
		`,
	};
}
