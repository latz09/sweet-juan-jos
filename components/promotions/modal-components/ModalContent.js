// modal-components/ModalContent.jsx
'use client';

import { AiOutlineClose } from 'react-icons/ai';
import { FaDollarSign } from 'react-icons/fa6';
import Image from 'next/image';

import DeliveryValidationError from '../checkout-process/steps/DeliveryValidationError';
import LoadingOverlay from './LoadingOverlay';

export default function ModalContent({
	onClose,

	showValidationError,
	handleChoosePickup,
	handleContactSupport,
	content,
	isSubmitting,
	isPickupAvailable,
}) {
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
					className='relative bg-light  w-full max-w-5xl h-[90vh] lg:h-[70vh] mx-auto rounded shadow-lg overflow-hidden'
					onClick={(e) => e.stopPropagation()} // Prevent click propagation
				>
					{/* Close Button */}
					<button
						className='absolute top-2 md:top-4 right-2 md:right-4 bg-light p-1 md:p-2 rounded-full md:text-lg text-primary shadow-lg'
						onClick={onClose}
						aria-label='Close Modal'
					>
						<AiOutlineClose />
					</button>

					{/* Title Section */}
					<div className='space-y-8 flex flex-col h-full'>
						<div className='p-8 bg-primary text-xl text-light font-bold'>
							Your Order Details
						</div>
						{/* Content Section */}
						<div className='grid place-items-center h-full overflow-y-auto max-h-[calc(100vh-4rem)] pb-12 pt-4 scrollbar-hide px-6'>
							{showValidationError ? (
								<DeliveryValidationError
									handleChoosePickup={handleChoosePickup}
									handleContactSupport={handleContactSupport}
									isPickupAvailable={isPickupAvailable}
								/>
							) : (
								content
							)}
						</div>
					</div>
				</div>
			</div>

			{/* LoadingOverlay */}
			{isSubmitting && <LoadingOverlay />}
		</>
	);
}
