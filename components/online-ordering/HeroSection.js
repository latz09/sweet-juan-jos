'use client';

import Image from 'next/image';
import HeroAnimation from '../utils/animations/HeroAnimation';
import { MainHeading, Paragraph, SubHeading } from '../utils/Typography';

const HeroSection = ({ heroImageUrl, pageTitle, introText }) => {
	return (
		<div className='text-center space-y-12'>
			{heroImageUrl && (
				<div className='relative w-full h-[40vh] md:h-[50vh] '>
					<Image
						src={heroImageUrl}
						alt={pageTitle}
						fill
						className='object-cover rounded'
					/>
				</div>
			)}
			<div>
				<MainHeading title={pageTitle} type='primary' />
				{introText?.length > 0 && (
					<div className='mt-4 max-w-5xl mx-auto space-y-2'>
						{introText.map((para, idx) => (
							
                            <Paragraph key={idx} content={para}/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HeroSection;
