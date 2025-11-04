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
			{/* LEFT COLUMN WRAPPER:
          - mobile: contents (no wrapper) so children interleave with image via order-*
          - lg+: flex column pinned to col 1 */}
			<div className='contents lg:col-start-1 lg:flex lg:flex-col lg:gap-6'>
				{/* 1) Timeline */}
				{timeline && (
					<div className='order-1'>
						<div className='pt-4'>
							<TimeLine data={timeline} />
						</div>
					</div>
				)}

				{/* 2) Heading + Divider */}
				{(promotionTitle || promotionSubtitle) && (
					<div className='order-2 space-y-6'>
						<PromotionHeading
							title={promotionTitle}
							subtitle={promotionSubtitle}
						/>
						<div className='w-24 h-[2px] bg-primary hidden lg:block' />
					</div>
				)}

				{/* 4) Availability (after image on mobile) */}
				<div className='order-4'>
					<Availability
						pickupSlots={pickupDateTimeSlots}
						deliverySlots={deliveryDateTimeSlots}
					/>
				</div>

				{/* 5) Date/Time */}
				<div className='order-5'>
					<div className='max-w-md'>
						<DateTimeDisplay
							pickupSlots={pickupDateTimeSlots}
							deliverySlots={deliveryDateTimeSlots}
						/>
					</div>
				</div>
			</div>

			{/* 3) IMAGE — mobile position #3; lg locked to right column */}
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
