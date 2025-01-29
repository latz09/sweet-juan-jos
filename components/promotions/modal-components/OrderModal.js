'use client';
import handlePaymentChoice from '../checkout-process/steps/cart/handlePaymentChoice';
import { useState } from 'react';
import { useCart } from '../checkout-process/steps/cart/CartContext';
import { useRouter } from 'next/navigation';
import StepChooseMethod from '../checkout-process/steps/StepChooseMethod';
import StepDeliveryAddress from '../checkout-process/steps/StepDeliveryAddress';
import StepUserInfo from '../checkout-process/steps/StepUserInfo';
import StepPaymentChoice from '../checkout-process/steps/StepPaymentChoice';
import StepThankYou from '../checkout-process/steps/StepThankYou';
import StepCart from '../checkout-process/steps/cart/StepCart';
import DeliveryValidationError from '../checkout-process/steps/DeliveryValidationError';
import ModalContent from './ModalContent';
import LoadingOverlay from './LoadingOverlay'; // Import your loading overlay

export default function OrderModal({ onClose, ...props }) {
	const { cart, cartTotal, removeFromCart, updateCartItemQuantity, clearCart } =
		useCart();
	const [step, setStep] = useState(0);
	const [method, setMethod] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false); // Track loading state

	const [formData, setFormData] = useState({
		street: '',
		city: '',
		zip: '',
		name: '',
		email: '',
		phone: '',
		orderMethod: '',
		recipientName: '',
		giftNote: '',
		cartData: cart,
		promotionDetails: { ...props },
	});
	console.log('formData:', formData);

	const router = useRouter();

	function handleNext() {
		setStep((prev) => prev + 1);
	}

	function handleBack() {
		setStep((prev) =>
			prev === 3 && method === 'pickup' ? 1 : Math.max(prev - 1, 0)
		);
	}

	function handleSelectMethod(selectedMethod) {
		setMethod(selectedMethod);

		// Use functional update to ensure state is updated correctly
		setFormData((prev) => {
			const updatedData = { ...prev, orderMethod: selectedMethod };
			
			return updatedData;
		});

		setStep(selectedMethod === 'delivery' ? 2 : 3);
	}

	function handleAddressNext() {
		setStep(3);
	}

	function handleUserInfoNext() {
		setStep(4);
	}

	function handleChoosePickup() {
		setMethod('pickup');
		setFormData((prev) => ({
			...prev,
			orderMethod: 'pickup', // Set orderMethod directly
		}));
		setStep(3);
	}

	function handleContactSupport() {
		router.push('/contact-katie-jo');
		onClose();
	}

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
					onClose={onClose}
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
			content =
				method === 'delivery' ? (
					<StepDeliveryAddress
						deliveryDetails={props.deliveryDetails}
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
				) : null;
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
							formData: { ...formData, orderMethod: method },
							clearCart,
							setStep,
							onClose,
							setIsSubmitting, // Pass setIsSubmitting
						})
					}
					onPayLater={() =>
						handlePaymentChoice({
							payNow: false,
							formData: { ...formData, orderMethod: method },
							clearCart,
							setStep,
							onClose,
							setIsSubmitting, // Pass setIsSubmitting
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

	return (
		<>
			<ModalContent
				onClose={onClose}
				content={content}
				isSubmitting={isSubmitting}
			/>
			{isSubmitting && <LoadingOverlay />}{' '}
			{/* Show LoadingOverlay when submitting */}
		</>
	);
}
