import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_CUPCAKE_PAGE_QUERY } from '@/data/queries/FETCH_CUPCAKE_PAGE_QUERY';

import HeroLayout from '@/components/heros/HeroLayout';
import { cupcakeAndSpecialtyCakesData as data } from '@/data/services/cupcakes-and-specialty-cakes';
import CupcakesAndSpecialtyCakesMenu from '@/components/menus/CupcakesAndSpecialtyCakesMenu';
import ButtonLink from '@/components/utils/ButtonLink';
import PdfDownload from '@/components/utils/PdfDownload';
import ImageBanner from '@/components/utils/ImageBanner';

const CupcakesAndSpecialtyCakesPage = async () => {
	const query = FETCH_CUPCAKE_PAGE_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];
	
	return (
		<div className='grid gap-16 lg:gap-24'>
			<HeroLayout
				heading={data.landingHeading}
				subheading={data.landingSlogan}
				imageUrl={data.landingImage}
				href={`/contact-us`}
				CTAText={'Order Request'}
			/>
			<CupcakesAndSpecialtyCakesMenu
				cakeFlavors={data.cakeFlavors}
				frostingFlavors={data.frostingFlavors}
				smallCakeSizes={data.smallCakeSizes}
				cupcakePrice={data.cupcakePrice}
			/>

			<ButtonLink
				title='Order Now'
				type='primary'
				href='/sweet-juanjos/contact-us'
			/>
			<ImageBanner images={data.bannerImages} />
		</div>
	);
};

export default CupcakesAndSpecialtyCakesPage;

export const revalidate = 10;
