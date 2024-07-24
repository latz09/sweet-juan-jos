"use client"

import { motion } from 'framer-motion';

const ImageBannerContainer = ({ children }) => {
	return (
		<motion.div
			
			className='w-1/2 lg:w-1/3  '
			initial={{ scale: 0.9, rotateX: 10, rotateY: 10, opacity: 0 }}
			whileInView={{ scale: 1, rotateX: 0, rotateY: 0, opacity: 1 }}
			transition={{ duration: 1.6, type: 'spring', delay: 0.2 }}
			viewport={{ once: true }}
		>
			{children}
		</motion.div>
	);
};

export default ImageBannerContainer;
