import { MainHeading, SubHeading } from '../utils/Typography';

const PromotionHeading = ({ title, subtitle }) => {
	return (
		<div className='space-y-4 text-center'>
			<MainHeading title={title} type='dark' />
			<SubHeading title={subtitle} type='dark' />
		</div>
	);
}; 

export default PromotionHeading;
