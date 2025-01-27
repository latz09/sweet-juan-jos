'use client';

import AnimateUp from '@/components/utils/animations/AnimateUp'; // Ensure this path is correct

const StepThankYou = ({ onClose }) => {
	return (
		<AnimateUp>
			<div className='text-center p-4'>
				<h3 className='text-2xl font-semibold text-green-600 mb-4'>
					Thank You for Your Order!
				</h3>
				<p className='text-dark/80 max-w-3xl mx-auto font-bold tracking-wider text-xl lg:text-2xl'>
					Payment will be collected at the time of
					{` `}
					<span className='text-primary font-semibold'>delivery or pickup</span>
					, depending on the option you selected. We appreciate your business
					and look forward to baking for you!
				</p>
				<p className='mt-4 text-xl  text-dark/90 max-w-3xl mx-auto tracking-wider'>
					{`An email confirmation has been sent to your inbox. Please check your
					spam or junk folder if you don't see it in your inbox.`}
				</p>
				<p className='mb-12 mt-4 text-xl font-bold text-primary'>-Katie Jo</p>
				<button
					className='px-4 py-2 bg-primary text-light font-bold rounded-sm shadow-lg hover:bg-primary-dark transition'
					onClick={onClose} // Close the modal
				>
					Close
				</button>
			</div>
		</AnimateUp>
	);
};

export default StepThankYou;
