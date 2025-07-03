'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CartItem } from '../cart/CartModal';
import useCartStore from '@/lib/useCartStore';
import { AnimatePresence, motion } from 'framer-motion';

const OrderSummary = ({ cart, total, selectedMethod, deliveryFee }) => {
	const [open, setOpen] = useState(false);
	const cartTotalPrice = useCartStore((state) => state.cartTotalPrice);
	

	const itemCount = cart.length;
	const subtotal = cartTotalPrice(); // base total without delivery
	const showDelivery = selectedMethod === 'delivery';

	return (
		<section className='space-y-4'>
			<div className='py-8 bg-primary/10 text-dark text-center space-y-1'>
				<p>Checkout</p>
				<h1 className='text-2xl lg:text-4xl font-bold pb-4'>
					Review Your Sweets Order
				</h1>

				{/* Items count + subtotal */}
				{itemCount > 0 && (
					<div className='text-lg font-semibold space-y-1'>
						<div>
							{itemCount} {itemCount === 1 ? 'Item' : 'Items'} – ${subtotal.toFixed(2)}
						</div>

						{/* Optional Delivery Fee */}
						{showDelivery && (
							<div className=' font-bold text-dark/80'>
								+ ${deliveryFee} Delivery Fee
							</div>
						)}

						{/* Final Total */}
						<div className='pt-2 font-bold text-xl'>
							Total: ${total.toFixed(2)}
						</div>
					</div>
				)}

				{/* Toggle button */}
				{itemCount > 0 && (
					<div className='grid place-items-center mt-4'>
						<button
							type='button'
							onClick={() => setOpen(!open)}
							className='flex items-center gap-2 text-dark text-lg font-bold hover:text-dark/80 transition uppercase'
						>
							{open ? (
								<>
									Hide Sweets <FaChevronUp className='text-sm' />
								</>
							) : (
								<>
									View Selected Sweets <FaChevronDown className='text-sm' />
								</>
							)}
						</button>
					</div>
				)}
			</div>

			{/* Cart Items with Animation */}
			<div className='max-w-3xl mx-auto px-2'>
				<AnimatePresence initial={false}>
					{open && itemCount > 0 && (
						<motion.div
							key='cart-items'
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.4, ease: 'easeInOut' }}
							className='overflow-hidden py-8'
						>
							<div className='space-y-4 pt-4'>
								{cart.map((item) => (
									<CartItem key={item.cartItemId} item={item} />
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* If cart is empty */}
			{itemCount === 0 && (
				<p className='text-center text-dark/60 text-lg'>Your cart is empty.</p>
			)}
		</section>
	);
};

export default OrderSummary;
