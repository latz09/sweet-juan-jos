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
}) => {
	return (
		<div className='grid gap-24 lg:gap-32 mt-12 max-w-4xl mx-auto'>
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
			/>
		</div>
	);
};

export default Offerings;
