import Image from 'next/image';
// import landingImage from '../../public/images/displays/special-events.jpg';
import landingImage2 from '../../public/images/ai-generated/display.png';

import { motion } from 'framer-motion';
import logo from '../../public/images/logo/transparent-juanjos.png';
import ButtonLink from '../utils/ButtonLink';
import { MainHeading, Paragraph, SubHeading } from '../utils/Typography';

const LandingHero = () => {
	return (
		<div className='relative h-[65vh] lg:h-[70vh] w-full  shadow-lg shadow-primary/40 '>
			<Image
				src={landingImage2}
				alt='sweet juanjos'
				layout='fill'
				objectFit='cover'
				objectPosition='center'
				className='z-0'
				quality={100}
				priority={true}
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-light/90 via-light/70 to-light/0  z-10 text-center grid place-items-center '>
				<motion.div
					className='flex flex-col'
					initial={{ opacity: 0, scale: 0.85 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.1, delay: 0.15 }}
				>
					<div className='p-8  bg-gradie5nt-to-tl from-light via-light/80 to-light rounded-sm shadowlg shadow-primary/40 grid gap-4 place-items-center font'>
						<Image src={logo} alt='sweet juanjos' width={250} height={250} />

						<h1 className='text-4xl lg:text-6xl font-bold text-center'>
							Delicious Treats for Any Occasion
						</h1>
					</div>
					<div className=' '>
						<ButtonLink
							title='Order Now'
							type='secondary'
							href='/sweet-juanjos/contact-us'
						/>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default LandingHero;
