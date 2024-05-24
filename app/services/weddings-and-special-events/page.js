import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_SPECIAL_EVENTS_PAGE_QUERY } from '@/data/queries/FETCH_SPECIAL_EVENTS_PAGE_QUERY';
import HeroLayout from '@/components/heros/HeroLayout';

const WeddingsAndSpecialEventsPage = async () => {
	const query = FETCH_SPECIAL_EVENTS_PAGE_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];
    console.log(data)
	return (
		<div className='grid gap-16 lg:gap-24'>
			<HeroLayout
				heading={data.landingHeading}
				subheading={data.landingSlogan}
				imageUrl={data.landingImage}
				href='/services/handcrafted-cookies'
				CTAText={'Order Request'}
			/>
			{/* <ImageBanner images={data.bannerImages} /> */}
		</div>
	);
};

export default WeddingsAndSpecialEventsPage;

export const revalidate = 10;