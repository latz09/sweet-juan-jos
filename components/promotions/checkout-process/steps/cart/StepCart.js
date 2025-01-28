'use client';

import Image from 'next/image';

const StepCart = ({
	cart,
	cartTotal,
	removeFromCart,
	onNext,
    
	updateCartItemQuantity,
}) => {
	
	return (
		<div className=' text-dark p-4 w-full max-w-3xl mx-auto'>
			{cart.length === 0 ? (
				<p className='text-dark/60'>Your cart is empty.</p>
			) : (
				<>
					<ul className='grid divide-y divide-primary/50   w-full  '>
						{cart.map((item, index) => (
							<li
								key={item.id}
								className={`grid py-6 shadow-md rounded-sm ${
									index % 2 === 0
										? 'bg-primary/10 shadow-primary/10'
										: 'bg-dark/10 shadow-dark/10'
								} `}
							>
								<div className='py-4 grid  md:grid-cols-4   items-center relative p-4'>
									{/* Item Image */}
									<div className='md:col-span-3 flex items-center gap-6'>
										<Image
											src={item.itemImageUrl}
											alt={item.name}
											width={60}
											height={60}
											className='rounded-md '
										/>

										{/* Item Details */}
										<div className='flex-1 '>
											<p className='font-bold text-lg'>{item.name}</p>

											<p className='font-bold '>{`(${item.itemSubtitle})`}</p>

											<p className='text-gray-700 mt-2'>
												${item.price.toFixed(2)} x {item.quantity}
											</p>
										</div>
									</div>

									{/* Quantity Controls */}
									<div className='md:col-span-1 flex items-center justify-between mt-8 md:mt-0 '>
										<button
											className={`${item.quantity === 1 ? 'block' : 'opacity-0'} text-primary font-bold  py-1  px-4 rounded-full bg-light border border-primary/40 shadow  `}
											onClick={() => {
												if (item.quantity === 1) {
													removeFromCart(item.id);
												}
											}}
											disabled={item.quantity !== 1}
										>
											Remove
										</button>
										<div className='flex items-center gap-2 '>
											<button
												className='text-lg font-bold px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
												onClick={() =>
													updateCartItemQuantity(
														item.id,
														Math.max(item.quantity - 1, 1)
													)
												}
											>
												-
											</button>
											<span className='font-bold text-lg'>{item.quantity}</span>

											<button
												className='text-lg font-bold px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
												onClick={() =>
													updateCartItemQuantity(item.id, item.quantity + 1)
												}
											>
												+
											</button>
										</div>
									</div>
								</div>

								{/* Remove Button */}
							</li>
						))}
					</ul>

					{/* Cart Total and Order Button */}
					<div className='mt-12 md:mt-16 w-full flex flex-col items-center gap-4 px-4'>
						<p className='font-bold text-xl text-center'>
							Total: ${cartTotal.toFixed(2)}
						</p>
						<button
							className='bg-primary font-bold text-xl text-light px-6 py-3 rounded-lg hover:bg-primary/90 transition'
							onClick={onNext}
						>
							Place Your Order
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default StepCart;
