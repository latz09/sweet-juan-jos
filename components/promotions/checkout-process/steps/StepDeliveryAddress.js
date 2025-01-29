import AnimateUp from '@/components/utils/animations/AnimateUp';
import { useState } from 'react';

export default function StepDeliveryAddress({
	deliveryDetails,
	street,
	city,
	zip,
	onChange,
	onNext,
	onBack,
	onValidationError,
}) {
	// Allowed zip codes:
	const allowedZipCodes = ['54481', '54482', '54467'];

	// State to track validation errors
	const [errors, setErrors] = useState({
		street: '',
		city: '',
		zip: '',
	});

	// Validate all fields
	function handleNextClick() {
		const newErrors = {};

		if (!street.trim()) {
			newErrors.street = 'Street address is required.';
		}
		if (!city.trim()) {
			newErrors.city = 'City is required.';
		}
		if (!zip.trim()) {
			newErrors.zip = 'Zip code is required.';
		} else if (!/^\d+$/.test(zip)) {
			newErrors.zip = 'Zip code must contain only numbers.';
		} else if (!allowedZipCodes.includes(zip)) {
			// If zip code is invalid, go to validation modal
			onValidationError();
			return; // Stop further validation and navigation
		}

		// If there are errors, set them and stop
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// Clear errors and proceed
		setErrors({});
		onNext();
	}

	return (
		<AnimateUp>
			<div className='md:w-2/3 mx-auto'>
				<p className='text-dark/80 font-bold italic text-center'>
					Delivery details: {deliveryDetails}
				</p>
				<div>
					<h3 className='mb-2 text-lg font-semibold mt-8'>Delivery Address</h3>

					{/* Street Address */}
					{errors.street && (
						<p className='text-primary font-bold tracking-wider'>
							{errors.street}
						</p>
					)}
					<label htmlFor='street'>Street Address</label>
					<input
						id='street'
						name='street'
						value={street}
						onChange={(e) => onChange('street', e.target.value)}
						className='promotion-form-input'
					/>

					{/* City */}
					<label htmlFor='city'>City/Town</label>
					{errors.city && (
						<p className='text-primary font-bold tracking-wider'>
							{errors.city}
						</p>
					)}
					<input
						id='city'
						name='city'
						value={city}
						onChange={(e) => onChange('city', e.target.value)}
						className='promotion-form-input'
					/>

					{/* Zip Code */}
					{errors.zip && (
						<p className='text-primary font-bold tracking-wider'>
							{errors.zip}
						</p>
					)}
					<label htmlFor='zip'>Zip Code</label>
					<input
						id='zip'
						name='zip'
						value={zip}
						onChange={(e) => onChange('zip', e.target.value)}
						className='promotion-form-input'
					/>
				</div>

				<div className='grid place-items-center'>
					<div className='flex gap-8 mx-auto items-center mt-8'>
						<button
							className='px-4 py-2 rounded-sm border border-dark/60'
							onClick={onBack}
						>
							Back
						</button>
						<button
							className='px-4 py-2 bg-primary text-light font-bold rounded-sm shadow-lg'
							onClick={handleNextClick}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</AnimateUp>
	);
}
