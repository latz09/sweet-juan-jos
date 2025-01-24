import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_PROMOTION_QUERY } from '@/data/queries/FETCH_PROMOTION_QUERY';
import { notFound } from 'next/navigation';
import PromotionHeading from '@/components/promotions/PromotionHeading';
import TimeLine from '@/components/promotions/TimeLine';
import Delivery from '@/components/promotions/Delivery';
import Pickup from '@/components/promotions/PickUp';
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
		<main className='md:mt-4 '>
			<div className="max-w-7xl mx-auto py-16  bg-gradient-to-b from-dark via-dark/70 to-dark md:rounded-lg shadow-lg shadow-primary/20 px-2">
				<PromotionHeading
					title={promotion.title || ''}
					subtitle={promotion.subtitle || ''}
				/>
				<Availability delivery={promotion.delivery} pickup={promotion.pickup} />
                {promotion.timeline && <TimeLine data={promotion.timeline} />}
			</div>
			
			{promotion.delivery && promotion.delivery.enabled && (
				<Delivery data={promotion.delivery.details} />
			)}

			{/* {promotion.pickup && promotion.pickup.enabled && (
				<Pickup data={promotion.pickup.details} />
			)} */}

			{promotion.offerings && promotion.offerings.length > 0 && (
				<Offerings data={promotion.offerings} />
			)}
		</main>
	);
};

export default Promotions;

// Revalidate the page every 10 seconds
export const revalidate = 10;
