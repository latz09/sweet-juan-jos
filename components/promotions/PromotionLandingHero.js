import Image from 'next/image';
import PromotionHeading from './PromotionHeading';
import Availability from './Availability';
import DateTimeDisplay from './DateTimeDisplay';
import TimeLine from './TimeLine';

const PromotionLandingHero = ({
	imageUrl,
	promotionTitle,
	promotionSubtitle,
	pickupDetails,
	deliveryDetails,
	pickupDateTimeSlots = [],
	deliveryDateTimeSlots = [],
	timeline,
}) => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 items-start max-w-[85rem] mx-auto px-4 lg:px-12 py-8 lg:py-16 gap-8 lg:gap-12'>
			{/* LEFT COLUMN WRAPPER */}
			<div className='contents lg:col-start-1 lg:flex lg:flex-col lg:gap-6'>

				{/* 1) Heading + Divider - MOBILE: order-1, DESKTOP: order-1 */}
				{(promotionTitle || promotionSubtitle) && (
					<div className='order-1 space-y-6 grid place-items-center'>
						<PromotionHeading
							title={promotionTitle}
							subtitle={promotionSubtitle}
						/>
						<div className='w-24 h-[2px] bg-primary hidden lg:block' />
					</div>
				)}

				{/* 2) Availability - MOBILE: order-2, DESKTOP: order-2 */}
				<div className='order-2 text-center lg:text-left'>
					<Availability
						pickupSlots={pickupDateTimeSlots}
						deliverySlots={deliveryDateTimeSlots}
					/>
				</div>

				{/* 3) Date/Time - MOBILE: order-4, DESKTOP: order-3 */}
				<div className='order-4 lg:order-3 text-center lg:text-left'>
					<div className='max-w-md'>
						<DateTimeDisplay
							pickupSlots={pickupDateTimeSlots}
							deliverySlots={deliveryDateTimeSlots}
						/>
					</div>
				</div>

				{/* 4) Timeline - MOBILE: order-5, DESKTOP: order-4 */}
				{timeline && (
					<div className='order-5 lg:order-4'>
						<div className='pt-4 text-center lg:text-left'>
							<TimeLine data={timeline} />
						</div>
					</div>
				)}
			</div>

			{/* 5) IMAGE - MOBILE: order-3, DESKTOP: right column */}
			{imageUrl && (
				<div className='order-3 lg:order-none lg:col-start-2'>
					<div className='relative w-full'>
						<Image
							src={imageUrl}
							alt='Promotion Image'
							width={800}
							height={600}
							className='object-cover rounded-lg w-full h-auto'
							priority
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default PromotionLandingHero;