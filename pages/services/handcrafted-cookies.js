import HeroLayout from '@/components/heros/HeroLayout';
import { handcraftedCookiesData as data } from '@/data/services/handcrafted-cookies';


const HandCraftedCookies = () => {
	return (
		<>
		<HeroLayout
			heading={data.heading}
			subheading={data.subheading}
			img={data.img}
			CTA={data.CTA}
			CTAText={data.CTAText}
		/>
	</>
	);
};

export default HandCraftedCookies;
  