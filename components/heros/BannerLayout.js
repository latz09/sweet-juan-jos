'use client';
import Image from 'next/image';
import ButtonLink from '../utils/ButtonLink';
import { MainHeading, SubHeading } from '../utils/Typography';

const BannerLayout = ({ imageUrl, heading, subheading, href, CTAText }) => {
	return (
		<div className='relative h-[40vh] lg:h-[80vh] w-full  text-dark shadow-lg shadow-primary/40'>
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
				<div
					className='gird place-items-center  max-w-5xl mx-auto text-center '
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.1, delay: 0.2 }}
				>
					<div className='max-w-3xl mx-auto grid gap-1 lg:gap-3 place-items-center  '>
						<MainHeading title={heading} type='light' />
						<SubHeading type='light' title={subheading} />
						<div className='pt-3'>
							<ButtonLink title={CTAText} type='secondary' href={href} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BannerLayout;
