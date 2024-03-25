import { motion } from 'framer-motion';

const AnimateUp = ({ children, className, ...rest }) => {
	return (
		<>
			<motion.div
				className={className}
				initial={{ y: 100, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				transition={{ duration: 1.1, delay: 0.1 }}
                {...rest}
			>
                <div>
				{children}</div>
			</motion.div>
		</>
	);
};

export default AnimateUp;
