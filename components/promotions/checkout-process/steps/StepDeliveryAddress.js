import AnimateUp from '@/components/utils/animations/AnimateUp';
import React from 'react';

export default function StepDeliveryAddress({
	deliveryDetails,
	addressValue,
	onChange,
	onNext,
	onBack,
}) {
	return (
		<div>
			<AnimateUp>
				<p className='text-dark/80  font-bold italic text-center'>
					Delivery details: {deliveryDetails}
				</p>
				<h3 className='mb-2 text-lg font-semibold  mt-8 m'>Delivery Address</h3>
				<input
					type='text'
					name='address'
					placeholder='Enter delivery address'
					value={addressValue}
					onChange={onChange}
					className='promotion-form-input'
				/>
				<div className='flex gap-2'>
					<div className='flex gap-8 mx-auto items-center mt-8'>
						<button
							className='px-4 py-2 rounded-sm border border-dark/60 '
							onClick={onBack}
						>
							Back
						</button>
						<button
							className='px-4 py-2 bg-primary text-light font-bold rounded-sm shadow-lg'
							onClick={onNext}
						>
							Next
						</button>
					</div>
				</div>
			</AnimateUp>
		</div>
	);
}
