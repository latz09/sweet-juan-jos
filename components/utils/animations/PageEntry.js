'use client';

import { motion } from 'framer-motion';
const PageEntry = ({ children, className }) => {
	return (
		<div>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1.1 }}
				className={className}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default PageEntry;
