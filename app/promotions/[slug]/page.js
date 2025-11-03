import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_PROMOTION_QUERY } from '@/data/queries/FETCH_PROMOTION_QUERY';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/components/promotions/checkout-process/steps/cart/CartContext';
import Offerings from '@/components/promotions/Offerings';

import PromotionLandingHero from '@/components/promotions/PromotionLandingHero';

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
					/>
				)}
			</CartProvider>
		</main>
	);
};

export default Promotions;

// Revalidate the page every 10 seconds
export const revalidate = 10;

export const OrderingDownNotice = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-primary/10 px-4'>
			<div className='max-w-md w-full bg-light rounded shadow-xl p-8 text-center'>
				<div className='mb-6'>
					<div className='w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
						<svg
							className='w-10 h-10 text-orange-600'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</div>
					<h1 className='text-3xl font-bold text-gray-900 mb-2'>
						Ordering Temporarily Down
					</h1>
					<p className='text-gray-600 text-lg'>
						We are making some quick updates to our payment system.
					</p>
				</div>

				<div className='bg-orange-50 rounded-lg p-4 mb-6'>
					<p className='text-gray-700 font-medium'>
						Online ordering will be back soon!
					</p>
				</div>

				<div className='space-y-3 text-sm text-gray-600'>
					<p>Need to place an order right away?</p>
					<a
						href='tel:7155721681'
						className='block w-full bg-primary hover:bg-orange-700 text-light font-semibold py-3 px-6 rounded-lg transition-colors'
					>
						Call Us: (715) 572-1681
					</a>
					<p className=' text-gray-500'>We apologize for any inconvenience</p>
				</div>
			</div>
		</div>
	);
};
