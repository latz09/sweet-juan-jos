import AnimateUp from '@/components/utils/animations/AnimateUp';

export default function StepPaymentChoice({ onPayNow, onPayLater, onBack }) {
	return (
		<div>
			<AnimateUp>
				<h3 className='mb-8 text-lg font-semibold text-center'>
					How would you like to pay?
				</h3>

				{/* Cards for Payment Options */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 '>
					{/* Pay Now Card */}
					<PaymentOptionCard
						title='Pay Now'
						description='Pay securely online to confirm your order. We accept all major credit cards.'
						buttonText='Select Pay Now'
						onClick={onPayNow}
						cardBgClass='bg-primary/20 text-dark shadow-lg' // Primary background
						buttonBgClass='bg-light text-white' // Dark button
						textColorClass='text-dark font-bold' // White text
					/>
					{/* Pay Later Card */}
					<PaymentOptionCard
						title='Pay Later'
						description='Choose this option to pay when you receive your order. Perfect if you prefer cash on pickup or delivery.'
						buttonText='Select Pay Later'
						onClick={onPayLater}
						cardBgClass='bg-light scale-90 border border-primary/20' // Light background
						buttonBgClass=' border border-primary/30 text-black' // Gray button
						textColorClass='text-gray-800' // Dark text
					/>
				</div>

				{/* Back Button */}
				<div className='mt-12 text-center'>
					<button
						className='px-4 py-2 rounded-sm border border-dark/60'
						onClick={onBack}
					>
						Back
					</button>
				</div>
			</AnimateUp>
		</div>
	);
}

function PaymentOptionCard({
	title,
	description,
	buttonText,
	onClick,
	cardBgClass,
	buttonBgClass,
	textColorClass,
}) {
	return (
		<div
			className={`  rounded-lg  p-4 flex flex-col justify-between ${cardBgClass}`}
		>
			<div>
				<h4 className={`text-xl font-bold mb-2 ${textColorClass}`}>{title}</h4>
				<p className={` ${textColorClass}`}>{description}</p>
			</div>
			<button
				className={`mt-4 px-4 py-2 rounded hover:opacity-90 ${buttonBgClass} ${textColorClass}`}
				onClick={onClick}
			>
				{buttonText}
			</button>
		</div>
	);
}
