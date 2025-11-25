'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PopupModal = ({
	title,
	subtitle,
	imageUrl,
	linkUrl,
	onClose,
	orderByDate,
}) => {
	const router = useRouter();

	const handleLinkClick = async () => {
        // Start navigation first
        router.push(linkUrl);
    
        // OPTIONAL: wait for a short time to allow page to transition, THEN close
        setTimeout(() => {
            onClose();
        }, 10); // 300ms usually feels good, adjust if needed
    };

	// Helper function to format date to "5pm on May 11th"
	const formatOrderByDate = (isoDateString) => {
		const date = new Date(isoDateString);

		const optionsDate = {
			timeZone: 'America/Chicago',
			month: 'long',
			day: 'numeric',
		};

		const optionsTime = {
			timeZone: 'America/Chicago',
			hour: 'numeric',
			hour12: true,
		};

		const formattedDate = date.toLocaleDateString('en-US', optionsDate); // February 11
		const formattedTime = date.toLocaleTimeString('en-US', optionsTime); // 5 PM

		return (
			<>
				<strong>{formattedTime.toLowerCase()}</strong> on{' '}
				<strong>{formattedDate}</strong>
			</>
		);
	};

	return (
		<AnimatePresence>
			<motion.div
				className='fixed inset-0 bg-dark/70 backdrop-blur-sm flex items-center justify-center z-50'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				<motion.div
					className='relative bg-light rounded-lg shadow-lg shadow-dark/30 overflow-hidden max-w-2xl w-full mx-4'
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.8, opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					{/* Image Section */}
					{imageUrl && (
						<div className='relative w-full h-60'>
							<Image src={imageUrl} alt={title} fill className='object-cover' />
						</div>
					)}

					{/* Content Section */}
					<div className='p-6 text-center space-y-4'>
						<div className="space-y-2">
							<h2 className='text-2xl font-bold'>{title}</h2>
							<p className='text-lg'>{subtitle}</p>
						</div>

						{/* 👇 Add this: Show order by time if available */}
						{orderByDate && (
							<p className=''>Order by {formatOrderByDate(orderByDate)}</p>
						)}

						{/* Buttons */}
						<div className='grid lg:grid-cols-2 gap-4 pt-4'>
							<button
								onClick={onClose}
								className='shadow-sm bg-primary/5 text-dark py-3 rounded-sm font-bold hover:scale-105 transition w-full'
							>
								No Thank You
							</button>

							<button
								onClick={handleLinkClick}
								className='bg-dark text-light py-3 rounded-sm  hover:scale-105 transition w-full text-lg font-black uppercase'
							>
								Place Order Now
							</button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default PopupModal;
