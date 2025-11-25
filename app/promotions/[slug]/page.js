import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_PROMOTION_QUERY } from '@/data/queries/FETCH_PROMOTION_QUERY';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/components/promotions/checkout-process/steps/cart/CartContext';
import Offerings from '@/components/promotions/Offerings';
import PromotionLandingHero from '@/components/promotions/PromotionLandingHero';
import Link from 'next/link';

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
		const options = {
			timeZone: 'America/Chicago',
			month: 'long',
			day: 'numeric',
		};
		endDateFormatted = new Intl.DateTimeFormat('en-US', options).format(
			endDate
		);
	}

	// Format title and description
	const formattedTitle = `Sweet Juanjos - ${promotion.title || 'Delicious Treats'}`;
	const formattedDescription = `${promotion.subtitle || 'Discover our special treats for every occasion!'} - Order by ${endDateFormatted}!`;

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
		notFound();
	}

	// Check if promotion has ended (using Central Time)
	const now = new Date();
	const endDate = promotion.timeline?.endDate ? new Date(promotion.timeline.endDate) : null;
	const hasEnded = endDate && now > endDate;

	// If promotion has ended, show ended message
	if (hasEnded) {
		const endDateFormatted = new Date(promotion.timeline.endDate).toLocaleString('en-US', {
			timeZone: 'America/Chicago',
			month: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		});

		return (
			<main className='min-h-scree grid place-items-center px-4 py-12 bg-gradient-to-b from-light to-secondary/20'>
				<div className='text-center max-w-2xl space-y-6'>
					<h1 className='text-4xl md:text-5xl font-bold text-dark'>
						{promotion.title}
					</h1>
					<div className=' p-4 '>
						<p className='text-2xl font-bold text-primary mb-4'>
							This Promotion Has Ended
						</p>
						<p className='text-lg text-dark'>
							Orders closed on <span className='font-bold'>{endDateFormatted}</span> Central Time
						</p>
					</div>
					<Link
						href='/'
						className='inline-block bg-primary text-light px-8 py-4 rounded font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl'
					>
						Return to Homepage
					</Link>
				</div>
			</main>
		);
	}

	// Normal promotion display if not ended
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
					pickupDateTimeSlots={
						promotion.pickup?.enabled && promotion.pickup?.dateTimeSlots
							? promotion.pickup.dateTimeSlots
							: []
					}
					deliveryDateTimeSlots={
						promotion.delivery?.enabled && promotion.delivery?.dateTimeSlots
							? promotion.delivery.dateTimeSlots
							: []
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
						deliveryDateTimeSlots={
							promotion.delivery?.enabled && promotion.delivery?.dateTimeSlots
								? promotion.delivery.dateTimeSlots
								: []
						}
						pickupDateTimeSlots={
							promotion.pickup?.enabled && promotion.pickup?.dateTimeSlots
								? promotion.pickup.dateTimeSlots
								: []
						}
						giftOption={promotion.giftOption || false}
						autoResponseEmailData={promotion.autoResponseEmail || null}
						promotionSlug={slug}
						enablePayNow={promotion.paymentOptions?.enablePayNow ?? false}
						enablePayLater={promotion.paymentOptions?.enablePayLater ?? false}
					/>
				)}
			</CartProvider>
		</main>
	);
};

export default Promotions;

// Revalidate the page every 10 seconds
export const revalidate = 10;