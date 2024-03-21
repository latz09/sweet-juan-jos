import Services from '@/components/services/Services';
import LogoDisplay from '@/components/utils/LogoDisplay';
import specialEventsImage from '../public/images/displays/special-events.jpg';
import HeroLayout from '@/components/heros/HeroLayout';
import AboutBlurb from '@/components/about/AboutBlurb';
import Reviews from '@/components/reviews/Reviews';
import IntroBlurb from '@/components/about/IntroBlurb';
import ServiceCard from '@/components/services/ServiceCard';

export default function Home() {
	return (
		<main className='grid gap-32'>
			<div className="grid gap-12 lg:gap-16">
				<LogoDisplay />
				<IntroBlurb />
			</div>
			<Services />
			<HeroLayout
				heading='Weddings & Special Events'
				subheading='From Weddings to Birthdays - We can help you celebrate any special occasion'
				img={specialEventsImage}
				CTA='/'
				CTAText='Learn More'
			/>
			<AboutBlurb />
			<ServiceCard />
			<Reviews />
		</main>
	);
}
