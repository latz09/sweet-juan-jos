import AnimateUp from '@/components/utils/animations/AnimateUp';

export default function StepPaymentChoice({ enablePayNow, enablePayLater, onPayNow, onPayLater, onBack }) {
	const allPaymentOptions = [
		{
			id: 'payNow',
			title: 'Pay Now',
			description:
				'Pay securely online with Square to confirm your order. We accept all major credit cards.',
			buttonText: 'Select Pay Now',
			className:
				'bg-white shadow-md shadow-primary/30 rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-primary/60',
			buttonClass:
				'mt-6 px-5 py-2 rounded-md bg-primary text-light font-bold hover:bg-primary-dark text-lg transition-colors duration-300',
			onClick: onPayNow,
			enabled: enablePayNow,
		},
		{
			id: 'payLater',
			title: 'Pay Later',
			description:
				'Choose this option to pay upon delivery or pickup. We accept payments via Venmo, Zelle, cash, or check.',
			buttonText: 'Select Pay Later',
			className:
				'bg-white shadow-sm rounded-lg p-6 flex flex-col justify-between hover:shadow-none transition-shadow duration-300 cursor-pointer border border-primary/10 scale-95',
			buttonClass:
				'mt-6 px-5 py-2 rounded-md bg-secondary text-dark border border-primary/40 font-bold text-lg',
			onClick: onPayLater,
			enabled: enablePayLater,
		},
	];

	// Filter to only show enabled payment options
	const paymentOptions = allPaymentOptions.filter(option => option.enabled);

	// Handle edge case: if no payment options are enabled
	if (paymentOptions.length === 0) {
		return (
			<div className='mx-auto py-8 text-center'>
				<AnimateUp>
					<h3 className='mb-8 text-2xl font-bold text-red-600'>
						Payment Options Unavailable
					</h3>
					<p className='text-lg mb-6'>
						No payment methods are currently available for this promotion. Please contact support.
					</p>
					<button
						className='px-6 py-2 rounded-md border border-dark/40 font-bold'
						onClick={onBack}
					>
						Back
					</button>
				</AnimateUp>
			</div>
		);
	}

	// Determine grid layout based on number of options
	const gridClass = paymentOptions.length === 1 
		? 'grid grid-cols-1 max-w-md mx-auto' 
		: 'grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6';

	return (
		<div className='mx-auto py-8'>
			<AnimateUp>
				<h3 className='mb-8 text-2xl font-bold text-center'>
					{paymentOptions.length === 1 ? 'Payment Method' : 'How would you like to pay?'}
				</h3>

				{/* Cards for Payment Options */}
				<div className={gridClass}>
					{paymentOptions.map((option) => (
						<PaymentOptionCard key={option.id} {...option} />
					))}
				</div>

				{/* Back Button */}
				<div className='mt-12 text-center'>
					<button
						className='px-6 py-2 rounded-md border border-dark/40 font-bold'
						onClick={onBack}
					>
						Back
					</button>
				</div>
			</AnimateUp>
		</div>
	);
}

// Extracted Payment Card Component
function PaymentOptionCard({
	title,
	description,
	buttonText,
	className,
	buttonClass,
	onClick,
}) {
	return (
		<div className={className} onClick={onClick}>
			<div>
				<h4 className='text-3xl font-bold mb-3'>{title}</h4>
				<p className='text-lg font-bold'>{description}</p>
			</div>
			<button className={buttonClass}>{buttonText}</button>
		</div>
	);
}