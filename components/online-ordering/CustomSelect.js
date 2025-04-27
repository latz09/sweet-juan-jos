'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useNoScroll from '@/lib/useNoScroll';

const CustomSelect = ({
	label,
	options,
	selectedOption,
	setSelectedOption,
	getOptionLabel,
	getOptionPrice,
	type = 'upcharge',
}) => {
	const [open, setOpen] = useState(false);
	

	const handleSelect = (option) => {
		setSelectedOption(option);
		setOpen(false);
	};

	function formatOption(option) {
		const labelText = getOptionLabel(option);
		const price = getOptionPrice ? getOptionPrice(option) : null;

		if (price === null || price === undefined) return labelText;

		if (type === 'quantity') {
			// ✅ Inside modal, show label + price
			return (
				<div className='flex items-center justify-between'>
					<span>{labelText}</span>
					<span className='text-lg font-bold'>${price}</span>
				</div>
			);
		}

		if (type === 'upcharge') {
			return price > 0
				? `${labelText} (+$${price} per cupcake)`
				: `${labelText} (no extra charge)`;
		}

		return labelText;
	}

	// ✅ For button: Only label (no pricing)
	function formatButtonLabel(option) {
		return getOptionLabel(option);
	}

	return (
		<div className='flex flex-col space-y-1 relative'>
			<label className='text-sm font-semibold'>{label}</label>

			{/* Main button */}
			<button
				type='button'
				className='w-full p-4 rounded bg-primary/10 flex justify-between items-center focus:outline-none'
				onClick={() => setOpen(true)}
			>
				<span>
					{selectedOption
						? formatButtonLabel(selectedOption)
						: `Select ${label}`}
				</span>
				<FaChevronDown className='ml-2' />
			</button>

			{/* Modal */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-dark/70 backdrop-blur-sm z-50 flex items-center justify-center p-4'
					>
						<div className='bg-light rounded-lg max-w-md w-full p-6 space-y-4 relative'>
							<div className='flex justify-between items-center mb-4'>
								<h2 className='text-lg font-bold'>{label}</h2>
								<button
									onClick={() => setOpen(false)}
									className='text-dark text-2xl leading-none'
								>
									&times;
								</button>
							</div>

							<div className='space-y-3'>
								{options.map((option) => (
									<div
										key={option._id || option.label}
										onClick={() => handleSelect(option)}
										className='cursor-pointer p-3 rounded bg-primary text-light uppercase font-black hover:bg-dark hover:text-light transition'
									>
										{formatOption(option)}
									</div>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CustomSelect;
