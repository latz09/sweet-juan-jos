import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_PROMOTION_QUERY } from '@/data/queries/FETCH_PROMOTION_QUERY';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PromotionHeading from '@/components/promotions/PromotionHeading';
import TimeLine from '@/components/promotions/TimeLine';
import Delivery from '@/components/promotions/Delivery';
// import Pickup from '@/components/promotions/PickUp';
import Offerings from '@/components/promotions/Offerings';
import Availability from '@/components/promotions/Availability';

const Promotions = async ({ params }) => {
	const { slug } = params;

	// Fetch promotion data from Sanity
	const promotion = await sanityClient.fetch(FETCH_PROMOTION_QUERY, { slug });

	// Handle not found promotions
	if (!promotion) {
		notFound(); // This will trigger Next.js's built-in 404 page
	}

	return (
		<main className=' '>
			
			<div className='relative py-16 shadow-lg shadow-primary/20 px-2 overflow-hidden'>
				{/* Background Image */}
				{promotion.landingPageImage && (
					<Image
						src={promotion.landingPageImage}
						alt='Promotion Background'
						fill // Replaces layout="fill"
						className='z-0 object-cover' // Replaces objectFit="cover"
						priority
					/>
				)}

				{/* Overlay */}
				<div className='absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark/80 z-10'></div>

				{/* Content */}
				<div className='relative z-20'>
					<PromotionHeading
						title={promotion.title || ''}
						subtitle={promotion.subtitle || ''}
					/>
					<Availability
						delivery={promotion.delivery}
						pickup={promotion.pickup}
					/>
					{promotion.timeline && <TimeLine data={promotion.timeline} />}
				</div>
			</div>
			;
			{promotion.delivery && promotion.delivery.enabled && (
				<Delivery data={promotion.delivery.details} />
			)}
			
			{promotion.offerings && promotion.offerings.length > 0 && (
				<Offerings
					data={promotion.offerings}
					deliveryDetails={
						promotion.delivery?.enabled ? promotion.delivery.details : null
					}
					pickupDetails={
						promotion.pickup?.enabled ? promotion.pickup.details : null
					}
				/>
			)}
		</main>
	);
};

export default Promotions;

// Revalidate the page every 10 seconds
export const revalidate = 10;
