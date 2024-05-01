import Services from '@/components/services/Services';

import specialEventsImage from '../public/images/displays/special-events.jpg';
import specialEventsImage2 from '../public/images/ai-generated/recreate.webp';
import HeroLayout from '@/components/heros/HeroLayout';
import AboutBlurb from '@/components/about/AboutBlurb';
import Reviews from '@/components/reviews/Reviews';
import IntroBlurb from '@/components/about/IntroBlurb';
import ServiceCards from '@/components/services/ServiceCards';
import LandingHero from '@/components/heros/LandingHero';

export default function Home() {
	return (
		<main className='grid gap-32'>
			<div className='grid gap-16 lg:gap-24'>
				<LandingHero />
				<IntroBlurb />
			</div>
			<ServiceCards />
			<HeroLayout
				heading='Weddings & Special Events'
				subheading='From Weddings to Birthdays. We can help you celebrate any special occasion'
				img={specialEventsImage}
				CTA='/services/weddings-and-special-events'
				CTAText='Learn More'
			/>
			<AboutBlurb />
			
			<Reviews />
		</main>
	);
}
