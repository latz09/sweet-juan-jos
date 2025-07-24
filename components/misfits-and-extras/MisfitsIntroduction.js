import { MainHeading, Paragraph } from '../utils/Typography';

const MisfitsIntroduction = ({ title, introText }) => {
	// Handle missing or empty title
	const displayTitle = title || 'Misfits & Extras';

	// Handle missing or invalid introText array
	const displayIntroText =
		Array.isArray(introText) && introText.length > 0
			? introText
			: ['Check back soon for fresh misfits and extras!'];

	return (
		<div className='bg-gradient-to-b from-primary/30 to-transparent pt-16 pb-8'>
			<div className='max-w-5xl mx-auto space-y-4 p-4 '>
				<MainHeading title={displayTitle} type='dark' />
				<div className='space-y-2 text-center'>
					{displayIntroText.map((para, idx) => (
						<Paragraph key={idx} content={para} type='dark' />
					))}
				</div>
			</div>
		</div>
	);
};

export default MisfitsIntroduction;
