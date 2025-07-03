'use client';

import { useState } from 'react';
import { FaTruck, FaStore } from 'react-icons/fa';
import { parseBoldSyntax } from '../utils/parseBoldSyntax';

export default function AvailabilityInfo({
	allowDelivery,
	allowPickup,
	deliveryFee,
	deliveryInfo = [],
	pickupInfo = [],
}) {
	const [modalContent, setModalContent] = useState(null);

	const openModal = (label, details, Icon, deliveryFee) => {
		setModalContent({ label, details, Icon, deliveryFee });
	};

	const closeModal = () => setModalContent(null);

	if (!allowDelivery && !allowPickup) return null;

	let availabilityLabel = '';
	if (allowDelivery && allowPickup) {
		availabilityLabel = 'Available for delivery and pickup.';
	} else if (allowDelivery) {
		availabilityLabel = 'Available for delivery.';
	} else {
		availabilityLabel = 'Available for pickup.';
	}

	return (
		<div className='w-full bg-primary text-dark px-6 py-4 backdrop-blur-md'>
			<p className='font-bold text-center text-xl text-light'>
				{availabilityLabel}
			</p>

			<div
				className={`mt-4 grid place-items-center gap-4 text-sm text-center max-w-xl mx-auto ${
					allowDelivery && allowPickup ? 'md:grid-cols-2' : 'grid-cols-1'
				}`}
			>
				{allowDelivery && (
					<div
						className={`${!(allowPickup && allowDelivery) ? 'w-1/2' : 'w-full'}`}
					>
						<AvailabilityToggle
							label='Delivery'
							icon={FaTruck}
							details={deliveryInfo}
							deliveryFee={deliveryFee}
							onClick={openModal}
						/>
					</div>
				)}
				{allowPickup && (
					<div
						className={`${!(allowPickup && allowDelivery) ? 'w-1/2' : 'w-full'}`}
					>
						<AvailabilityToggle
							label='Pickup'
							icon={FaStore}
							details={pickupInfo}
							onClick={openModal}
						/>
					</div>
				)}
			</div>

			{modalContent && (
				<Modal
					onClose={closeModal}
					label={modalContent.label}
					details={modalContent.details}
					Icon={modalContent.Icon}
					deliveryFee={modalContent.deliveryFee}
				/>
			)}
		</div>
	);
}

const AvailabilityToggle = ({ label, icon: Icon, details = [], deliveryFee, onClick }) => {
	if (!details.length) return null;

	const handleClick = () => {
		// Pass deliveryFee separately, don't add it to details
		if (label === 'Delivery' && deliveryFee !== undefined) {
			onClick(label, details, Icon, deliveryFee);
		} else {
			onClick(label, details, Icon);
		}
	};

	return (
		<button
			onClick={handleClick}
			className='text-primary font-bold inline-flex justify-center items-center gap-3 bg-light px-4 py-2 rounded-sm w-full text-center text-lg lg:text-xl'
		>
			<Icon />
			{`${label} details`}
		</button>
	);
};

const Modal = ({ onClose, label, details, Icon, deliveryFee }) => {
	// Generate delivery fee message if this is a delivery modal
	const getDeliveryFeeMessage = () => {
		if (label !== 'Delivery' || deliveryFee === undefined) return null;
		
		if (deliveryFee === 0) {
			return 'Free delivery this week!';
		} else {
			return `Delivery fee: $${deliveryFee.toFixed(2)}`;
		}
	};

	const deliveryFeeMessage = getDeliveryFeeMessage();

	return (
		<div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50'>
			<div className='bg-light rounded-lg max-w-2xl w-full px-6 py-12 mx-2 text-left shadow-lg relative'>
				<div className='flex items-center justify-center gap-4 mb-4'>
					<Icon className='text-primary text-xl' />
					<h2 className='text-lg font-bold'>{label} Information</h2>
				</div>

				{/* Regular details */}
				<div className='space-y-3 text-base text-gray-700'>
					{details.map((line, idx) => (
						<p className='text-xl lg:text-2xl' key={idx}>
							{parseBoldSyntax(line)}
						</p>
					))}
				</div>

				{/* Delivery fee message as separate styled section */}
				{deliveryFeeMessage && (
					<div className='mt-6 p-4 bg-primary/10 rounded-sm border-l-2 rounded-l-lg border-primary'>
						<p className={`text-xl uppercase font-black text-center ${
							deliveryFee === 0 
								? '' 
								: 'text-white'
						}`}>
							{deliveryFee === 0 && '🎉 '}
							{deliveryFeeMessage}
						</p>
					</div>
				)}

				<div className='grid place-items-center mt-10'>
					<button
						onClick={onClose}
						className='bg-dark uppercase font-bold text-light py-2 px-8 rounded-full'
						aria-label='Close'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};