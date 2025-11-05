import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_PROMOTION_STAGING_QUERY } from '@/data/queries/FETCH_PROMOTION_QUERY';
import { notFound } from 'next/navigation';
import { CartProvider } from '@/components/promotions/checkout-process/steps/cart/CartContext';
import Offerings from '@/components/promotions/Offerings';
import PromotionLandingHero from '@/components/promotions/PromotionLandingHero';

export async function generateMetadata({ params }) {
    const { slug } = params;

    // Fetch promotion data from Sanity
    const promotion = await sanityClient.fetch(FETCH_PROMOTION_STAGING_QUERY, { slug });

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
    const formattedTitle = `STAGING - ${promotion.title || 'Delicious Treats'}`;
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

const StagingPromotions = async ({ params }) => {
    const { slug } = params;

    // Fetch promotion data from Sanity
    const promotion = await sanityClient.fetch(FETCH_PROMOTION_STAGING_QUERY, { slug });

    // Handle not found promotions
    if (!promotion) {
        notFound(); // This will trigger Next.js's built-in 404 page
    }

    return (
        <main className='relative'>
            {/* Staging Environment Indicator */}
            <div className='sticky top-0 z-50 bg-primary'>
                <div className='max-w-7xl mx-auto px-4 py-2 flex items-center justify-between '>
                    <div className='flex items-center gap-3'>
                        <span className='inline-flex items-center gap-2 text-sm font-semibold text-light'>
                            <svg 
                                className='w-5 h-5' 
                                fill='none' 
                                stroke='currentColor' 
                                viewBox='0 0 24 24'
                            >
                                <path 
                                    strokeLinecap='round' 
                                    strokeLinejoin='round' 
                                    strokeWidth={2} 
                                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' 
                                />
                            </svg>
                            STAGING ENVIRONMENT
                        </span>
                      
                    </div>
                    <span className='text-xs text-light font-mono'>
                        {slug}
                    </span>
                </div>
            </div>

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
                    />
                )}
            </CartProvider>
        </main>
    );
};

export default StagingPromotions;

// Revalidate the page every 10 seconds
export const revalidate = 10;