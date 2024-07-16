import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_PAGE_QUERY } from '@/data/queries/FETCH_HOME_PAGE_QUERY';
import HeroLayout from '@/components/heros/HeroLayout';
import AboutBlurb from '@/components/about/AboutBlurb';
import Reviews from '@/components/reviews/Reviews';
import IntroBlurb from '@/components/about/IntroBlurb';
import ServiceCards from '@/components/services/ServiceCards';
import LandingHero from '@/components/heros/LandingHero';
import BannerLayout from '@/components/heros/BannerLayout';
import PageEntry from '@/components/utils/animations/PageEntry';
 
export default async function Home() {
	const query = FETCH_PAGE_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];
	

	return (
		<PageEntry className='grid gap-24'>
			<LandingHero landingImage={data.landingImage} />
			<IntroBlurb data={data.intro} />
			<ServiceCards data={data.servicePhotoLinks} />
			<BannerLayout
				imageUrl={data.specialEventShoutOut.eventImageUrl}
				heading={data.specialEventShoutOut.heading}
				subheading={data.specialEventShoutOut.subheading}
				href={`/services/weddings-and-special-events`}
				CTAText='Learn More'
			/>
			<AboutBlurb data={data.about} ourStoryData={data.sweetJuanjosStory} />

			<Reviews data={data.reviews}  />
		</PageEntry>
	);
}

export const revalidate = 10;
