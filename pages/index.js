import Services from '@/components/services/Services';
import LogoDisplay from '@/components/utils/LogoDisplay';
import specialEventsImage from '../public/images/displays/special-events.jpg';
import HeroLayout from '@/components/heros/HeroLayout';
import AboutBlurb from '@/components/about/AboutBlurb';
import Reviews from '@/components/reviews/Reviews';
import IntroBlurb from '@/components/about/IntroBlurb';

export default function Home() {
	return (
		<main className='grid gap-32'>
			<div className="grid gap-12 lg:gap-16">
				<LogoDisplay />
				<IntroBlurb />
			</div>
			<Services />
			<HeroLayout
				heading='Special Events'
				subheading='From birthdays to weddings - We can help you celebrate anything!'
				img={specialEventsImage}
				CTA='/'
				CTAText='Learn More'
			/>
			<AboutBlurb />
			<Reviews />
		</main>
	);
}
