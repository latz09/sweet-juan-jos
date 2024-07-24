// import { motion } from 'framer-motion';
import { Paragraph } from '../utils/Typography';
import Socials from '../utils/Socials';
const IntroBlurb = ({data}) => {
	return (
		<div
			className='max-w-4xl mx-auto px-4 lg:px-0 text-center grid gap-12 font-bold'
			
		>
			<Paragraph
				content={data
					
				}
				type='dark'
			/>
			<Socials includeText={false}/>
		</div>
	);
};

export default IntroBlurb;
