'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SmallBanner = ({ title, subtitle, onClick }) => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const handleToggle = (e) => {
		e.stopPropagation();
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div className='fixed bottom-[1px] right-[1px] lg:bottom-4 lg:right-4 flex z-40 items-center'>
			{/* Outer wrapper that keeps the button perfectly aligned */}
			<div className='flex flex-col items-center justify-center'>
				<button
					onClick={handleToggle}
					className='bg-primary text-light p-2 rounded-full shadow-lg shadow-primary/30 hover:scale-110 transition'
					aria-label='Toggle Banner'
				>
					{isCollapsed ? (
						<div className='animate-pulse'>
							{' '}
							<FaChevronLeft size={20} />{' '}
						</div>
					) : (
						<FaChevronRight size={20} className="" />
					)}
				</button>
			</div>

			{/* Banner itself */}
			<AnimatePresence>
				{!isCollapsed && (
					<motion.div
						className='bg-dark text-light px-4 py-2 rounded-sm shadow-lg shadow-primary/30 cursor-pointer overflow-hidden ml-2'
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
						<div className='flex flex-col gap-2'>
							<p className='text-lg lg:text-xl'>{subtitle}</p>

							<div className='text-right'>
								<span className=' font-bold text-light underline underline-offset-4 decoration-light/40 uppercase'>Get Started</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SmallBanner;
