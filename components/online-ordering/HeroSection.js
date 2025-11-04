'use client';

import Image from 'next/image';
import { MainHeading, Paragraph } from '../utils/Typography';
import logo from '@/public/images/logo/transparent-juanjos.png';
import AvailabilityInfo from './AvailabilityInfo';

const HeroSection = ({
	heroImageUrl,
	pageTitle,
	introText,
	deliveryFee,
	pickupSlots = [],
	deliverySlots = [],
}) => {
	return (
		<div className='flex flex-col lg:grid lg:grid-cols-2 items-start max-w-[85rem] mx-auto px-4 lg:px-12 py-8 lg:py-16 gap-8 lg:gap-12'>
			<div className='space-y-3 lg:space-y-4'>
				{/* 1) Title - always first */}
				{pageTitle && (
					<div className='order-1 lg:col-start-1 text-center '>
						<MainHeading title={pageTitle} type='dark' />
					</div>
				)}

			{/* 2) Intro text - second */}
			{introText?.length > 0 && (
				<div className='order-2 space-y-2 lg:col-start-1 text-center'>
					{introText.map((para, idx) => (
						<div key={idx} className="grid place-items-center gap-2">
							<Paragraph content={para} />
							<div className='w-24 h-[2px] bg-primary hidden lg:block' />
						</div>
					))}
				</div>
			)}
			</div>

			{/* 3) Image - third on mobile, right side on desktop */}
			{heroImageUrl && (
				<div className='order-3 w-full lg:col-start-2 lg:row-start-1 lg:row-span-3'>
					<div className='relative w-full h-[50vh] lg:h-[60vh]'>
						<Image
							src={heroImageUrl}
							alt={pageTitle || 'Hero image'}
							fill
							className='object-cover rounded'
							priority
						/>
						<div className='absolute inset-0 grid place-items-center bg-gradient-to-b from-light/10 via-light/50 to-light/20'>
							<div className='grid place-items-center gap-4'>
								<Image src={logo} alt='Logo Overlay' width={215} height={215} />
							</div>
						</div>
					</div>
				</div>
			)}

			{/* 4) Availability - fourth on mobile, third in left column on desktop */}
			<div className='order-4 w-full lg:col-start-1 '>
				<AvailabilityInfo
					pickupSlots={pickupSlots}
					deliverySlots={deliverySlots}
					deliveryFee={deliveryFee}
				/>
			</div>
		</div>
	);
};

export default HeroSection;
