import AnimateUp from '@/components/utils/animations/AnimateUp';
import { useState } from 'react';

// Utility to check if phone has at least 10 digits
function isPhoneNumberValid(phone) {
	// Remove non-digit characters
	const digits = phone.replace(/\D/g, '');
	// For US-based logic, require at least 10 digits
	return digits.length === 10;
}

export default function StepUserInfo({
	method,
	pickupDetails,
	deliveryAddress,
	formData,
	onChange,
	onNext,
	onBack,
	giftOption,
}) {
	// Show some info about the chosen method
	const infoText =
		method === 'pickup'
			? `Pickup details: ${pickupDetails}`
			: `Delivery address: ${deliveryAddress}`;

	// State to track validation errors
	const [errors, setErrors] = useState({});

	function handleNext() {
		const newErrors = {};

		// Require name
		if (!formData.name.trim()) {
			newErrors.name = 'Name is required.';
		}

		// Require valid email
		if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Valid email is required.';
		}

		// Require phone -> Check for at least 10 digits
		const phoneValue = formData.phone.trim();
		if (!phoneValue) {
			newErrors.phone = 'Phone number is required.';
		} else if (!isPhoneNumberValid(phoneValue)) {
			newErrors.phone = 'Please enter 10 digits in your phone number.';
		}

		// Require recipientName only if giftOption is true
		if (giftOption && !formData.recipientName.trim()) {
			newErrors.recipientName = 'Recipient name is required.';
		}

		// If there are errors, set them and don't proceed
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// Clear errors and proceed to the next step
		setErrors({});
		onNext();
	}

	return (
		<AnimateUp className='w-full'>
			<div className='w-full grid'>
				<div className='text-center'>
					<p className='text-dark/80 font-bold italic'>{infoText}</p>
					<h3 className='mb-4 text-2xl font-bold mt-8'>
						{giftOption ? 'Contact & Gift Details' : 'Contact Details'}
					</h3>
				</div>

				<div
					className={`grid ${
						giftOption ? 'lg:grid-cols-2' : 'grid-cols-1'
					} gap-8 mt-4 place-items-center ${
						!giftOption ? 'md:w-1/2 md:mx-auto' : ''
					}`}
				>
					<div className='w-full md:w-5/6 mx-auto'>
						{/* Your Name */}
						{errors.name && (
							<p className='text-[#a4336b] font-bold'>{errors.name}</p>
						)}
						<input
							type='text'
							name='name'
							placeholder='Your Name'
							value={formData.name}
							onChange={onChange}
							className='promotion-form-input'
						/>

						{/* Your Email */}
						{errors.email && (
							<p className='text-[#a4336b] font-bold'>{errors.email}</p>
						)}
						<input
							type='email'
							name='email'
							placeholder='Your Email'
							value={formData.email}
							onChange={onChange}
							className='promotion-form-input'
						/>

						{/* Your Phone Number */}
						{errors.phone && (
							<p className='text-[#a4336b] font-bold'>{errors.phone}</p>
						)}
						<input
							type='text'
							name='phone'
							placeholder='Your Phone Number'
							value={formData.phone}
							onChange={onChange}
							className='promotion-form-input'
						/>
					</div>

					{/* Gift Option */}
					{giftOption && (
						<div className='w-full md:w-5/6 mx-auto'>
							{/* Recipient Name */}
							{errors.recipientName && (
								<p className='text-[#a4336b] font-bold'>
									{errors.recipientName}
								</p>
							)}
							<input
								type='text'
								name='recipientName'
								placeholder='Recipient Name'
								value={formData.recipientName}
								onChange={onChange}
								className='promotion-form-input'
							/>

							{/* Note to add to gift */}
							<textarea
								name='giftNote'
								placeholder='Write a note to include with the gift...'
								value={formData.giftNote}
								onChange={onChange}
								rows={3}
								className='promotion-form-input'
							/>
						</div>
					)}
				</div>

				<div className='flex gap-8 mx-auto items-center mt-8'>
					<button
						className='px-4 py-2 rounded-sm border border-dark/60'
						onClick={onBack}
					>
						Back
					</button>
					<button
						className='px-4 py-2 bg-primary text-light font-bold rounded-sm shadow-lg'
						onClick={handleNext}
					>
						Next
					</button>
				</div>
			</div>
		</AnimateUp>
	);
}
