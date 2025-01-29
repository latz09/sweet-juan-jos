'use client';

import { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Adjust path as needed
import OrderModal from '@/components/promotions/modal-components/OrderModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartBar({
	deliveryDetails,
	pickupDetails,
	giftOption,
	autoResponseEmailData,
}) {
	const { cart, cartTotal } = useCart();
	const [cartOpen, setCartOpen] = useState(false);
	const [itemCount, setItemCount] = useState(0);

	// Calculate total items whenever cart updates
	useEffect(() => {
		const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
		setItemCount(totalItems);
	}, [cart]);

	// Prevent background scrolling when cart is open
	useEffect(() => {
		if (cartOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
		return () => document.body.classList.remove('overflow-hidden');
	}, [cartOpen]);

	function handleOpenCart() {
		setCartOpen(true);
	}

	function handleCloseModal() {
		setCartOpen(false);
	}

	return (
		<>
			{/* Cart Bar Animation */}
			<AnimatePresence>
				{cart.length > 0 && (
					<motion.div
						key='cart-bar'
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 100, damping: 27 }}
						className='fixed bottom-0 left-0 right-0 bg-dark text-light p-4 flex justify-center gap-8 items-center z-50 shadow-lg border-t-2 border-primary cursor-pointer'
            onClick={handleOpenCart}
					>
						<p className="text-base md:text-lg font-bold tracking-wider">
							{itemCount} {itemCount === 1 ? 'item' : 'items'} in cart — Total:
							${cartTotal.toFixed(2)}
						</p>
						<button
							className='bg-primary text-light font-bold px-4 py-2 rounded-sm shadow-lg shadow-primary/30'
							
						>
							Place Order
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Order Modal with slide-in effect */}
			<AnimatePresence>
				{cartOpen && (
					<OrderModal
						key='order-modal'
						onClose={handleCloseModal}
						deliveryDetails={deliveryDetails}
						pickupDetails={pickupDetails}
						giftOption={giftOption}
						autoResponseEmailData={autoResponseEmailData}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
