'use client';

import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
// Import the step components
import StepChooseMethod from './steps/StepChooseMethod';
import StepDeliveryAddress from './steps/StepDeliveryAddress';
import StepUserInfo from './steps/StepUserInfo';
import StepPaymentChoice from './steps/StepPaymentChoice';
import Image from 'next/image';

export default function OrderModal({
	item,
	onClose,
	deliveryDetails,
	pickupDetails,
}) {
	// step 0 -> choose method
	// step 1 -> delivery address (if "delivery"), else skip
	// step 2 -> contact & gift details
	// step 3 -> payment choice
	const [step, setStep] = useState(0);
	const [method, setMethod] = useState(null);

	const [formData, setFormData] = useState({
		address: '',
		name: '',
		email: '',
		phone: '',
		recipientName: '',
		giftNote: '',
	});

	// Close modal on ESC
	useEffect(() => {
		function handleEsc(e) {
			if (e.key === 'Escape') {
				onClose();
			}
		}
		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	// Step navigation
	function handleSelectMethod(selectedMethod) {
		setMethod(selectedMethod);
		if (selectedMethod === 'pickup') {
			setStep(2); // skip address
		} else {
			setStep(1); // go to address
		}
	}

	function handleAddressNext() {
		setStep(2);
	}

	function handleUserInfoNext() {
		setStep(3);
	}

	function handlePaymentChoice(payNow) {
		// Build final order object
		const orderInfo = {
			item: item?.itemTitle,

			method,
			// Additional info:
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			recipientName: formData.recipientName,
			giftNote: formData.giftNote,
		};
		// If delivery, also add address
		if (method === 'delivery') {
			orderInfo.address = formData.address;
		}

		console.log('Submitting order:', orderInfo);
		console.log('payNow:', payNow);

		// Do your payNow logic or payLater logic
		onClose();
	}

	// Back button logic
	function handleGoBack() {
		if (step === 3) {
			setStep(2);
		} else if (step === 2) {
			if (method === 'delivery') setStep(1);
			else setStep(0);
		} else if (step === 1) {
			setStep(0);
		}
		// step 0 has no back
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	// Determine which step content to show
	let content;
	if (step === 0) {
		// Step 0
		content = (
			<StepChooseMethod method={method} onSelectMethod={handleSelectMethod} />
		);
	} else if (step === 1 && method === 'delivery') {
		// Step 1
		content = (
			<StepDeliveryAddress
				deliveryDetails={deliveryDetails}
				addressValue={formData.address}
				onChange={handleChange}
				onNext={handleAddressNext}
				onBack={handleGoBack}
			/>
		);
	} else if (step === 2) {
		// Step 2
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
	} else if (step === 3) {
		// Step 3
		content = (
			<StepPaymentChoice
				onPayNow={() => handlePaymentChoice(true)}
				onPayLater={() => handlePaymentChoice(false)}
				onBack={handleGoBack}
			/>
		);
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
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close Button */}
					<button
						className='absolute top-2 md:top-4 right-2 md:right-4 bg-primary p-1 md:p-2 rounded-full  md:text-lg text-light shadow-lg'
						onClick={onClose}
					>
						<AiOutlineClose />
					</button>

					{/* Title */}
					<div className='space-y-8 flex flex-col h-full'>
						<div className='flex items-center gap-4 py-4 px-4 border-b'>
							<Image
								src={item?.itemImageUrl}
								alt={item?.itemTitle}
								width={50}
								height={50}
							/>
							<div>
								<h2 className='text-xl font-bold text-center md:text-start '>
									{item?.itemTitle || 'Unknown'}
								</h2>
								<p className='text-xs md:text-base text-center md:text-start mt-1 pr-3 pl-2'>
									{item?.itemDescription || 'Unknown'}
								</p>
							</div>
						</div>
						<div className='  grid place-items-center h-full overflow-y-auto max-h-[calc(100vh-4rem)] pb-12 pt-4 scrollbar-hide '>
							{content}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
