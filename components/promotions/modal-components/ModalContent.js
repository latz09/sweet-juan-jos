// modal-components/ModalContent.jsx
'use client';

import { AiOutlineClose } from 'react-icons/ai';
import { FaDollarSign } from 'react-icons/fa6';
import Image from 'next/image';

import DeliveryValidationError from '../checkout-process/steps/DeliveryValidationError';
import LoadingOverlay from './LoadingOverlay';

export default function ModalContent({
	onClose,
	item,
	showValidationError,
	handleChoosePickup,
	handleContactSupport,
	content,
	isSubmitting,
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
								<p className='text-sm md:text-base text-center md:text-start mt-1 pr-3 pl-2'>
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

			{/* LoadingOverlay */}
			{isSubmitting && <LoadingOverlay />}
		</>
	);
}
