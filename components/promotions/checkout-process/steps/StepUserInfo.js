import AnimateUp from '@/components/utils/animations/AnimateUp';

export default function StepUserInfo({
	method,
	pickupDetails,
	deliveryAddress,
	formData,
	onChange,
	onNext,
	onBack,
}) {
	// Show some info about the chosen method
	const infoText =
		method === 'pickup'
			? `Pickup details- ${pickupDetails}`
			: `Delivery address: ${deliveryAddress}`;

	return (
		<AnimateUp className="w-full">
			<div className=' w-full grid'>
				<div className='text-center'>
					{/* Show which method user picked (pickup or delivery) */}
					<p className='text-dark/80  font-bold italic'>{infoText}</p>
					<h3 className='mb-2 text-lg font-semibold  mt-8 m'>
						Contact & Gift Details
					</h3>
				</div>

				<div className='grid lg:grid-cols-2 gap-8 place-items-center'>
					<div className='w-full md:w-5/6 mx-auto'>
						<label className='block mb-1 font-semibold'>Your Name</label>
						<input
							type='text'
							name='name'
							placeholder='Your Name'
							value={formData.name}
							onChange={onChange}
							className='border border-gray-300 p-2 w-full mb-4 rounded'
						/>

						{/* Your Email */}
						<label className='block mb-1 font-semibold'>Your Email</label>
						<input
							type='email'
							name='email'
							placeholder='Your Email'
							value={formData.email}
							onChange={onChange}
							className='border border-gray-300 p-2 w-full mb-4 rounded'
						/>

						{/* Your Phone Number */}
						<label className='block mb-1 font-semibold'>
							Your Phone Number
						</label>
						<input
							type='text'
							name='phone'
							placeholder='Your Phone Number'
							value={formData.phone}
							onChange={onChange}
							className='border border-gray-300 p-2 w-full mb-4 rounded'
						/>
					</div>
					{/* Name of Recipient */}
					<div className='w-full md:w-5/6 mx-auto '>
						<label className='block mb-1 font-semibold'>Recipient Name</label>
						<input
							type='text'
							name='recipientName'
							placeholder='Recipient Name'
							value={formData.recipientName}
							onChange={onChange}
							className='border border-gray-300 p-2 w-full mb-4 rounded'
						/>

						{/* Note to add to gift */}
						<label className='block mb-1 font-semibold'>Gift Note</label>
						<textarea
							name='giftNote'
							placeholder='Write a note to include with the gift...'
							value={formData.giftNote}
							onChange={onChange}
							className='border border-gray-300 p-2 w-full mb-4 rounded'
						/>
					</div>
				</div>

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
	);
}
