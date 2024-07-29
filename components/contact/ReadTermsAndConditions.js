'use client';

import { useState, useEffect } from 'react';

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
            type = 'button'
				className='font-black text-xl text-primary px-4 py-2 rounded'
				onClick={openModal}

			>
				 Terms and Conditions
			</button>

			{isModalOpen && (
				<div className='fixed inset-0 bg-dark/80 flex justify-center items-center z-50'>
					<div className='bg-light rounded-lg shadow-lg max-w-2xl mx-auto p-6 overflow-y-auto max-h-full'>
						<div className='flex justify-between items-center border-b pb-3'>
							<h2 className='text-2xl font-semibold'>Terms and Conditions</h2>
							<button
								className='text-gray-500 hover:text-gray-700'
								onClick={closeModal}
							>
								✖
							</button>
						</div>
						<div className='mt-4 grid'>
							<div className='py-7'>
								{data.intro.map((paragraph, index) => (
									<p key={index} className='mb-2 font-bold text-center text-lg'>
										{paragraph}
									</p>
								))}
							</div>
							{data.terms.map((term, index) => (
								<div key={index} className='my-4'>
									<h3 className='text-xl font-semibold'>{term.title}</h3>
									{term.description.map((desc, i) => (
										<p key={i} className='ml-4'>
											{desc}
										</p>
									))}
								</div>
							))}
						</div>
						<div className='flex justify-between items-center border-b py-6'>
							<button
								className='px-4 py-2 bg-primary text-light font-bold w-full text-2xl rounded'
								onClick={closeModal}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ReadTermsAndConditions;
