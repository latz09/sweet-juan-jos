import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroLayout = ({ heading, subheading, img, CTA, CTAText }) => {
	return (
		<div className='relative h-[70vh] w-full text-light shadow-lg shadow-primary/40'>
			<Image
				src={img}
				alt={heading}
				layout='fill'
				objectFit='cover'
				className='z-0'
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/90 to-dark/30  z-10 text-center'>
				<motion.div
					className='flex flex-col justify-center items-center h-full'
					initial={{ opacity: 0, scale: 0 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.1, delay: 0.1 }}
				>
					<h2 className='text-light text-5xl lg:text-6xl font-bold'>
						{heading}
					</h2>
					<p className='text-light text-2xl lg:text-3xl mt-2 font-bold px-2'>
						{subheading}
					</p>
					<div className='mt-12 '>
						<Link href={CTA}>
							<span className=' py-3 px-8 bg-dark text-light border border-light font-bold text-lg lg:text-2xl rounded-full shadow-lg shadow-primary/40 hover:bg-primary hover:text-light  transition duration-700'>
								{CTAText}
							</span>
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default HeroLayout;
