'use client';
import Image from 'next/image';
import ButtonLink from '../utils/ButtonLink';
import { MainHeading, SubHeading } from '../utils/Typography';
import Link from 'next/link';
import { motion } from 'framer-motion';

const BannerLayout = ({ imageUrl, heading, subheading, href, CTAText }) => {
	return (
		<div className='relative h-[35vh] lg:h-[70vh] w-full  text-dark shadow-lg shadow-primary/40'>
			<Image
				src={imageUrl}
				alt={heading}
				className='grid place-items-center  '
				priority={true}
				fill
				// placeholder='blur'
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
			/>
			<div className='grid place-items-center lg:place-items-center  absolute inset-0   bg-gradient-to-b from-dark/0 via-dark/50 to-dark/0 '>
				<motion.div
					className='gird place-items-center  max-w-5xl mx-auto text-center '
					initial={{ opacity: 0, scale: 0.95 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.1, delay: 0.2 }}
				>
					<div className='max-w-3xl mx-auto grid gap-1 lg:gap-3 place-items-center  '>
						<MainHeading title={heading} type='light' />
						<SubHeading type='light' title={subheading} />
						
						<Link href={href} >
							<div className="border border-light/60 rounded-sm  px-8 py-4 mt-4 font-bold text-lg lg:text-2xl bg-light/90 text-dark">
								<button className=' '>{CTAText}</button>
							</div>
						</Link>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default BannerLayout;
