'use client';


import useCartStore from '@/lib/useCartStore';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';

const CartModal = ({ setOpen }) => {
	const cart = useCartStore((state) => state.cart);
	const cartTotalPrice = useCartStore((state) => state.cartTotalPrice);
	const clearCart = useCartStore((state) => state.clearCart);
	const router = useRouter();

	const goToCheckout = () => {
		setOpen(false);
		router.push('/online-ordering/cart');
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='fixed inset-0 bg-dark/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4'
			>
				<div className='bg-light rounded-lg max-w-2xl w-full p-6 space-y-6 relative overflow-y-auto max-h-[80vh]'>
					<div className='flex justify-between items-start mb-6'>
						<div>
							<h2 className='text-2xl lg:text-4xl font-bold'>
								Selected Sweets
							</h2>
						</div>
						<div className='flex flex-col items-end space-y-2'>
							{cart.length > 0 && (
								<button
									onClick={clearCart}
									className='text-sm font-bold text-primary hover:text-dark underline'
								>
									Clear Cart
								</button>
							)}
							<button
								onClick={() => setOpen(false)}
								className='text-dark text-2xl leading-none'
							>
								&times;
							</button>
						</div>
					</div>

					{cart.length === 0 ? (
						<p className='text-center text-dark/60 text-lg'>
							Your cart is empty.
						</p>
					) : (
						<div className='space-y-6'>
							{cart.map((item) => (
								<CartItem key={item.cartItemId} item={item} />
							))}
						</div>
					)}

					{/* Sticky Footer */}
					<div className='sticky bottom-0 bg-light pt-4 space-y-4'>
						<div className='flex justify-between font-bold text-xl'>
							<span>Total:</span>
							<span>${cartTotalPrice().toFixed(2)}</span>
						</div>

						<button
							onClick={goToCheckout}
							className='w-full py-3 rounded bg-primary text-light font-black text-xl hover:bg-dark transition'
						>
							Checkout
						</button>

						<button
							onClick={() => setOpen(false)}
							className='w-full py-2 rounded border border-dark text-dark font-bold hover:bg-dark hover:text-light transition'
						>
							Close
						</button>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default CartModal;

//
// Small Subcomponents inside same file
//

export const CartItem = ({ item }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="flex items-center justify-between gap-4 border-b border-primary/30 pb-4">
      {/* Thumbnail Image */}
      <CartItemImage src={item.imageUrl} />

      {/* Item Details */}
      <div className="flex-1">
        <div className="font-bold text-dark">{item.name}</div>
        <div className="text-sm text-dark/70">
          {item.quantityLabel}
          {item.flavor && ` • ${item.flavor}`}
          {item.frosting && ` • ${item.frosting}`}
        </div>
      </div>

      {/* Price + Remove */}
      <div className="flex items-center gap-2">
        <div className="font-bold text-dark whitespace-nowrap">
          ${item.totalPrice.toFixed(2)}
        </div>
        <button
          onClick={() => removeFromCart(item.cartItemId)}
          className="text-primary hover:text-dark transition"
          aria-label="Remove item"
        >
          <FaTrashAlt className="text-sm" />
        </button>
      </div>
    </div>
  );
};

const CartItemImage = ({ src }) => {
  return (
    <div className="size-16 overflow-hidden  bg-primary/10 rounded-sm  flex items-center justify-center relative">
      {src ? (
        <Image
          src={src}
          alt="Product thumbnail"
          fill
          className="object-contain"
          sizes="64px"
          priority={false}
        />
      ) : (
        <div className="text-dark/50 text-xs">No Image</div>
      )}
    </div>
  );
};