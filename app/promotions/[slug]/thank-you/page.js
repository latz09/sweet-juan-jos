import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_AUTORESPONSE_EMAIL_QUERY } from '@/data/queries/FETCH_PROMOTION_QUERY';
import { notFound } from 'next/navigation';
import AnimateUp from '@/components/utils/animations/AnimateUp';
import Link from 'next/link';

const ThankYouPage = async ({ params }) => {
	const { slug } = params;

	// Fetch only the `autoResponseEmail` data
	const promotion = await sanityClient.fetch(FETCH_AUTORESPONSE_EMAIL_QUERY, {
		slug,
	});

	if (!promotion) {
		notFound();
	}

	const { emailContent, pickupDetailsLine, deliveryDetailsLine } =
		promotion.autoResponseEmail;

	return (
		<main>
			<div className='h-[75vh]  grid place-items-center bg-gradient-to-b from-primary/5 to-dark/0 text-dark '>
				<AnimateUp>
					<div className='text-center p-4'>
						<h3 className='text-2xl lg:text-3xl font-bold text-green-600 mb-4'>
							Thank You for Your Order!
						</h3>
						<p className='max-w-3xl mx-auto font-bold tracking-wider text-xl lg:text-2xl'>
							{emailContent}
						</p>
						<p className='mb-12 mt-4 text-xl lg:text-2xl font-bold text-primary'>
							-Katie Jo
						</p>
						<p className='p-4 mt-8 max-w-3xl mx-auto tracking-wider lg:text-xl font-bold italic'>
							{`*An email has been sent to your inbox for further details. Please check your
							spam or junk folder if you don't see it in your inbox.`}
						</p>
						{/* Shop More Items Link */}
						<Link
							href={`/promotions/${slug}`}
							className='mt-12 inline-block px-6 py-3 bg-primary text-light text-lg lg:text-2xl font-bold rounded-lg shadow-md hover:bg-primary/90 transition'
						>
							Shop More Items
						</Link>
					</div>
				</AnimateUp>
			</div>
		</main>
	);
};

export default ThankYouPage;

// Revalidate the page every 10 seconds
export const revalidate = 10;
