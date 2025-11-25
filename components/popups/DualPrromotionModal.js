'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const DualPromotionModal = ({ promotions, onClose }) => {
	const router = useRouter();

	const handlePromotionClick = (slug) => {
		router.push(`/promotions/${slug}`);
		onClose(); // Close immediately
	};

	return (
		<AnimatePresence>
			<motion.div
				className='fixed inset-0 bg-dark/70 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				<motion.div
					className='relative bg-light rounded-lg shadow-lg shadow-dark/30 overflow-hidden max-w-4xl w-full my-8'
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.8, opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					{/* Two Promotions Grid */}
					<div className='grid md:grid-cols-2 gap-4 md:gap-0 md:divide-x divide-primary'>
						{promotions.map((promo, index) => (
							<div
								key={promo.slug.current}
								className='flex flex-col p-2 lg:p-4'
							>
								{/* Image */}
								{promo.landingPageImage && (
									<div className='relative w-full h-48 md:h-60'>
										<Image
											src={promo.landingPageImage}
											alt={promo.title}
											fill
											className='object-cover'
										/>
									</div>
								)}

								{/* Content */}
								<div className='p-6 text-center space-y-4 flex-grow flex flex-col justify-between'>
									<h2 className='text-xl md:text-2xl font-bold'>{promo.title}</h2>

									<button
										onClick={() => handlePromotionClick(promo.slug.current)}
										className='bg-dark text-light py-3 px-6 rounded-sm hover:scale-105 transition text-base md:text-lg font-black uppercase w-full'
									>
										Place Order Now
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Shared "No Thank You" button at bottom */}
					<div className='p-4 border-t border-dark/10'>
						<button
							onClick={onClose}
							className='shadow-sm bg-primary/10 hover:bg-primary hover:text-light text-dark py-3 rounded-sm font-bold hover:scale-95 transition w-full'
						>
							No Thank You
						</button>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default DualPromotionModal;