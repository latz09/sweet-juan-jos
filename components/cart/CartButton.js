'use client';

import { FaGift } from 'react-icons/fa6';
import useCartStore from '@/lib/useCartStore';
import { useState } from 'react';
import CartModal from './CartModal';
import { usePathname } from 'next/navigation';

const CartButton = () => {
	const cart = useCartStore((state) => state.cart);
	const cartCount = cart.length;
	const cartTotal = useCartStore((state) => state.cartTotalPrice());
	const formattedTotal = `$${cartTotal.toFixed(2)}`;

	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// Don't show popup on certain pages
	if (
		pathname === '/' ||
		pathname === '/online-ordering/cart' ||
		pathname.startsWith('/promotions')
	) {
		return null;
	}

	return (
		<>
			{cartCount > 0 && (
				<>
					<button
						onClick={() => setOpen(true)}
						className='fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/30 hover:shadow-none hover:bg-dark transition duration-500 z-[50] flex items-center justify-center group'
					>
						<FaGift className='text-light text-2xl' />
						<div className='absolute -top-2 -right-2 bg-dark text-light rounded-full size-6 flex items-center justify-center font-bold group-hover:animate-bounce group-hover:bg-primary transition duration-500'>
							{cartCount}
						</div>
					</button>

					{/* 💵 Floating total below button */}
					<div className='fixed bottom-[86px] right-6 z-[50] text-s font-bold  text-dark rounded-full px-3 py-1 '>
						{formattedTotal}
					</div>
				</>
			)}

			{open && <CartModal setOpen={setOpen} />}
		</>
	);
};

export default CartButton;
