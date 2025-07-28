'use client';

import { useEffect } from 'react';
import useCartStore from '@/lib/useCartStore';

const OrderSuccessPage = () => {
	const clearCart = useCartStore((state) => state.clearCart);

	// Clear cart when page loads
	useEffect(() => {
		clearCart();
	}, [clearCart]);

	return (
		<div className='h-[70vh] grid place-items-center'>
			<div className='text-center space-y-4 px-4'>
				<p className='text-4xl text-primary font-bold uppercase tracking-wider'>
					Order Success!
				</p>
				<div className='space-y-2'>
					<p className='text-xl text-gray-600'>{`Thank you for your order.`}</p>
					<p className='text-xl text-gray-600'>{`We Cant Wait to Bake for You `}</p>
				</div>
			</div>
		</div>
	);
};

export default OrderSuccessPage;
