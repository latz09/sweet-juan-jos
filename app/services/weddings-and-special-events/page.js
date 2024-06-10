import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_SPECIAL_EVENTS_PAGE_QUERY } from '@/data/queries/FETCH_SPECIAL_EVENTS_PAGE_QUERY';
import HeroLayout from '@/components/heros/HeroLayout';
import PageEntry from '@/components/utils/animations/PageEntry';
import WeddingIntro from '@/components/weddings-and-special-events/WeddingIntro';
import ImageBanner from '@/components/utils/ImageBanner';

export const metadata = {
	title: 'Weddings & Special Events',
};

const WeddingsAndSpecialEventsPage = async () => {
	const query = FETCH_SPECIAL_EVENTS_PAGE_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];
	

	return (
		<PageEntry className='grid gap-16 lg:gap-24 '>
			<HeroLayout
				heading={data.landingHeading}
				subheading={data.landingSlogan}
				imageUrl={data.landingImage}
				CTAText={'Order Request'}
			/>
			<WeddingIntro data={data.introductionSection} />
			<ImageBanner images={data.bannerImages1} />
		</PageEntry>
	);
};

export default WeddingsAndSpecialEventsPage;

export const revalidate = 10;
