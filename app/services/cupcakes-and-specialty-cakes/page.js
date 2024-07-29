import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_CUPCAKE_PAGE_QUERY } from '@/data/queries/FETCH_CUPCAKE_PAGE_QUERY';

import HeroLayout from '@/components/heros/HeroLayout';

import CupcakesAndSpecialtyCakesMenu from '@/components/menus/CupcakesAndSpecialtyCakesMenu';
import ButtonLink from '@/components/utils/ButtonLink';

import ImageBanner from '@/components/utils/ImageBanner';
import PageEntry from '@/components/utils/animations/PageEntry';

export const metadata = {
	title: 'Cupcakes and Specialty Cakes',
};

const CupcakesAndSpecialtyCakesPage = async () => {
	const query = FETCH_CUPCAKE_PAGE_QUERY;
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
			<CupcakesAndSpecialtyCakesMenu
				cakeFlavors={data.cakeFlavors}
				frostingFlavors={data.frostingFlavors}
				smallCakeSizes={data.smallCakeSizes}
				cupcakePrice={data.cupcakePrice}
			/>

			<ImageBanner images={data.bannerImages} />
			<div className='mt-2'>
				<ButtonLink
					title='Order Now'
					type='primary'
					href='/sweet-juanjos/contact-us'
				/>
			</div>
		</PageEntry>
	);
};

export default CupcakesAndSpecialtyCakesPage;

export const revalidate = 10;
