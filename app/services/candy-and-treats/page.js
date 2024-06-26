import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_CANDY_AND_TREATS_PAGE_QUERY } from '@/data/queries/FETCH_CANDY_AND_TREATS_PAGE_QUERY';
import HeroLayout from '@/components/heros/HeroLayout';
import CandyAndTreatsMenu from '@/components/menus/CandyAndTreatsMenu';
import ImageBanner from '@/components/utils/ImageBanner';
import ButtonLink from '@/components/utils/ButtonLink';
import PageEntry from '@/components/utils/animations/PageEntry';

export const metadata = {
	title: 'Candy & Treats',
};

const CandyAndTreatsPage = async () => {
	const query = FETCH_CANDY_AND_TREATS_PAGE_QUERY;
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
			<CandyAndTreatsMenu data={data.candyOptions} />
			<ImageBanner images={data.bannerImages} />
			<div className='pt-2'>
				<ButtonLink title={`Order Now`} type='primary' href={'/contact-us'} />
			</div>
		</PageEntry>
	);
};

export default CandyAndTreatsPage;

export const revalidate = 10;
