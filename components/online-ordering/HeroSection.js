'use client';

import Image from 'next/image';

import { MainHeading, Paragraph } from '../utils/Typography';
import logo from '@/public/images/logo/transparent-juanjos.png';
import AvailabilityInfo from './AvailabilityInfo';

const HeroSection = ({
	heroImageUrl,
	pageTitle,
	introText,
	allowDelivery,
	allowPickup,
	deliveryInfo,
	pickupInfo,
}) => {
	return (
		<div className='text-center '>
			{heroImageUrl && (
				<div className='relative w-full h-[65vh] lg:h-[70vh]'>
					<Image
						src={heroImageUrl}
						alt={pageTitle}
						fill
						className='object-cover rounded'
					/>
					<div className='absolute inset-0 grid place-items-center bg-gradient-to-b from-light/10 via-light/50 to-light/20'>
						<div className='grid place-items-center gap-4'>
							<Image src={logo} alt='Logo Overlay' className='max-w-xs' />
							<MainHeading title={pageTitle} type='dark' />
						</div>
					</div>
				</div>
			)}
			<AvailabilityInfo
				allowDelivery={allowDelivery}
				allowPickup={allowPickup}
				deliveryInfo={deliveryInfo}
				pickupInfo={pickupInfo}
			/>
			<div className='pt-4 lg:pt-10'>
				{introText?.length > 0 && (
					<div className='mt-4 max-w-5xl mx-auto space-y-2'>
						{introText.map((para, idx) => (
							<Paragraph key={idx} content={para} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HeroSection;
