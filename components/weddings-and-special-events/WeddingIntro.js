import { MainHeading, SubHeading } from '../utils/Typography';

const WeddingIntro = ({ data }) => {
	return (
		<div className='grid gap-8 max-w-5xl mx-auto'>
			<div className='grid gap-8'>
				<MainHeading title={data.heading} type='dark' />
			</div>

			<div className='lg:w-2/3 mx-auto grid place-items-center gap-2 text-xl lg:text-2xl font-bold text-center leading-9 lg:leading-10 px-2 '>
				<SubHeading title={data.subHeading} type='primary' />
				<p>{data.openingParagraph} </p>
			</div>
		</div>
	);
};

export default WeddingIntro;
