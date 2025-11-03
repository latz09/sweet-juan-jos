import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ONLINE_ORDERING_AVAILABILITY as query } from '@/data/queries/online-ordering/FETCH_ONLINE_ORDERING_AVAILABILITY';
import Image from 'next/image';
import logo from '../../public/images/logo/transparent-juanjos.png';
import ButtonLink, { OnlineOrderingLandingButton } from '../utils/ButtonLink';
import Socials from '../utils/Socials';
import LandingHeroAnimate from '../utils/animations/LandingHeroAnimate';

const LandingHero = async ({ landingImage }) => {

	
	const onlineOrderingAvailable = await sanityClient.fetch(query);
	const acceptingOnlineOrders = onlineOrderingAvailable[0]?.acceptingOrders;
	// const acceptingOnlineOrders = false;

	return (
		<div className='relative h-[85vh] lg:h-[80vh] w-full  shadow-lg shadow-primary/40 '>
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
			<div className='absolute inset-0 bg-gradient-to-b from-light/10 via-light/50 to-light/20 z-10 text-center grid place-items-center'>
				<LandingHeroAnimate className='flex flex-col gap-4 '>
					<div className='p-8 grid gap-6 place-items-center font '>
						<Image src={logo} alt='sweet juanjos' width={300} height={300} />
						<Socials includeText={false} color='light' />
					</div>
					<div
						className={`grid gap-4 ${
							acceptingOnlineOrders ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
						}`}
					>
						<ButtonLink
							title='Request an Order'
							type='secondary'
							href='/contact-katie-jo'
						/>

						{/* {acceptingOnlineOrders && <OnlineOrderingLandingButton />} */}
					</div>
				</LandingHeroAnimate>
			</div>
		</div>
	);
};

export default LandingHero;
