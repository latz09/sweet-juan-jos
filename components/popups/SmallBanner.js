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
		<div className='fixed bottom-2 right-2 lg:bottom-4 lg:right-4 flex z-40 items-center'>
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
						<FaChevronRight size={20} />
					)}
				</button>
			</div>

			{/* Banner itself */}
			<AnimatePresence>
				{!isCollapsed && (
					<motion.div
						className='bg-dark text-light px-4 py-4 rounded-sm shadow-lg shadow-primary/30 cursor-pointer overflow-hidden ml-2'
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
							<div>
								<h2 className='text-lg lg:text-2xl font-bold'>{title}</h2>
								<p className='lg:text-lg'>{subtitle}</p>
							</div>
							<div className='text-right mt-2'>
								<span className='shadow-lg shadow-light/10 rounded-sm font-bold p-2 bg-light text-dark text-sm'>
									Get Started
								</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SmallBanner;
