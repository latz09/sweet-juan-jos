import Image from 'next/image';
import { MainHeading, SubHeading } from '../utils/Typography';
import ButtonLink from '../utils/ButtonLink';

const HeroLayout = ({ imageUrl, heading, subheading, CTAText }) => {
	return (
		<div className='grid gap-12'>
			<div className='relative h-[40vh] lg:h-[70vh] w-full  text-dark shadow-lg shadow-primary/40'>
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
						
					>
						<div className='max-w-3xl mx-auto grid gap-2 lg:gap-4 place-items-center  '>
							<MainHeading title={heading} type='light' />
							<SubHeading type='light' title={subheading} />
							<div className='hidden lg:block lg:pt-6'>
								<ButtonLink title={CTAText} type='primary' href='/contact-katie-jo' />
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className='lg:hidden'>
				<ButtonLink title={CTAText} type='primary' href={href} />
			</div> */}
		</div>
	);
};

export default HeroLayout;
