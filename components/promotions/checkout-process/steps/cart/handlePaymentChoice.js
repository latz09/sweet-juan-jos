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

		// Handle success
		if (payNow) {
			setTimeout(() => {
				clearCart();
				setIsSubmitting(false);
				onClose();
			}, 3200);
		} else {
			setTimeout(() => {
				clearCart();
				setStep(5);
				setIsSubmitting(false);
			}, 3200);
		}
	} catch (error) {
		console.error('Error submitting order:', error);
		alert('There was an issue submitting your order. Please try again.');
		setIsSubmitting(false);
	}
}
