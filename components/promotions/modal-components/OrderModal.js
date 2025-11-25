'use client';
import handlePaymentChoice from '../checkout-process/steps/cart/handlePaymentChoice';
import { useState } from 'react';
import { useCart } from '../checkout-process/steps/cart/CartContext';
import { useRouter } from 'next/navigation';
import StepChooseMethod from '../checkout-process/steps/StepChooseMethod';
import StepDateTimeSelection from '../checkout-process/steps/StepDateTimeSelection';
import StepDeliveryAddress from '../checkout-process/steps/StepDeliveryAddress';
import StepUserInfo from '../checkout-process/steps/StepUserInfo';
import StepPaymentChoice from '../checkout-process/steps/StepPaymentChoice';
import StepThankYou from '../checkout-process/steps/StepThankYou';
import StepCart from '../checkout-process/steps/cart/StepCart';
import DeliveryValidationError from '../checkout-process/steps/DeliveryValidationError';
import ModalContent from './ModalContent';
import LoadingOverlay from './LoadingOverlay';

export default function OrderModal({
	promotionSlug,
	deliveryDateTimeSlots,
	pickupDateTimeSlots,
	onClose,
	enablePayNow,
	enablePayLater,
	...props
}) {
	const { cart, cartTotal, removeFromCart, updateCartItemQuantity, clearCart } =
		useCart();
	const [step, setStep] = useState(0);
	const [method, setMethod] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

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
		selectedDate: '',
		selectedTimeSlot: '',
		cartData: cart,
		promotionDetails: { ...props },
		slug: promotionSlug,
	});

	const router = useRouter();

	function handleNext() {
		setStep((prev) => prev + 1);
	}

	function handleBack() {
		// Adjust back navigation to account for new step
		if (step === 3 && method === 'pickup') {
			setStep(1.5); // Go back to date/time selection
		} else if (step === 1.5) {
			setStep(1); // Go back to method selection
		} else if (step === 3 && method === 'delivery') {
			setStep(2); // Go back to address
		} else if (step === 2) {
			setStep(1.5); // Go back to date/time selection
		} else {
			setStep((prev) => Math.max(prev - 1, 0));
		}
	}

	function handleSelectMethod(selectedMethod) {
		setMethod(selectedMethod);
		setFormData((prev) => ({
			...prev,
			orderMethod: selectedMethod,
		}));
		setStep(1.5); // Go to date/time selection
	}

	function handleDateSelect(date) {
		setFormData((prev) => ({ ...prev, selectedDate: date }));
	}

	function handleTimeSlotSelect(timeSlot) {
		setFormData((prev) => ({ ...prev, selectedTimeSlot: timeSlot }));
	}

	function handleDateTimeNext() {
		// After date/time selection, go to address (if delivery) or user info (if pickup)
		setStep(method === 'delivery' ? 2 : 3);
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
			orderMethod: 'pickup',
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

		case 1.5:
			content = (
				<StepDateTimeSelection
					method={method}
					dateTimeSlots={
						method === 'delivery' ? deliveryDateTimeSlots : pickupDateTimeSlots
					}
					selectedDate={formData.selectedDate}
					selectedTimeSlot={formData.selectedTimeSlot}
					onDateSelect={handleDateSelect}
					onTimeSlotSelect={handleTimeSlotSelect}
					onNext={handleDateTimeNext}
					onBack={handleBack}
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
					enablePayNow={enablePayNow}
					enablePayLater={enablePayLater}
					onPayNow={() =>
						handlePaymentChoice({
							payNow: true,
							formData: { ...formData, orderMethod: method },
							clearCart,
							setStep,
							onClose,
							cartTotal,
							setIsSubmitting,
						})
					}
					onPayLater={() =>
						handlePaymentChoice({
							payNow: false,
							formData: { ...formData, orderMethod: method },
							clearCart,
							setStep,
							onClose,
							cartTotal,
							setIsSubmitting,
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
			{isSubmitting && <LoadingOverlay />}
		</>
	);
}
