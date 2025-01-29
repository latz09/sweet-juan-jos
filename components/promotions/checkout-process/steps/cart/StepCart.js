'use client';

import Image from 'next/image';
import { motion as m } from 'framer-motion';

const StepCart = ({
	cart,
	cartTotal,
	removeFromCart,
	onNext,
    onClose,

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
							<m.li
								key={item.id}
								className={`grid py-6 shadow-md rounded-sm ${
									index % 2 === 0
										? 'bg-primary/10 shadow-primary/10'
										: 'bg-dark/10 shadow-dark/10'
								} `}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration:  0.26, delay: index * 0.25 }}
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
							</m.li>
						))}
					</ul>

					{/* Cart Total and Order Button */}
					<div className='mt-12 md:mt-16 w-full flex flex-col items-center gap-4 px-4'>
						<p className='font-bold text-xl text-center'>
							Total: ${cartTotal.toFixed(2)}
						</p>
						<div className="grid gap-4 md:flex md:items-center md:gap-8">
							<button
								className='bg-primary font-bold text-xl text-light px-6 py-3 rounded-lg hover:bg-primary/70 hover:scale-95  transition duration-500'
								onClick={onNext}
							>
								Place Your Order
							</button>
							<button
								className='border border-primary/50 font-bold text-xl text-primary px-6 py-3 rounded-lg hover:bg-primary/5 hover:scale-95 hover:border-primary/0 transition duration-500'
								onClick={onClose}
							>
								Add More Items
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default StepCart;
