'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { BiLoaderAlt } from 'react-icons/bi'; // Importing a loading icon
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'; // Importing a maximize icon

const AvailableDisplayItems = ({ data }) => {
	return (
		<div className='grid gap-y-16 gap-x-2 md:gap-x-4 lg:gap-x-8 lg:gap-y-20 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-end max-w-5xl mx-auto px-2'>
			{data.filter(item => item.available).map((item, index) => (
				<DisplayItem key={index} item={item} index={index} />
			))}
		</div>
	);
};

const DisplayItem = ({ item, index }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // State to manage loading status

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		if (isModalOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}

		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, [isModalOpen]);

	const handleBackgroundClick = (e) => {
		if (e.target.classList.contains('modal-background')) {
			closeModal();
		}
	};

	const handleImageLoad = () => {
		setIsLoading(false);
	};

	return (
		<motion.div
			className='relative grid shadow-lg shadow-primary/30'
			initial={{ y: 20 }}
			whileInView={{ y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			viewport={{ once: true }}
		>
			<motion.div>
				<div className='relative'>
					<Image
						src={item.imageUrl}
						alt='Available Display Items'
						width={400}
						height={400}
						className='cursor-pointer'
						onClick={openModal}
						priority={index < 3} // Use priority for the first few images
						onLoad={handleImageLoad} // Update loading status when image is loaded
					/>
					<div className='absolute top-0 right-0 p-3 rounded-bl-lg bg-dark/90 '>
						<FiMaximize2
							className=' text-lg text-light cursor-pointer'
							onClick={openModal}
						/>
					</div>
				</div>
			</motion.div>
			<div className='bg-dark text-light p-3 flex justify-between lg:text-xl'>
				<div className='flex items-center gap-1'>
					<span>{`sz:`}</span>
					<span className='font-bold'>{item.sizes.join(' | ')}</span>
				</div>
				<div className='flex items-center gap-1'>
					<span>Qty:</span>
					<span className='font-bold'>{item.quantity}</span>
				</div>
			</div>
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						className='fixed inset-0 z-50 flex items-center justify-center bg-dark/70 backdrop-blur modal-background'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={handleBackgroundClick}
					>
						<motion.div
							className='relative p-4 rounded-lg max-w-full max-h-full overflow-auto scrollbar-hide'
							initial={{ scale: 0.98 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							transition={{ duration: 0.45 }}
							onClick={(e) => e.stopPropagation()}
						>
							{isLoading && (
								<div className='absolute inset-0 flex items-center justify-center z-50'>
									<BiLoaderAlt className='text-4xl animate-spin text-primary' />
								</div>
							)}
							<Image
								src={item.imageUrl}
								onClick={closeModal}
								alt='Available Display Items'
								width={450}
								height={450}
								className='object-contain rounded-sm shadow-lg shadow-primary/30'
								priority
								onLoad={handleImageLoad} // Update loading status when image is loaded
							/>
							<button
								className='absolute top-4 right-4 p-3  bg-dark/90 text-light rounded-bl-lg  shadow-lg shadow-primary/30 hover:bg-dark hover:text-primary transition-colors duration-300'
								onClick={closeModal}
							>
								<FiMinimize2 className='text-2xl' />
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default AvailableDisplayItems;
