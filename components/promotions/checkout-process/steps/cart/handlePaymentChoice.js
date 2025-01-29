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
		// Send data to Sanity API
		const response = await fetch('/api/submitPromotionOrder', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...formData,
				payNow,
			}),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || 'Failed to submit order');
		}

		console.log('Sanity submission result:', result);

		if (payNow) {
			// We already do the fetch to `/api/submitPromotionOrder`
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || 'Failed to submit order');
			}

			// If payNow, we expect `result.paymentLink` from the server
			const { paymentLink } = result;
			console.log('Payment Link from Square:', paymentLink);

			if (paymentLink) {
				// Redirect user to Square Checkout
				window.location.href = paymentLink;
			}

			// Then do your normal clearing cart stuff, etc.
			setTimeout(() => {
				clearCart();
				setIsSubmitting(false);
				onClose();
			}, 200);
		} else {
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
