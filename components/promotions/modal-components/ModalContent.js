// modal-components/ModalContent.jsx
'use client';

import { AiOutlineClose } from 'react-icons/ai';
import { motion as m } from 'framer-motion';

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
			<m.div
				className='fixed inset-0 bg-dark/50 backdrop-blur-sm z-50'
				onClick={onClose}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition = {{ duration: 0.8, delay: 0.2 }}
				
			/>

			{/* Modal Container */}
			<m.div className='fixed inset-0 z-50 flex items-center justify-center'
			initial={{ x: '-100%' }}
			animate={{ x: 0 }}
			exit={{ x: '-100%' }}
			transition={{ type: 'spring', stiffness: 90, damping: 15 }}>
				<div
					className='relative bg-light  w-full max-w-5xl h-[90vh] lg:h-[95vh] mx-auto rounded shadow-lg overflow-hidden'
					onClick={(e) => e.stopPropagation()} // Prevent click propagation
				>
					{/* Close Button */}
					<button
						className='absolute top-4 right-4 bg-light p-1 md:p-2 rounded-full md:text-lg text-primary shadow-lg'
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
			</m.div>

			{/* LoadingOverlay */}
			{isSubmitting && <LoadingOverlay />}
		</>
	);
}
