'use client';

import { useState } from 'react';
import AnimateUp from '@/components/utils/animations/AnimateUp';

export default function StepDateTimeSelection({
	method,
	dateTimeSlots = [],
	selectedDate,
	selectedTimeSlot,
	onDateSelect,
	onTimeSlotSelect,
	onNext,
	onBack,
}) {
	const [localDate, setLocalDate] = useState(selectedDate || '');
	const [localTimeSlot, setLocalTimeSlot] = useState(selectedTimeSlot || '');

	// Get available time slots for the selected date
	const availableTimeSlots =
		dateTimeSlots.find((slot) => slot.date === localDate)?.timeSlots || [];

	function handleDateChange(date) {
		setLocalDate(date);
		setLocalTimeSlot(''); // Reset time slot when date changes
		onDateSelect(date);
	}

	function handleTimeSlotChange(timeSlot) {
		setLocalTimeSlot(timeSlot);
		onTimeSlotSelect(timeSlot);
	}

	function handleNext() {
		if (!localDate || !localTimeSlot) {
			alert('Please select both a date and time slot');
			return;
		}
		onNext();
	}

	// Format date for display (e.g., "2024-12-23" → "December 23, 2024")
	// FIXED: Parse as local date instead of UTC
	function formatDate(dateString) {
		// Split the date string and create a date in local timezone
		const [year, month, day] = dateString.split('-').map(Number);
		const date = new Date(year, month - 1, day); // month is 0-indexed

		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	}

	return (
		<AnimateUp>
			<div className='grid place-items-center gap-12 max-w-2xl mx-auto'>
				<h3 className='text-2xl md:text-3xl font-bold text-center'>
					Select {method === 'pickup' ? 'Pickup' : 'Delivery'} Date & Time
				</h3>

				{/* Date Selection */}
				<div className='w-full space-y-4'>
					<label className='block text-xl font-bold text-dark/80'>
						Select Date:
					</label>
					<div className='grid gap-3'>
						{dateTimeSlots.length === 0 ? (
							<p className='text-red-500 font-bold'>
								No dates available for {method}
							</p>
						) : (
							dateTimeSlots.map((slot, index) => (
								<button
									key={index}
									onClick={() => handleDateChange(slot.date)}
									className={`p-4 rounded-lg font-bold text-lg transition duration-300 ${
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
				{localDate && availableTimeSlots.length > 0 && (
					<div className='w-full space-y-4'>
						<label className='block text-xl font-bold text-dark/80'>
							Select Time Slot:
						</label>
						<div className='grid gap-3'>
							{availableTimeSlots.map((slot, index) => (
								<button
									key={index}
									onClick={() => handleTimeSlotChange(slot.timeSlot)}
									className={`p-4 rounded-lg font-bold text-lg transition duration-300 ${
										localTimeSlot === slot.timeSlot
											? 'bg-primary text-light shadow-lg shadow-primary/30'
											: 'bg-white border border-primary/20 text-dark hover:border-primary/60 hover:shadow-md'
									}`}
								>
									{slot.timeSlot}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Navigation Buttons */}
				<div className='flex gap-4 mt-8'>
					<button
						className='px-6 py-2 rounded-md border border-dark/60 font-bold'
						onClick={onBack}
					>
						Back
					</button>
					<button
						className={`px-6 py-2 rounded-md font-bold transition duration-300 ${
							localDate && localTimeSlot
								? 'bg-primary text-light hover:bg-primary/80'
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
						}`}
						onClick={handleNext}
						disabled={!localDate || !localTimeSlot}
					>
						Continue
					</button>
				</div>
			</div>
		</AnimateUp>
	);
}
