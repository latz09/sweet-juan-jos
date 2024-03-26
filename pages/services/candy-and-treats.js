import HeroLayout from '@/components/heros/HeroLayout';
import { candyAndTreatsData as data } from '@/data/services/candy-and-treats';

const CandyAndTreats = () => {
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

export default CandyAndTreats;
