'use client';

import { useState, useEffect } from 'react';
import OfferingGroup from './OfferingGroup';
import OrderModal from './modal-components/OrderModal';

const Offerings = ({ data, deliveryDetails, pickupDetails, giftOption, autoResponseEmailData }) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [selectedItemCost, setSelectedItemCost] = useState(null);


	useEffect(() => {
		// Add or remove the no-scroll class to the body based on showModal state
		if (showModal) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}

		// Cleanup when the component is unmounted
		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, [showModal]);

	function handleOrderNow(item) {
		setSelectedItem(item);
		setShowModal(true);
	}

	function handleCloseModal() {
		setSelectedItem(null);
		setShowModal(false);
	}

	return (
		<div className='grid gap-24 lg:gap-32 mt-12 max-w-4xl mx-auto'>
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
					giftOption={giftOption}
					onClose={handleCloseModal}
					deliveryDetails={deliveryDetails}
					pickupDetails={pickupDetails}
					autoResponseEmailData={autoResponseEmailData}
				/>
			)}
		</div>
	);
};

export default Offerings;
