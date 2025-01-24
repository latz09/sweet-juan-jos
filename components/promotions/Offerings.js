'use client'

import { useState } from 'react';
import OfferingGroup from './OfferingGroup';
import OrderModal from './checkout-process/OrderModal';

const Offerings = ({ data, deliveryDetails, pickupDetails }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	function handleOrderNow(item) {
		setSelectedItem(item);
		setShowModal(true);
	}

	function handleCloseModal() {
		setSelectedItem(null);
		setShowModal(false);
	}

	return (
		<div className='grid  gap-24 mt-12 max-w-4xl mx-auto'>
			{data.map((groupItems, index) => {
				return (
					<OfferingGroup
						key={index}
						groupItems={groupItems}
						onOrderNow={handleOrderNow}
					/>
				);
			})}

			{/* Conditionally render the modal */}
			{showModal && (
				<OrderModal
					item={selectedItem}					
					onClose={handleCloseModal}
					deliveryDetails={deliveryDetails}
					pickupDetails={pickupDetails}
				/>
			)}
		</div>
	);
};

export default Offerings;
