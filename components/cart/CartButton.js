'use client';

import { FaGift } from 'react-icons/fa6';
import useCartStore from '@/lib/useCartStore';
import { useState } from 'react';
import CartModal from './CartModal';
import { usePathname } from 'next/navigation'; // 👈 Add this

const CartButton = () => {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.length;
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // 👈 Get current path

  // Don't show cart button on the /online-ordering/cart page
  if (pathname === '/online-ordering/cart') {
    return null;
  }

  return (
    <>
      {cartCount > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/30 hover:shadow-none hover:bg-dark transition duration-500 z-[50] flex items-center justify-center group"
        >
          <FaGift className="text-light text-2xl" />
          <div className="absolute -top-2 -right-2 bg-dark text-light rounded-full size-6 flex items-center justify-center font-bold group-hover:animate-bounce group-hover:bg-primary transition duration-500">
            {cartCount}
          </div>
        </button>
      )}

      {open && <CartModal setOpen={setOpen} />}
    </>
  );
};

export default CartButton;
