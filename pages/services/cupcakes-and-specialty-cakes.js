import HeroLayout from '@/components/heros/HeroLayout';
import { cupcakeAndSpecialtyCakesData as data } from '@/data/services/cupcakes-and-specialty-cakes';

const CupcakesAndSpecialtyCakes = () => {
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

export default CupcakesAndSpecialtyCakes;
