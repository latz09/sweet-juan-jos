import Image from 'next/image';
import landingImage from '../../public/images/displays/special-events.jpg';
import Link from 'next/link';
import { motion } from 'framer-motion';
import logo from '../../public/images/logo/transparent-juanjos.png';
import Socials from '../utils/Socials';
import ButtonLink from '../utils/ButtonLink';

const LandingHero = () => {
	return (
		<div className='relative h-[73vh] w-full  shadow-lg shadow-primary/40 '>
			<Image
				src={landingImage}
				alt='sweet juanjos'
				layout='fill'
				objectFit='cover'
				objectPosition='center'
				className='z-0'
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-dark/0 via-dark/20 to-dark/0  z-10 text-center'>
				<motion.div
					className='flex flex-col justify-center items-center h-full'
					initial={{ opacity: 0, scale: .85 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.1, delay: 0.15 }}
				>
				
					<div className='p-8  bg-gradient-to-tl from-light via-light/80 to-light rounded-sm shadow-lg shadow-primary/40'>
						<Image src={logo} alt='sweet juanjos' width={250} height={250} />
					</div>
					<div className='mt-16 '>
						<ButtonLink title='Order Now' type='primary' href='/sweet-juanjos/contact-us'  />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default LandingHero;
