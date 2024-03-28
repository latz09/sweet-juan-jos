import HeroLayout from '@/components/heros/HeroLayout';
import { cupcakeAndSpecialtyCakesData as data } from '@/data/services/cupcakes-and-specialty-cakes';
import CupcakesAndSpecialtyCakesMenu from '@/components/menus/CupcakesAndSpecialtyCakesMenu';

const CupcakesAndSpecialtyCakes = () => {
	return (
		<div className="grid gap-16 lg:gap-24">
			<HeroLayout
				heading={data.heading}
				subheading={data.subheading}
				img={data.img}
				CTA={data.CTA}
				CTAText={data.CTAText}
			/>
			<CupcakesAndSpecialtyCakesMenu data={data.menuData} />
		</div>
	);
};

export default CupcakesAndSpecialtyCakes;
