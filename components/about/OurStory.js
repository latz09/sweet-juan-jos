'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MainHeading, SubHeading } from '../utils/Typography';
import ButtonLink from '../utils/ButtonLink';
import { FaArrowLeft } from 'react-icons/fa6';

const OurStory = ({ data }) => {
	const [isOpen, setIsOpen] = useState(true);

	// Disable scrolling on the body when the modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'visible';
		}

		return () => {
			document.body.style.overflow = 'visible';
		};
	}, [isOpen]);

	return (
		<>
			<div className='grid place-items-center'>
				<button
					onClick={() => setIsOpen(true)}
					className='border bg-primary text-light font-bold rounded-sm border-primary/30 shadow-lg px-4 py-2 mt-8 text-2xl'
				>
					Our Full Story
				</button>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ y: 600 }}
						animate={{ y: 0 }}
						exit={{ y: 2000 }}
						transition={{ duration: 1.1 }}
						className='fixed inset-0 bg-light/80 backdrop-blur z-50 flex justify-center items-center  border-t-4 border-primary'
						onClick={() => setIsOpen(false)}
					>
						<motion.div
							// initial={{ opacity: 0 }}
							// animate={{ opacity: 1 }}
							// transition={{ duration: 1.1 }}
							className='relative w-full h-full flex flex-col items-center justify-center p-2 lg:p-4   '
							onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
						>
							<div className='w-full h-full relative  overflow-hidden  '>
								<div className='h-full flex flex-col  text-dark gap-8 overflow-y-auto max-h-[100vh] pb-16 scrollbar-hide'>
									<div className='grid gap-7 lg:gap-10 place-items-center '>
										<button
											onClick={() => setIsOpen(false)}
											className='text-2xl my-1 lg:my-4 sticky top-0 text-primary bg-light/90 border border-primary/30 p-3 rounded-full shadow-lg shadow-primary/30'
											aria-label='Close'
										>
											<FaArrowLeft />
										</button>

										<SubHeading title={data.heading} type='dark' />
										<Image
											src={data.ourStoryImage}
											alt={data.heading}
											width={200}
											height={200}
											priority={true}
											className='mx-auto shadow-lg shadow-primary/40 rounded-lg mb-4'
										/>
										<div className='grid place-items-center w-full '>
											{data.paragraphs.map((item, index) => (
												<div
													key={index}
													className={`${index % 2 === 0 ? 'bg-light/50' : 'bg-primary/10'} grid place-items-center py-12 w-full`}
												>
													<div
														className={`text-center w-full lg:w-1/2 grid gap-2 ${index % 2 === 0 ? '' : ''}`}
													>
														<h2 className='text-2xl font-bold'>
															{item.heading}
														</h2>
														<p className='text-xl lg:text-2xl font-bold leading-8 lg:leading-10 p-3'>
															{item.paragraph}
														</p>
													</div>
												</div>
											))}
										</div>

										<button
											onClick={() => setIsOpen(false)}
											className='text-2xl mt-8 border border-dark/30 px-4 py-2 w-full lg:w-1/2 mx-auto'
											aria-label='Close'
										>
											Go Back
										</button>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default OurStory;
