'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DateTimeSelector = ({
	selectedMethod,
	dateTimeSlots = [],
	selectedDate,
	selectedTimeSlot,
	onDateSelect,
	onTimeSlotSelect,
}) => {
	const [localDate, setLocalDate] = useState(selectedDate || '');
	const [localTimeSlot, setLocalTimeSlot] = useState(selectedTimeSlot || '');

	// Sync with parent when props change
	useEffect(() => {
		setLocalDate(selectedDate || '');
		setLocalTimeSlot(selectedTimeSlot || '');
	}, [selectedDate, selectedTimeSlot]);

	// Get available time slots for the selected date
	const availableTimeSlots =
		dateTimeSlots.find((slot) => slot.date === localDate)?.timeSlots || [];

	function handleDateChange(date) {
		setLocalDate(date);
		setLocalTimeSlot(''); // Reset time slot when date changes
		onDateSelect(date);
		onTimeSlotSelect(''); // Clear time slot in parent
	}

	function handleTimeSlotChange(timeSlot) {
		setLocalTimeSlot(timeSlot);
		onTimeSlotSelect(timeSlot);
	}

	// Format date for display (e.g., "2024-12-23" → "December 23, 2024")
	function formatDate(dateString) {
		if (!dateString) return '';
		// Parse as local date to avoid timezone shifts
		const [year, month, day] = dateString.split('-').map(Number);
		const date = new Date(year, month - 1, day); // month is 0-indexed
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	}

	// Don't show if no method selected or no slots available
	if (!selectedMethod || !dateTimeSlots || dateTimeSlots.length === 0) {
		return null;
	}

	const methodLabel = selectedMethod === 'pickup' ? 'Pickup' : 'Delivery';

	return (
		<AnimatePresence mode='wait' initial={false}>
			<motion.section
				key='datetime-selector'
				initial={{ opacity: 0, scaleY: 0 }}
				animate={{ opacity: 1, scaleY: 1 }}
				exit={{ opacity: 0, scaleY: 0 }}
				transition={{ duration: 0.4, ease: 'easeInOut' }}
				className='origin-top overflow-hidden space-y-6 pt-4'
			>
				<h3 className='text-xl lg:text-2xl font-bold'>
					Select {methodLabel} Date & Time
				</h3>

				{/* Date Selection */}
				<div className='space-y-4'>
					<label className='block text-lg font-bold text-dark/80'>
						Select Date:
					</label>
					<div className='grid gap-3'>
						{dateTimeSlots.length === 0 ? (
							<p className='text-red-500 font-bold'>
								No dates available for {methodLabel.toLowerCase()}
							</p>
						) : (
							dateTimeSlots.map((slot, index) => (
								<button
									key={index}
									type='button'
									onClick={() => handleDateChange(slot.date)}
									className={`p-4 rounded-sm font-bold text-lg transition duration-300 ${
										localDate === slot.date
											? 'bg-primary text-light shadow-lg shadow-primary/30'
											: 'bg-white border border-primary/20 text-dark hover:border-primary/60 hover:shadow-md'
									}`}
								>
									{formatDate(slot.date)}
								</button>
							))
						)}
					</div>
				</div>

				{/* Time Slot Selection */}
				<AnimatePresence mode='wait' initial={false}>
					{localDate && availableTimeSlots.length > 0 && (
						<motion.div
							key='time-slots'
							initial={{ opacity: 0, scaleY: 0 }}
							animate={{ opacity: 1, scaleY: 1 }}
							exit={{ opacity: 0, scaleY: 0 }}
							transition={{ duration: 0.4, ease: 'easeInOut' }}
							className='origin-top overflow-hidden space-y-4'
						>
							<label className='block text-lg font-bold text-dark/80'>
								Select Time Slot:
							</label>
							<div className='grid gap-3'>
								{availableTimeSlots.map((slot, index) => (
									<button
										key={index}
										type='button'
										onClick={() => handleTimeSlotChange(slot.timeSlot)}
										className={`p-4 rounded-sm font-bold text-lg transition duration-300 ${
											localTimeSlot === slot.timeSlot
												? 'bg-primary text-light shadow-lg shadow-primary/30'
												: 'bg-white border border-primary/20 text-dark hover:border-primary/60 hover:shadow-md'
										}`}
									>
										{slot.timeSlot}
									</button>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Validation message */}
				{localDate && !localTimeSlot && (
					<p className='text-dark/60 font-bold text-center'>
						Please select a time slot to continue
					</p>
				)}
			</motion.section>
		</AnimatePresence>
	);
};

export default DateTimeSelector;