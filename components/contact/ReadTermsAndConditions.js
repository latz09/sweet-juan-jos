'use client';

import { useState, useEffect } from 'react';
import logo from '@/public/images/logo/transparent-juanjos.png';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateUp from '../utils/animations/AnimateUp';

const ReadTermsAndConditions = ({ data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		const handleBodyScroll = (isModalOpen) => {
			if (isModalOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'auto';
			}
		};

		handleBodyScroll(isModalOpen);

		return () => {
			handleBodyScroll(false);
		};
	}, [isModalOpen]);

	return (
		<>
			<button
				type='button'
				className='font-black text-xl text-primary px-4 py-2 rounded'
				onClick={openModal}
			>
				Terms and Conditions
			</button>

			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						className='fixed inset-0 bg-primary sm:bg-primary/70 backdrop-blur-sm flex justify-center items-center z-50 p-2'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition = {{ duration: .5 }}
					>
						<motion.div
							className='bg-light rounded-lg shadow-lg max-w-2xl mx-auto p-6 overflow-y-auto max-h-full '
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							transition = {{ type: 'spring', stiffness: 260, damping: 20, duration: 1.1 }}
						>
							<div className='flex justify-between items-center border-b border-primary pb-3'>
								<h2 className='text-2xl font-semibold'>Terms and Conditions</h2>
								<button
									
									onClick={closeModal}
								>
									✖
								</button>
							</div>
							<div className='pt-6  opacity-70'>
								<Image
									src={logo}
									alt='Juanjos Logo'
									width={100}
									height={100}
									className='mx-auto'
								/>
							</div>
							<div className='grid'>
								<div className='py-4'>
									{data.intro.map((paragraph, index) => (
										<p key={index} className='mb-2 font-bold text-center text-lg'>
											{paragraph}
										</p>
									))}
								</div>
								{data.terms.map((term, index) => (
									<AnimateUp key={index}>
										<div className='my-4'>
											<h3 className='text-xl font-semibold'>{term.title}</h3>
											{term.description.map((desc, i) => (
												<p key={i} className='ml-4'>
													{desc}
												</p>
											))}
										</div>
									</AnimateUp>
								))}
							</div>
							<div className='flex justify-between items-center border-b border-primary py-6'>
								<button
									className='px-4 py-2 bg-primary text-light font-bold w-full text-2xl rounded'
									onClick={closeModal}
								>
									Close
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default ReadTermsAndConditions;
