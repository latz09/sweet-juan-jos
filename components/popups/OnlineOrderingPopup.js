'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const OnlineOrderingPopup = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isNearBottom, setIsNearBottom] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 5000); // show after 5 seconds

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.innerHeight + window.scrollY;
			const bottomThreshold = document.body.offsetHeight - 150; // 150px from bottom

			setIsNearBottom(scrollPosition >= bottomThreshold);
		};

		handleScroll(); // check immediately
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, []);

	if (!isVisible || isNearBottom) {
		return null;
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 100 }}
				transition={{ type: 'spring', stiffness: 300, damping: 20 }}
				className='fixed inset-x-0 bottom-4 flex justify-center z-40'
			>
				<motion.div
					whileHover={{ scale: 1.05 }}
					className='bg-dark text-light rounded-full shadow-lg shadow-primary/30 cursor-pointer px-6 py-2 flex items-center gap-2'
				>
					<Link href='/online-ordering' className='font-semibold'>
						Order Online
					</Link>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default OnlineOrderingPopup;
