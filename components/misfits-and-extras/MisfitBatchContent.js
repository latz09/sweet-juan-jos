import MisfitPricingOptions from './MisfitPricingOptions';

const MisfitBatchContent = ({ batch, remaining, isSoldOut }) => {
	return (
		<div className="flex-1 p-6 flex flex-col justify-between">
			<div>
				{/* Title */}
				<div className="mb-4">
					<h3 className="text-2xl font-bold text-dark mb-2">
						{batch.title}
					</h3>
					<p className="text-primary font-semibold text-xl">
						{batch.itemTitle}
					</p>
				</div>

				{/* Description */}
				{batch.description && (
					<p className="text-gray-600 text-base mb-6 leading-relaxed">
						{batch.description}
					</p>
				)}

				{/* Quantity Info */}
				<div className="mb-6">
					<div className="text-base text-gray-600 mb-4">
						<span className="font-semibold text-lg">{remaining}</span> of{' '}
						<span className="font-semibold text-lg">{batch.totalQuantity}</span> available
					</div>
				</div>
			</div>

			{/* Pricing Options */}
			<MisfitPricingOptions 
				batch={batch} 
				remaining={remaining} 
				isSoldOut={isSoldOut} 
			/>
		</div>
	);
};

export default MisfitBatchContent;