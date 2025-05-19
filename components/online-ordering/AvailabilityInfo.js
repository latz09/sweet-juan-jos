'use client';

import { useState } from 'react';
import { FaTruck, FaStore } from 'react-icons/fa';
import { parseBoldSyntax } from '../utils/parseBoldSyntax';

export default function AvailabilityInfo({
	allowDelivery,
	allowPickup,
	deliveryInfo = [],
	pickupInfo = [],
}) {
	const [modalContent, setModalContent] = useState(null);

	const openModal = (label, details, Icon) => {
		setModalContent({ label, details, Icon });
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
		<div className='w-full bg-dark text-dark px-6 py-4 backdrop-blur-md'>
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
				/>
			)}
		</div>
	);
}

const AvailabilityToggle = ({ label, icon: Icon, details = [], onClick }) => {
	if (!details.length) return null;

	return (
		<button
			onClick={() => onClick(label, details, Icon)}
			className='text-primary font-bold inline-flex justify-center items-center gap-3 bg-light px-4 py-2 rounded-sm w-full text-center text-lg lg:text-xl'
		>
			<Icon />
			{`${label} details`}
		</button>
	);
};

const Modal = ({ onClose, label, details, Icon }) => {
	return (
		<div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50'>
			<div className='bg-light rounded-lg max-w-2xl w-full px-6 py-12 mx-2 text-left shadow-lg relative'>
				<div className='flex items-center justify-center gap-4 mb-4'>
					<Icon className='text-primary text-xl' />
					<h2 className='text-lg font-bold'>{label} Information</h2>
				</div>

				<div className='space-y-3 text-base text-gray-700'>
					{details.map((line, idx) => (
						<p className='text-xl lg:text-2xl' key={idx}>
							{parseBoldSyntax(line)}
						</p>
					))}
				</div>

				<div className='grid place-items-center mt-6'>
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
