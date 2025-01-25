import AnimateUp from '@/components/utils/animations/AnimateUp';

const DeliveryValidationError = ({
	handleChoosePickup,
	handleContactSupport,
}) => {
	return (
		<div className='text-center p-4'>
			<AnimateUp>
				<h3 className='text-2xl font-bold text-[#a4336b] mb-4'>
					Oh Shoot, Delivery Unavailable.
				</h3>
				<p className='text-[#a4336b] mb-8 font-bold tracking-wider max-w-2xl mx-auto'>
					{`We're sorry, but we do not deliver to your area at the moment.
					However, you can choose to pick up your order or contact us directly
					to inquire about possible delivery options.`}
				</p>
				<div className='flex flex-col gap-4 sm:flex-row justify-center'>
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
