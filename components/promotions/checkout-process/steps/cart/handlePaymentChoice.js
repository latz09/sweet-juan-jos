export default async function handlePaymentChoice({
	payNow,
	formData,
	clearCart,
	setStep,
	onClose,
	setIsSubmitting,
}) {
	setIsSubmitting(true);

	try {
		// 1. Send data to /api/submitPromotionOrder
		const response = await fetch('/api/submitPromotionOrder', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...formData,
				payNow,
			}),
		});

		// 2. Parse response once
		const result = await response.json();

		// 3. Check if request succeeded
		if (!response.ok) {
			throw new Error(result.message || 'Failed to submit order');
		}

		console.log('Sanity submission result:', result);

		// 4. If payNow, handle payment link
		if (payNow) {
			const { paymentLink } = result;
			console.log('Payment Link from Square:', paymentLink);

			// Redirect to Square Checkout if available
			if (paymentLink) {
				window.location.href = paymentLink;
			}

			// Clear the cart and close
			setTimeout(() => {
				clearCart();
				setIsSubmitting(false);
				onClose();
			}, 200);
		} else {
			// 5. Otherwise, continue to next step
			setTimeout(() => {
				clearCart();
				setStep(5);
				setIsSubmitting(false);
			}, 200);
		}
	} catch (error) {
		console.error('Error submitting order:', error);
		alert('There was an issue submitting your order. Please try again.');
		setIsSubmitting(false);
	}
}
