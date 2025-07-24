const MisfitPricingOptions = ({ batch, remaining, isSoldOut }) => {
	const { quantityOptions, buyAllOption, totalQuantity } = batch;

	// Filter options that are still available
	const availableOptions = quantityOptions?.filter(option => 
		option.quantity <= remaining
	) || [];

	// Check if buy all is available
	const buyAllAvailable = buyAllOption?.enabled && 
		buyAllOption.totalPrice && 
		remaining === totalQuantity;

	if (isSoldOut) {
		return (
			<div className="text-center py-4">
				<span className="text-xl font-bold text-gray-500">Sold Out</span>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<h4 className="text-lg font-bold text-dark mb-3">Pricing Options:</h4>
			
			{/* Regular quantity options */}
			{availableOptions.map((option, index) => {
				const pricePerItem = option.totalPrice / option.quantity;
				return (
					<button
						key={index}
						className="w-full p-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 text-left"
					>
						<div className="flex justify-between items-center">
							<span className="font-semibold text-lg">
								Grab {option.quantity} for ${option.totalPrice}
							</span>
							<span className="text-sm">
								(${pricePerItem.toFixed(2)} each)
							</span>
						</div>
					</button>
				);
			})}

			{/* Buy all option */}
			{buyAllAvailable && (
				<button className="w-full p-4 border-2 border-green-500 bg-green-50 rounded-lg hover:bg-green-500 hover:text-white transition-colors duration-200 text-left">
					<div className="flex justify-between items-center">
						<span className="font-bold text-lg">
							Buy all {totalQuantity} for ${buyAllOption.totalPrice}! 
							<span className="text-sm ml-2">(Best Deal!)</span>
						</span>
						<span className="text-sm">
							(${(buyAllOption.totalPrice / totalQuantity).toFixed(2)} each)
						</span>
					</div>
				</button>
			)}

			{availableOptions.length === 0 && !buyAllAvailable && (
				<div className="text-center py-4">
					<span className="text-lg text-gray-500">No options available for remaining quantity</span>
				</div>
			)}
		</div>
	);
};

export default MisfitPricingOptions;