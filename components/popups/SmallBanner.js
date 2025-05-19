'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SmallBanner = ({ title, subtitle, onClick }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isNearBottom, setIsNearBottom] = useState(false);

	

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.innerHeight + window.scrollY;
			const bottomThreshold = document.body.offsetHeight - 150; // 👈 150px from bottom

			if (scrollPosition >= bottomThreshold) {
				setIsNearBottom(true);
			} else {
				setIsNearBottom(false);
			}
		};

		handleScroll(); // check immediately
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll); // In case of window resize

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, []);

	// Hide when near the bottom
	if (isNearBottom) {
		return null;
	}

	return (
		
		<div className="fixed inset-x-0 bottom-4 flex justify-center z-40">
			<AnimatePresence>
				
					<motion.div
						className="bg-dark text-light px-4 py-2 rounded-sm shadow-lg shadow-primary/30 cursor-pointer overflow-hidden ml-2"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.3 }}
						style={{
							maxWidth: '30rem',
							whiteSpace: 'nowrap',
						}}
						onClick={onClick}
					>
						<div className="tracking-wider text-center font-bold uppercase">
							View Latest Promotion

						</div>
					</motion.div>
			
			</AnimatePresence>

		</div>
	);
};

export default SmallBanner;
