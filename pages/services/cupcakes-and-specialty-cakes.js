import HeroLayout from '@/components/heros/HeroLayout';
import { cupcakeAndSpecialtyCakesData as data } from '@/data/services/cupcakes-and-specialty-cakes';
import CupcakesAndSpecialtyCakesMenu from '@/components/menus/CupcakesAndSpecialtyCakesMenu';
import ButtonLink from '@/components/utils/ButtonLink';
import PdfDownload from '@/components/utils/PdfDownload';

const CupcakesAndSpecialtyCakes = () => {
	return (
		<div className='grid gap-16 lg:gap-24'>
			<HeroLayout
				heading={data.heading}
				subheading={data.subheading}
				img={data.img}
				CTA={data.CTA}
				CTAText={data.CTAText}
			/>
			<CupcakesAndSpecialtyCakesMenu data={data.menuData} />
			<div className="grid gap-12 place-items-center">
				<PdfDownload title='View Latest Pricing' document='pricing' />

				<ButtonLink
					title='Request Order Now'
					type='secondary'
					href='/sweet-juanjos/contact-us'
				/>
			</div>
		</div>
	);
};

export default CupcakesAndSpecialtyCakes;
