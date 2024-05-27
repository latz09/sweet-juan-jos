import Image from 'next/image';
import { SubHeading } from '../utils/Typography';

const WeddingIntro = ({ data }) => {
	
	return (
		<div className='grid  lg:grid-cols-3 max-w-5xl mx-auto'>
			<div className='lg:col-span-2 grid place-items-center px-4 lg:mx-0 lg:w-3/4 mx-auto '>
				<div className='grid gap-4 lg:gap-8'>
					<SubHeading title={data.heading} type='dark' />
					<div className="grid place-items-center gap-4 text-xl lg:text-2xl font-bold text-center leading-9 lg:leading-10 ">
						<p>{data.openingParagraph1}</p>
						<p>{data.openingParagraph2}</p>
					</div>
				</div>
			</div>
			<div className="w-1/2 md:w-1/3 mx-auto mt-12 lg:mt-0 lg:w-full">
				<Image
					src={data.introImageUrl}
					alt={'data.heading'}
					height={400}
					width={600}
                    className="shadow-lg shadow-primary/30 rounded-lg"
				/>
			</div>
		</div>
	);
};

export default WeddingIntro;
