import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_COOKIES_PAGE_QUERY } from '@/data/queries/FETCH_COOKIES_PAGE_QUERY';

import HeroLayout from '@/components/heros/HeroLayout';
import { handcraftedCookiesData as data } from '@/data/services/handcrafted-cookies';
import ImageBanner from '@/components/utils/ImageBanner';
import CookieMenu from '@/components/menus/CookieMenu';
import ButtonLink from '@/components/utils/ButtonLink';
import PageEntry from '@/components/utils/animations/PageEntry';


export const metadata = {
	title: 'Cookies!',
	
};


const HandCraftedCookies = async () => {
	const query = FETCH_COOKIES_PAGE_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];

	return (
		<PageEntry className='grid gap-16 lg:gap-24 '>
			<HeroLayout
				heading={data.landingHeading}
				subheading={data.landingSlogan}
				imageUrl={data.landingImage}
				href='/services/handcrafted-cookies'
				CTAText={'Order Request'}
			/>
			<CookieMenu
				cookieOptions={data.cookieOptions}
				specialtyFlavors={data.specialtyCookieFlavors}
			/>
			<ImageBanner images={data.bannerImages} />
			<div className='pt-2'>
				<ButtonLink title={`Order Now`} type='primary' href={'/contact-us'} />
			</div>
		</PageEntry>
	);
};

export default HandCraftedCookies;

export const revalidate = 10;
