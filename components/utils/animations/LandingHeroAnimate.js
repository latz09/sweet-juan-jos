'use client';
import { motion } from 'framer-motion';

const LandingHeroAnimate = ({ children, className, ...rest }) => {
	return (
		<>
			<motion.div
				className={className}
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1 }}
				{...rest}
			>
				<div>{children}</div>
			</motion.div>
		</>
	);
};

export default LandingHeroAnimate;
