export default function handlePaymentChoice({
	payNow,
	formData,
	clearCart,
	setStep,
	onClose,
	setIsSubmitting,
}) {
	console.log('Payment choice:', payNow);
	console.log('Order data:', formData);

	setIsSubmitting(true); // Show LoadingOverlay

	if (payNow) {
		console.log('Redirecting to payment gateway...');
		setTimeout(() => {
			console.log('Payment processed successfully.');
			clearCart(); // Clear cart after payment
			setIsSubmitting(false); // Hide loading
			onClose(); // Close modal
		}, 3200);
	} else {
		console.log('Order confirmed for pay later.');
		setTimeout(() => {
			clearCart(); // Clear cart immediately
			setStep(5); // Go to Thank You step
			setIsSubmitting(false); // Hide loading
		}, 3200); // Simulating a short delay
	}
}
