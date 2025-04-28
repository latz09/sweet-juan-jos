'use client';

import Image from 'next/image';

import { MainHeading, Paragraph } from '../utils/Typography';
import logo from '@/public/images/logo/transparent-juanjos.png';

const HeroSection = ({ heroImageUrl, pageTitle, introText }) => {
	return (
		<div className="text-center space-y-2">
			<MainHeading title={pageTitle} type="primary" />
			{heroImageUrl && (
				<div className="relative w-full h-[40vh] md:h-[50vh]">
					<Image
						src={heroImageUrl}
						alt={pageTitle}
						fill
						className="object-cover rounded"
					/>
					<div className="absolute inset-0 flex items-center justify-center">
						<Image
							src={logo}
							alt="Logo Overlay"
							className="opacity-60 w-1/2 max-w-xs" 
						/>
					</div>
				</div>
			)}
			<div className="pt-4 lg:pt-10">
				
				{introText?.length > 0 && (
					<div className="mt-4 max-w-5xl mx-auto space-y-2">
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
