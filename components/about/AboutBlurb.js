

import Image from 'next/image';
import { MainHeading, SubHeading } from '../utils/Typography';
import Socials from '../utils/Socials';
import Ourstory from './OurStory';

const AboutBlurb = ({ data, ourStoryData }) => {
	
	return (
		<div className='max-w-5xl mx-auto grid gap-12 '>
			<div className='grid place-items-center gap-2 '>
				<MainHeading title='Meet Jo' type='dark' />
				<SubHeading title={`"The 'Jo' in Juanjo's"`} type='dark' />
			</div>
			<div className=' mx-auto grid lg:grid-cols-3 gap-y-16 lg:gap-x-16  borde'>
				<Image
					src={data.aboutImage}
					alt={data.heading}
					height={400}
					width={600}
					className='w-3/5 lg:w-full mx-auto shadow-lg shadow-primary/40 rounded-lg'
				/>
				<div
					className='lg:col-span-2 place-self-center text-center lg:text-justify'
					initial={{ y: 200 }}
					whileInView={{ y: 0 }}
					transition={{ duration: 1.1, delay: 0.1 }}
				>
					<SubHeading title={data.heading} type='dark' />

					<div className='grid gap-2 mt-4 px-4 lg:px-1  text-xl lg:text-2xl'>
						<p className='leading-8'>{data.paragraph1}</p>
						<p className='leading-8'>{data.paragraph2}</p>
					</div>
					<Ourstory data={ourStoryData}/>
					
				</div>
				
			</div>
			
			<div className='grid place-items-center mt-16 lg:mt-8 '>
						<Socials includeText={true} />
					</div>
		</div>
	);
};

export default AboutBlurb;
