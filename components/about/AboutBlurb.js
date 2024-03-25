import { aboutUsBlurb } from '@/data/about';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MainHeading, SubHeading } from '../utils/Typography';
import Socials from '../utils/Socials';

const AboutBlurb = () => {
	return (
		<div className='max-w-5xl mx-auto grid gap-12 '>
			<div className='grid place-items-center gap-2 '>
				<MainHeading title={aboutUsBlurb.title} type='dark' />
				<SubHeading title={aboutUsBlurb.subtitle} type='dark' />
			</div>
			<div className=' mx-auto grid lg:grid-cols-3 gap-y-16 lg:gap-x-16  borde'>
				<Image
					src={aboutUsBlurb.image}
					alt={aboutUsBlurb.subtitle}
					className='w-3/5 lg:w-full mx-auto shadow-lg shadow-primary/40'
				/>
				<motion.div
					className='lg:col-span-2 place-self-center text-center lg:text-justify'
					initial={{ y: 200 }}
					whileInView={{ y: 0 }}
					transition={{ duration: 1.1, delay: 0.1 }}
				>
					<SubHeading title={aboutUsBlurb.intro} type='dark' />
					<div className='grid gap-2 mt-4 px-2 lg:px-1'>
						{aboutUsBlurb.description.map((content, index) => (
							<p
								key={index}
								className='leading-7 lg:leading-8 text-lg lg:text-xl'
							>
								{content}
							</p>
						))}
					</div>
					<div className='grid place-items-center mt-16 lg:mt-4 '>
						<Socials includeText={true} />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default AboutBlurb;
