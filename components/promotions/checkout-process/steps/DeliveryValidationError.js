import AnimateUp from '@/components/utils/animations/AnimateUp';

const DeliveryValidationError = ({
	handleChoosePickup,
	handleContactSupport,
}) => {
	return (
		<div className='text-center p-4'>
			<AnimateUp>
				<h3 className='text-2xl lg:text-3xl font-bold text-[#a4336b] mb-4'>
					Oh Shoot, Delivery Unavailable.
				</h3>
				<p className='text-[#a4336b] mb-8 font-bold tracking-wider max-w-2xl mx-auto lg:text-lg'>
					{`We are sorry, but delivery is not currently available to this location.  Please contact us directly for possible delivery or pick up options.`}
				</p>
				<div className='flex flex-col gap-4 sm:flex-row justify-center text-lg lg:text-xl'>
					<button
						className='px-4 py-2 bg-primary text-light font-bold rounded-sm shadow-lg hover:bg-primary-dark transition'
						onClick={handleChoosePickup}
					>
						Choose Pickup
					</button>
					<button
						className='px-4 py-2 border rounded-sm scale-95 border-[#a4336b]/30'
						onClick={handleContactSupport}
					>
						Contact Us
					</button>
				</div>
			</AnimateUp>
		</div>
	);
};

export default DeliveryValidationError;
