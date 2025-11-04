'use client';

import OfferingGroup from './OfferingGroup';

import CartBar from './checkout-process/steps/cart/CartBar';

const Offerings = ({
	data,
	deliveryDetails,
	pickupDetails,
	giftOption,
	autoResponseEmailData, 
	promotionSlug,
	deliveryDateTimeSlots,
	pickupDateTimeSlots,
}) => {

	
	return (
		<div className='grid gap-24 lg:gap-32 mt-12 max-w-7xl mx-auto'>
			{data.map((groupItems, index) => {
				return (
					<OfferingGroup
						key={index}
						groupItems={groupItems}
						// onOrderNow={handleOrderNow}
					/>
				);
			})}

			<CartBar
				deliveryDetails={deliveryDetails}
				pickupDetails={pickupDetails}
				giftOption={giftOption}
				autoResponseEmailData={autoResponseEmailData}
				promotionSlug={promotionSlug}
				deliveryDateTimeSlots={deliveryDateTimeSlots}
				pickupDateTimeSlots={pickupDateTimeSlots}
			/>
		</div>
	);
};

export default Offerings;
