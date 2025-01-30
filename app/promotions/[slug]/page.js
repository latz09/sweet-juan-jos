import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_PROMOTION_QUERY } from '@/data/queries/FETCH_PROMOTION_QUERY';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/components/promotions/checkout-process/steps/cart/CartContext';
import Offerings from '@/components/promotions/Offerings';

import PromotionLandingHero from '@/components/promotions/PromotionLandingHero';

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
			<CartProvider>
				<PromotionLandingHero
					imageUrl={promotion.landingPageImage || null}
					promotionTitle={promotion.title || ''}
					promotionSubtitle={promotion.subtitle || ''}
					pickupDetails={
						promotion.pickup?.enabled ? promotion.pickup.details : null
					}
					deliveryDetails={
						promotion.delivery?.enabled ? promotion.delivery.details : null
					}
					timeline={promotion.timeline || null}
				/>

				{promotion.offerings && promotion.offerings.length > 0 && (
					<Offerings
						data={promotion.offerings}
						deliveryDetails={
							promotion.delivery?.enabled
								? promotion.delivery.details
								: 'not-available'
						}
						pickupDetails={
							promotion.pickup?.enabled
								? promotion.pickup.details
								: 'not-available'
						}
						giftOption={promotion.giftOption || false}
						autoResponseEmailData={promotion.autoResponseEmail || null}
						promotionSlug={slug}
					/>
				)}
			</CartProvider>
		</main>
	);
};

export default Promotions;

// Revalidate the page every 10 seconds
export const revalidate = 10;
