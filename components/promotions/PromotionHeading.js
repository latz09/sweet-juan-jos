import { MainHeading, SubHeading } from '../utils/Typography';

const PromotionHeading = ({ title, subtitle }) => {
	return (
		<div className='space-y-4'>
			<MainHeading title={title} type='light' />
			<SubHeading title={subtitle} type='light' />
		</div>
	);
};

export default PromotionHeading;
