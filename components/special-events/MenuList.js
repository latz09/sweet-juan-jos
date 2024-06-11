import StartPlanningLink from '../utils/StartPlanningLink';
import { MainHeading } from '../utils/Typography';
import AnimateUp from '../utils/animations/AnimateUp';
import MenuItem from './MenuItem';

const MenuList = ({ data }) => {
	return (
		<div className='max-w-5xl mx-auto grid gap-10 lg:gap-14 place-items-center'>
			<MainHeading title={`Menus & Pricing`} />
			<AnimateUp>
				<ul className='grid gap-8 lg:flex lg:gap-4'>
					{data.map((item, index) => (
						<MenuItem
							key={index}
							title={item.title}
							image={item.imageUrl}
							link={item.link}
						/>
					))}
				</ul>
			</AnimateUp>
			<div className='mt-8 '>
				<StartPlanningLink />
			</div>
		</div>
	);
};

export default MenuList;
