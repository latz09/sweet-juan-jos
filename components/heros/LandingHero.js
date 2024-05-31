import Image from 'next/image';
import logo from '../../public/images/logo/transparent-juanjos.png';
import ButtonLink from '../utils/ButtonLink';
import Socials from '../utils/Socials';
import LandingHeroAnimate from '../utils/animations/LandingHeroAnimate';

const LandingHero = ({ landingImage }) => {
	return (
		<div className='relative h-[75vh] lg:h-[80vh] w-full  shadow-lg shadow-primary/40 '>
			<Image
				src={landingImage}
				alt='sweet juanjos'
				className='z-0'
				quality={100}
				priority={true}
				fill
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center ',
				}}
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-light/10 via-light/40 to-light/0 z-10 text-center grid place-items-center '>
				<LandingHeroAnimate className='flex flex-col gap-4 '>
					<div className='p-8 grid gap-6 place-items-center font '>
						<Socials includeText={false} color='light' />
						<Image src={logo} alt='sweet juanjos' width={350} height={350} />
					</div>
					<ButtonLink
						title='Request an Order'
						type='secondary'
						href='/contact-katie-jo'
					/>
				</LandingHeroAnimate>
			</div>
			<div> </div>
		</div>
	);
};

export default LandingHero;
