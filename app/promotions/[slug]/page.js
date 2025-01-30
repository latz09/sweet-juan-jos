import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_PROMOTION_QUERY } from '@/data/queries/FETCH_PROMOTION_QUERY';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/components/promotions/checkout-process/steps/cart/CartContext';
import Offerings from '@/components/promotions/Offerings';

import PromotionLandingHero from '@/components/promotions/PromotionLandingHero';

import { DateTime } from 'luxon';

export async function generateMetadata({ params }) {
	const { slug } = params;

	// Fetch promotion data from Sanity
	const promotion = await sanityClient.fetch(FETCH_PROMOTION_QUERY, { slug });

	if (!promotion) {
		return {
			title: 'Promotion Not Found',
			description: 'The promotion you are looking for does not exist.',
		};
	}

	// Convert endDate to Central Time (Chicago Time Zone) and format it
	const endDateRaw = promotion.timeline?.endDate;
	let endDateFormatted = 'TBA';

	if (endDateRaw) {
		const endDate = new Date(endDateRaw);
		const options = { timeZone: 'America/Chicago', month: 'long', day: 'numeric' };
		endDateFormatted = new Intl.DateTimeFormat('en-US', options).format(endDate);
	}

	// Format title and description
	const formattedTitle = `Sweet Juanjos - ${promotion.title || 'Delicious Treats'}`;
	const formattedDescription = `${promotion.subtitle || 'Discover our special treats for every occasion!'} - Order by ${endDateFormatted}`;

	return {
		title: formattedTitle,
		description: formattedDescription,
		openGraph: {
			title: formattedTitle,
			description: formattedDescription,
			images: promotion.landingPageImage
				? [{ url: promotion.landingPageImage }]
				: [],
		},
		twitter: {
			card: 'summary_large_image',
			title: formattedTitle,
			description: formattedDescription,
			images: promotion.landingPageImage ? [promotion.landingPageImage] : [],
		},
	};
}


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
