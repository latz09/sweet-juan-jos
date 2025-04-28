'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SmallBanner = ({ title, subtitle, onClick }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isNearBottom, setIsNearBottom] = useState(false);

	const handleToggle = (e) => {
		e.stopPropagation();
		setIsCollapsed(!isCollapsed);
	};

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
		<div className="fixed bottom-[1px] right-[1px] lg:bottom-4 lg:right-4 grid z-40 items-end justify-end gap-2 md:gap-4">
			<AnimatePresence>
				{!isCollapsed && (
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
						<div className="flex flex-col gap-2">
							<p className="text-lg lg:text-xl">{subtitle}</p>

							<div className="text-right">
								<span className="font-bold text-light underline underline-offset-4 decoration-light/40 uppercase">
									Get Started
								</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="flex flex-col items-end justify-end">
				<button
					onClick={handleToggle}
					className="bg-primary text-light p-2 rounded-full shadow-lg shadow-primary/30 hover:scale-110 transition"
					aria-label="Toggle Banner"
				>
					{isCollapsed ? (
						<div className="animate-pulse">
							<FaChevronLeft size={20} />
						</div>
					) : (
						<FaChevronRight size={20} />
					)}
				</button>
			</div>
		</div>
	);
};

export default SmallBanner;
