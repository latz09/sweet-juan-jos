'use client';

import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaDollarSign } from 'react-icons/fa6';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Import the step components
import StepChooseMethod from '../checkout-process/steps/StepChooseMethod';
import StepDeliveryAddress from '../checkout-process/steps/StepDeliveryAddress';
import StepUserInfo from '../checkout-process/steps/StepUserInfo';
import StepPaymentChoice from '../checkout-process/steps/StepPaymentChoice';
import StepThankYou from '../checkout-process/steps/StepThankYou'; // New StepThankYou component

import DeliveryValidationError from '../checkout-process/steps/DeliveryValidationError';
import LoadingOverlay from './LoadingOverlay';
import ModalContent from './ModalContent';

export default function OrderModal({
	item,
	onClose,
	deliveryDetails,
	pickupDetails,
	giftOption,
	autoResponseEmailData,
}) {
	
	// Step indicators:
	// 0 -> Choose method
	// 1 -> Delivery address (if "delivery"), else skip
	// 2 -> Contact & gift details
	// 3 -> Payment choice
	// 4 -> Thank You (after Pay Later)
	const [step, setStep] = useState(0);
	const [method, setMethod] = useState(null);
	const router = useRouter();
	const [submissionError, setSubmissionError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		address: '',
		name: '',
		email: '',
		phone: '',
		recipientName: '',
		giftNote: '',
	});

	const [showValidationError, setShowValidationError] = useState(false);

	// Define allowed zip codes
	const allowedZipCodes = ['54481', '54482', '54467']; // Replace with actual zip codes

	// Disable background scrolling when modal is open
	useEffect(() => {
		document.body.classList.add('no-scroll');
		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, []);

	// Close modal on ESC key
	useEffect(() => {
		function handleEsc(e) {
			if (e.key === 'Escape') {
				onClose();
			}
		}
		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	// Step navigation handlers
	function handleSelectMethod(selectedMethod) {
		setMethod(selectedMethod);
		if (selectedMethod === 'pickup') {
			setStep(2); // Skip address
		} else {
			setStep(1); // Go to address
		}
	}

	function handleAddressNext(fullAddress) {
		const zip = fullAddress.split(',').pop().trim();
		if (!allowedZipCodes.includes(zip)) {
			setShowValidationError(true);
		} else {
			setFormData((prev) => ({ ...prev, address: fullAddress })); // Update formData.address
			setStep(2);
		}
	}

	function handleUserInfoNext() {
		setStep(3);
	}

	async function handlePaymentChoice(payNow) {
		const orderInfo = {
			itemTitle: item?.itemTitle || 'Unknown Item',
			itemSubtitle: item?.itemSubtitle || '',
			method,
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			recipientName: formData.recipientName,
			giftNote: formData.giftNote,
			address: method === 'delivery' ? formData.address : '',
			payNow,
			giftOption,
			autoResponseEmailData,
		};

		setIsSubmitting(true);
		setSubmissionError(null);

		try {
			const response = await fetch('/api/submitPromotionOrder', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderInfo),
			});

			const data = await response.json();

			if (response.ok && data.success) {
				console.log('Order submitted successfully:', data);

				if (payNow) {
					if (item?.buyNowLink) {
						window.open(item.buyNowLink, '_blank');
					} else {
						console.warn('buyNowLink is not provided for this item.');
						window.open('https://www.google.com/', '_blank');
					}
					onClose();
				} else {
					setStep(4);
				}
			} else {
				console.error(
					'Failed to submit order:',
					data.message || 'Unknown error'
				);
				setSubmissionError(data.message || 'Failed to submit order.');
			}
		} catch (error) {
			console.error('Error submitting order:', error);
			setSubmissionError('An unexpected error occurred. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	}

	// Back button logic
	function handleGoBack() {
		if (step === 4) {
			setStep(3);
		} else if (step === 3) {
			setStep(2);
		} else if (step === 2) {
			if (method === 'delivery') {
				setStep(1);
			} else {
				setStep(0);
			}
		} else if (step === 1) {
			setStep(0);
		}
		// Step 0 has no back
	}

	// Handle input changes for user info
	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	// Handle retrying zip code validation by choosing pickup
	function handleChoosePickup() {
		setMethod('pickup');
		setStep(2);
		setShowValidationError(false);
	}

	// Handle contacting support
	function handleContactSupport() {
		// Navigate to the Contact Katie Jo page using Next.js App Router
		router.push('/contact-katie-jo');
	}

	// Determine which step content to show using switch statement
	let content;

	switch (step) {
		case 0: // Step 0: Choose method
			content = (
				<StepChooseMethod
					method={method}
					onSelectMethod={handleSelectMethod}
					pickupDetails={pickupDetails}
					deliveryDetails={deliveryDetails}
				/>
			);
			break;

		case 1: // Step 1: Delivery address (only if method is 'delivery')
			if (method === 'delivery') {
				content = (
					<StepDeliveryAddress
						deliveryDetails={deliveryDetails}
						onNext={handleAddressNext}
						onBack={handleGoBack}
						
					/>
				);
			}
			break;

		case 2: // Step 2: User info
			content = (
				<StepUserInfo
					method={method}
					pickupDetails={pickupDetails}
					deliveryAddress={formData.address}
					formData={formData}
					onChange={handleChange}
					onNext={handleUserInfoNext}
					onBack={handleGoBack}
					giftOption={giftOption}
				/>
			);
			break;

		case 3: // Step 3: Payment choice
			content = (
				<StepPaymentChoice
					onPayNow={() => handlePaymentChoice(true)}
					onPayLater={() => handlePaymentChoice(false)}
					onBack={handleGoBack}
				/>
			);
			break;

		case 4: // Step 4: Thank You
			content = <StepThankYou onClose={onClose} />;
			break;

		default:
			content = <p className='text-red-500'>Invalid step.</p>;
			break;
	}

	return (
		<ModalContent
			onClose={onClose}
			item={item}
			showValidationError={showValidationError}
			handleChoosePickup={handleChoosePickup}
			handleContactSupport={handleContactSupport}
			content={content}
			isSubmitting={isSubmitting}
			isPickupAvailable={pickupDetails !== 'not-available'}
		/>
	);
}
