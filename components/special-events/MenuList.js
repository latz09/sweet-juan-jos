import StartPlanningLink from '../utils/StartPlanningLink';
import { MainHeading } from '../utils/Typography';
import MenuItem from './MenuItem';

const MenuList = ({ data }) => {

	return (
		<div className="max-w-5xl mx-auto grid gap-8 place-items-center">
			<MainHeading title={`Menus`} />
			<ul className="grid gap-8 lg:flex lg:gap-4">
				{data.map((item, index) => (
					<MenuItem
						key={index}
						title={item.title}
						image={item.imageUrl}
						link={item.link}
					/>
				))}
			</ul>
			<div className="mt-8 ">
				<StartPlanningLink />
			</div>
		</div>
	);
};

export default MenuList;
