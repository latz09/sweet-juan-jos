'use client';

import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaDollarSign } from 'react-icons/fa6';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Import the step components
import StepChooseMethod from './steps/StepChooseMethod';
import StepDeliveryAddress from './steps/StepDeliveryAddress';
import StepUserInfo from './steps/StepUserInfo';
import StepPaymentChoice from './steps/StepPaymentChoice';
import StepThankYou from './steps/StepThankYou'; // New StepThankYou component


import DeliveryValidationError from './steps/DeliveryValidationError';

export default function OrderModal({
	item,
	onClose,
	deliveryDetails,
	pickupDetails,
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
		// Extract zip code from fullAddress
		const zip = fullAddress.split(',').pop().trim();
		if (!allowedZipCodes.includes(zip)) {
			setShowValidationError(true);
		} else {
			setFormData((prev) => ({ ...prev, address: fullAddress }));
			setStep(2);
		}
	}

	function handleUserInfoNext() {
		setStep(3);
	}

	function handlePaymentChoice(payNow) {
		// Build final order object
		const orderInfo = {
			item: item?.itemTitle || 'Unknown Item',
			method,
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			recipientName: formData.recipientName,
			giftNote: formData.giftNote,
		};

		// Include address if delivery is selected
		if (method === 'delivery') {
			orderInfo.address = formData.address;
		}

		console.log('Submitting order:', orderInfo);
		console.log('Pay Now:', payNow);

		if (payNow) {
			// Open the buyNowLink in a new tab
			if (!item?.buyNowLink) {
				window.open('https://www.google.com/', '_blank');
			} else {
				console.warn('buyNowLink is not provided for this item.');
			}
			// Close the modal after opening the link
			onClose();
		} else {
			// Proceed to Thank You step
			setStep(4);
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
				<StepChooseMethod method={method} onSelectMethod={handleSelectMethod} />
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
		<>
			{/* Overlay */}
			<div
				className='fixed inset-0 bg-dark/50 backdrop-blur-sm z-50'
				onClick={onClose}
			/>
			{/* Modal Container */}
			<div className='fixed inset-0 z-50 flex items-center justify-center'>
				<div
					className='relative bg-light px-6 w-full max-w-5xl h-[90vh] lg:h-[70vh] mx-auto rounded shadow-lg overflow-hidden'
					onClick={(e) => e.stopPropagation()} // Prevent click propagation
				>
					{/* Close Button */}
					<button
						className='absolute top-2 md:top-4 right-2 md:right-4 bg-primary p-1 md:p-2 rounded-full md:text-lg text-light shadow-lg'
						onClick={onClose}
						aria-label='Close Modal'
					>
						<AiOutlineClose />
					</button>

					{/* Title Section */}
					<div className='space-y-8 flex flex-col h-full'>
						<div className='flex items-center gap-4 py-6 px-4 border-b'>
							<Image
								src={item?.itemImageUrl || '/default-image.png'}
								alt={item?.itemTitle || 'Unknown'}
								width={50}
								height={50}
							/>
							<div>
								<div className='flex items-center'>
									<h2 className='text-xl font-bold text-center md:text-start'>
										{item?.itemTitle || 'Unknown'}
									</h2>
									<div className='flex ml-4 font-bold text-xl'>
										-
										<FaDollarSign className='inline-block text-sm opacity-70' />{' '}
										{item?.itemCost || '0.00'}
									</div>
								</div>
								<p className='text-xs md:text-base text-center md:text-start mt-1 pr-3 pl-2'>
									{item?.itemDescription || 'No description'}
								</p>
							</div>
						</div>

						{/* Content Section */}
						<div className='grid place-items-center h-full overflow-y-auto max-h-[calc(100vh-4rem)] pb-12 pt-4 scrollbar-hide'>
							{showValidationError ? (
								<DeliveryValidationError
									handleChoosePickup={handleChoosePickup}
									handleContactSupport={handleContactSupport}
								/>
							) : (
								content
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
