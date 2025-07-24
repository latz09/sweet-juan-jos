'use client';

import Link from 'next/link';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { MAX_ONLINE_ORDER_TOTAL } from '@/lib/constants';

const LimitModal = ({ onClose, maxOrderAmount }) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='fixed inset-0 backdrop-blur-sm bg-dark/30 flex items-center justify-center z-[100] px-4'
			>
				<motion.div
					initial={{ y: 40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 40, opacity: 0 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className='bg-light max-w-md w-full rounded-lg p-6 shadow-xl relative text-center'
				>
					<FaTriangleExclamation className='text-primary text-3xl mb-4 mx-auto' />
					<h2 className='text-xl font-bold mb-2'>Order Limit Exceeded</h2>
					<p className='mb-6'>
						For orders over <strong>${maxOrderAmount}</strong>, please use our event inquiry form. You will be able to share details, upload inspiration photos, and we will follow up quickly after.
					</p>
					<div className='flex justify-center gap-4 uppercase font-bold'>
						<button
							onClick={onClose}
							className='px-4 py-2 bg-dark/10 rounded-sm transition'
						>
							Go Back
						</button>
						<Link
							href='/contact-katie-jo'
							className='px-4 py-2 bg-primary text-light rounded-sm hover:bg-dark transition'
						>
							Event Form
						</Link>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default LimitModal;
