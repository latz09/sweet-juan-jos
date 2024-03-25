import { motion } from 'framer-motion';
import { Paragraph } from '../utils/Typography';
import Socials from '../utils/Socials';
const IntroBlurb = () => {
	return (
		<motion.div
			className='max-w-4xl mx-auto px-4 lg:px-0 text-center grid gap-12'
			initial={{ y: 100 }}
			whileInView={{ y: 0 }}
			transition={{ duration: 1.1, delay: 0.1 }}
		>
			<Paragraph
				content={`Sweet Juanjo's is located in Stevens Point WI. We specialize in cupcakes, custom cakes, and cookies. All our products are created in our licensed kitchen, and are made to order. Contact us to discuss your vision for your next celebration.`}
				type='dark'
			/>
			<Socials includeText={false}/>
		</motion.div>
	);
};

export default IntroBlurb;
