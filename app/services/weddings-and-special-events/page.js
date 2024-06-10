import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_SPECIAL_EVENTS_PAGE_QUERY } from '@/data/queries/FETCH_SPECIAL_EVENTS_PAGE_QUERY';
import HeroLayout from '@/components/heros/HeroLayout';
import PageEntry from '@/components/utils/animations/PageEntry';
import WeddingIntro from '@/components/weddings-and-special-events/WeddingIntro';
import ImageBanner from '@/components/utils/ImageBanner';
import MenuList from '@/components/special-events/MenuList';
import AvailableDisplayItemsBlurb from '@/components/special-events/AvailableDisplayItemsBlurb';
import WeddingNavigationLinks from '@/components/special-events/WeddingNavigationLinks';
import StartPlanningLink from '@/components/utils/StartPlanningLink';

export const metadata = {
	title: 'Weddings & Special Events',
};

const WeddingsAndSpecialEventsPage = async () => {
	const query = FETCH_SPECIAL_EVENTS_PAGE_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];

	return (
		<PageEntry className='grid gap-20 lg:gap-24 '>
			<div className="grid gap-8 lg:gap-20">
				<HeroLayout
					heading={data.landingHeading}
					subheading={data.landingSlogan}
					imageUrl={data.landingImage}
					CTAText={'Order Request'}
				/>
				<WeddingIntro data={data.introductionSection} />
			</div>
			<ImageBanner images={data.bannerImages1} />
			<MenuList data={data.weddingMenuLinks} />
			<AvailableDisplayItemsBlurb data={data.displayItemsLink} />
			<WeddingNavigationLinks />
			<ImageBanner images={data.bannerImages2} />
			<div className='grid place-items-center'>
				<StartPlanningLink />
			</div>
		</PageEntry>
	);
};

export default WeddingsAndSpecialEventsPage;

export const revalidate = 10;
