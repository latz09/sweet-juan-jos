import Image from 'next/image';
import PromotionHeading from './PromotionHeading';
import Availability from './Availability';
import TimeLine from './TimeLine';

const PromotionLandingHero = ({
	imageUrl,
	promotionTitle,
	promotionSubtitle,
	pickupDetails,
	deliveryDetails,
	timeline,
}) => {
	return (
		<div className='relative py-16 shadow-lg shadow-primary/20 px-2 overflow-hidden'>
			{/* Background Image */}
			{imageUrl && (
				<Image
					src={imageUrl}
					alt='Promotion Background'
					fill
					className='z-0 object-cover'
					priority
				/>
			)}

			{/* Overlay */}
			<div className='absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark/80 z-10'></div>

			{/* Content */}
			<div className='relative z-20 max-w-7xl mx-auto'>
				{(promotionTitle || promotionSubtitle) && (
					<PromotionHeading
						title={promotionTitle}
						subtitle={promotionSubtitle}
					/>
				)}
				{(deliveryDetails || pickupDetails) && (
					<Availability delivery={deliveryDetails} pickup={pickupDetails} />
				)}
				{timeline && <TimeLine data={timeline} />}
			</div>
		</div>
	);
};

export default PromotionLandingHero;
