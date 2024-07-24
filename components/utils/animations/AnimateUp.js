'use client';
import { motion } from 'framer-motion';

const AnimateUp = ({ children, className, ...rest }) => {
	return (
		<>
			<motion.div
				className={className}
				initial={{ y: 30, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.7, delay: 0 }}
				viewport={{ once: true }}
				{...rest}
			>
				<div>{children}</div>
			</motion.div>
		</>
	);
};

export default AnimateUp;
