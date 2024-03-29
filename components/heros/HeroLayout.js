import Image from 'next/image';
import { motion } from 'framer-motion';
import { MainHeading, SubHeading } from '../utils/Typography';
import ButtonLink from '../utils/ButtonLink';

const HeroLayout = ({ heading, subheading, img, CTA, CTAText }) => {
	return (
		<div className='relative h-[60vh] w-full text-light shadow-lg shadow-primary/40'>
			<Image
				src={img}
				alt={heading}
				layout='fill'
				objectFit='cover'
				className='z-0'
				priority={true}
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/70 to-dark/20  z-10 text-center'>
				<motion.div
					className='flex flex-col justify-center items-center h-full gap-2 '
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.1, delay: 0.2 }}
				>
					<MainHeading title={heading} type='light' />
					<SubHeading type='light' title={subheading} />
					<div className='mt-10 '>
						<ButtonLink title={CTAText} type='primary' href={CTA} />
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default HeroLayout;
