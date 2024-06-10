import StartPlanningLink from '../utils/StartPlanningLink';
import { MainHeading, SubHeading } from '../utils/Typography';

const WeddingIntro = ({ data }) => {
	return (
		<div className='grid gap-6 lg:gap-8 max-w-5xl mx-auto'>
			
				
			

			<div className='lg:w-2/3 mx-auto grid place-items-center gap-6 text-xl lg:text-2xl font-bold text-center leading-9 lg:leading-10 px-2 '>
				<p>{data.openingParagraph} </p>
				<StartPlanningLink />
			</div>
		</div>
	);
};

export default WeddingIntro;
