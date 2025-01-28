'use client';
import handlePaymentChoice from '../checkout-process/steps/cart/handlePaymentChoice';
import { useState } from 'react';
import { useCart } from '../checkout-process/steps/cart/CartContext'; // Import cart context
import { useRouter } from 'next/navigation';
// Import the step components
import StepChooseMethod from '../checkout-process/steps/StepChooseMethod';
import StepDeliveryAddress from '../checkout-process/steps/StepDeliveryAddress';
import StepUserInfo from '../checkout-process/steps/StepUserInfo';
import StepPaymentChoice from '../checkout-process/steps/StepPaymentChoice';
import StepThankYou from '../checkout-process/steps/StepThankYou';
import StepCart from '../checkout-process/steps/cart/StepCart';
import DeliveryValidationError from '../checkout-process/steps/DeliveryValidationError';

import ModalContent from './ModalContent';

// OrderModal.jsx

export default function OrderModal({ onClose, ...props }) {
	const { cart, cartTotal, removeFromCart, updateCartItemQuantity, clearCart } =
		useCart();
	const [step, setStep] = useState(0);
	const [method, setMethod] = useState(null);

	// Instead of just { address: '' }, store street, city, zip separately:
	const [formData, setFormData] = useState({
		street: '',
		city: '',
		zip: '',
		name: '',
		email: '',
		phone: '',
		recipientName: '',
		giftNote: '',
		cartData: cart,
	});

	const router = useRouter();

	// Keep your existing cart logic...

	// Step transitions
	function handleNext() {
		setStep((prev) => prev + 1);
	}

	/**
	 *  A custom "Back" button logic so skipping works properly.
	 *
	 *  - If we are on step 3 (the User Info screen), check if method=pickup.
	 *    Because we *never* really visited Step 2 if method=pickup,
	 *    so going "back" should skip it.
	 */
	function handleBack() {
		setStep((prev) => {
			if (prev === 3 && method === 'pickup') {
				return 1; // jump back to Step 1: Choose Method
			} else {
				return Math.max(prev - 1, 0);
			}
		});
	}

	/**
	 *  Decide step # when user picks method:
	 *    - If "delivery" => go to step 2
	 *    - If "pickup"   => skip step 2 entirely, go to step 3
	 */
	function handleSelectMethod(selectedMethod) {
		setMethod(selectedMethod);
		if (selectedMethod === 'delivery') {
			setStep(2);
		} else {
			// pickup => skip Delivery Address
			setStep(3);
		}
	}

	function handleAddressNext() {
		// Zip allowed? If not => setStep(6). Otherwise => step=3
		// (We’ll check it inside the StepDeliveryAddress.)
		setStep(3);
	}

	function handleUserInfoNext() {
		setStep(4);
	}

	// function handlePaymentChoice(payNow) {
	// 	console.log('Payment choice:', payNow);
	// 	console.log('Order data:', formData);

	// 	if (payNow) {
	// 		// Logic for "Pay Now"
	// 		console.log('Redirecting to payment gateway...');
	// 		setTimeout(() => {
	// 			console.log('Payment processed successfully.');
	// 			clearCart(); // Clear the cart after payment is processed
	// 			onClose(); // Go to Thank You step
	// 		}, 2000); // Simulate payment delay
	// 	} else {
	// 		// Logic for "Pay Later"
	// 		console.log('Order confirmed for pay later.');
	// 		clearCart(); // Clear the cart immediately
	// 		setStep(5); // Go to Thank You step immediately
	// 	}
	// }

	// For the Delivery Validation error step
	function handleChoosePickup() {
		setMethod('pickup');
		setStep(3); // Goes to contact & gift details
	}
	function handleContactSupport() {
		router.push('/contact-katie-jo'); // Navigate to the contact page
		onClose(); // Close the modal
	}

	// Render the right content based on step
	let content;
	switch (step) {
		case 0:
			content = (
				<StepCart
					cart={cart}
					cartTotal={cartTotal}
					removeFromCart={removeFromCart}
					updateCartItemQuantity={updateCartItemQuantity}
					onNext={handleNext}
					// Add any other props
				/>
			);
			break;

		case 1:
			content = (
				<StepChooseMethod
					method={method}
					onSelectMethod={handleSelectMethod}
					onBack={handleBack}
					pickupDetails={props.pickupDetails}
					deliveryDetails={props.deliveryDetails}
				/>
			);
			break;

		case 2:
			// Only valid if method=delivery
			if (method === 'delivery') {
				content = (
					<StepDeliveryAddress
						deliveryDetails={props.deliveryDetails}
						// Instead of local state, read & write from formData
						street={formData.street}
						city={formData.city}
						zip={formData.zip}
						onChange={(field, value) =>
							setFormData((prev) => ({ ...prev, [field]: value }))
						}
						onNext={handleAddressNext}
						onBack={handleBack}
						onValidationError={() => setStep(6)}
					/>
				);
			} else {
				// If user tries to go to step2 with method=pickup,
				// you could return null or forcibly jump to step3.
				content = null;
			}
			break;

		case 3:
			content = (
				<StepUserInfo
					method={method}
					pickupDetails={props.pickupDetails}
					deliveryAddress={`${formData.street}, ${formData.city}, ${formData.zip}`}
					formData={formData}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							[e.target.name]: e.target.value,
						}))
					}
					onNext={handleUserInfoNext}
					onBack={handleBack}
					giftOption={props.giftOption}
				/>
			);
			break;

		case 4:
			content = (
				<StepPaymentChoice
					onPayNow={() =>
						handlePaymentChoice({
							payNow: true,
							formData,
							clearCart,
							setStep,
							onClose,
						})
					}
					onPayLater={() =>
						handlePaymentChoice({
							payNow: false,
							formData,
							clearCart,
							setStep,
							onClose,
						})
					}
					onBack={handleBack}
				/>
			);
			break;

		case 5:
			content = <StepThankYou onClose={onClose} />;
			break;

		case 6:
			content = (
				<DeliveryValidationError
					handleChoosePickup={handleChoosePickup}
					handleContactSupport={handleContactSupport}
					isPickupAvailable={props.pickupDetails !== 'not-available'}
				/>
			);
			break;

		default:
			content = <p className='text-red-500'>Invalid step.</p>;
	}

	return <ModalContent onClose={onClose} content={content} />;
}
