import StartPlanningLink from '../utils/StartPlanningLink';

const WeddingIntro = ({ data }) => {
	return (
		<div className='grid  max-w-5xl mx-auto'>
			<div className='w-4/5 lg:w-2/3 mx-auto grid place-items-center gap-6 text-xl lg:text-2xl font-bold text-center leading-9 lg:leading-10 px-2 '>
				<p>{data.openingParagraph} </p>
				<StartPlanningLink />
			</div>
		</div>
	);
};

export default WeddingIntro;
