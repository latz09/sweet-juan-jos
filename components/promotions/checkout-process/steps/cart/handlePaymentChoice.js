export default function handlePaymentChoice({
	payNow,
	formData,
	clearCart,
	setStep,
	onClose,
}) {
	console.log('Payment choice:', payNow);
	console.log('Order data:', formData);

	if (payNow) {
		// Logic for "Pay Now"
		console.log('Redirecting to payment gateway...');
		setTimeout(() => {
			console.log('Payment processed successfully.');
			clearCart(); // Clear the cart after payment is processed
			onClose(); // Close the modal or navigate to Thank You
		}, 2000); // Simulate payment delay
	} else {
		// Logic for "Pay Later"
		console.log('Order confirmed for pay later.');
		clearCart(); // Clear the cart immediately
		setStep(5); // Go to Thank You step immediately
	}
}
