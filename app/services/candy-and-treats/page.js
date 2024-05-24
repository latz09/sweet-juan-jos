import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_CANDY_AND_TREATS_PAGE_QUERY } from '@/data/queries/FETCH_CANDY_AND_TREATS_PAGE_QUERY';
import HeroLayout from '@/components/heros/HeroLayout';
import CandyAndTreatsMenu from '@/components/menus/CandyAndTreatsMenu';
import ImageBanner from '@/components/utils/ImageBanner';
import ButtonLink from '@/components/utils/ButtonLink';

const CandyAndTreatsPage = async () => {
	const query = FETCH_CANDY_AND_TREATS_PAGE_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];

	return (
		<div className='grid gap-16 lg:gap-24 '>
			<HeroLayout
				heading={data.landingHeading}
				subheading={data.landingSlogan}
				imageUrl={data.landingImage}
				href='/services/handcrafted-cookies'
				CTAText={'Order Request'}
			/>
			<CandyAndTreatsMenu data={data.candyOptions} />
			<ImageBanner images={data.bannerImages} />
			<div className='pt-2'>
				<ButtonLink title={`Order Now`} type='primary' href={'/contact-us'} />
			</div>
		</div>
	);
};

export default CandyAndTreatsPage;

export const revalidate = 10;
