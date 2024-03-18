import {motion } from 'framer-motion';

const IntroBlurb = () => {
	return (
		<motion.div className='bg-dark'
			initial={{ y: 100 }}
			whileInView={{ y: 0}}
			transition={{ duration: 1.1, delay:.1 }}
		>
			<div className='bg-gradient-to-l from-dark via-primary/40 to-dark py-16 text-light shadow-lg shadow-primary/50'>
				<p className='leading-8 lg:leading-9 max-w-3xl mx-auto text-center text-xl lg:text-2xl px-2 lg:px-1 '>
					{`  Sweet Juanjo's is located in Stevens Point WI. We specialize in cupcakes, custom cakes, and cookies. All our products are created in our licensed kitchen, and are made to order. Contact us to discuss your vision for your next celebration.`}
				</p>
			</div>
		</motion.div>
	);
};

export default IntroBlurb;
