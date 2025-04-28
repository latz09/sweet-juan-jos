'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { CartItem } from '../cart/CartModal'; // Reusing your existing cart item layout
import useCartStore from '@/lib/useCartStore';
import { AnimatePresence, motion } from 'framer-motion'; // 👈 Add this

const OrderSummary = ({ cart }) => {
  const [open, setOpen] = useState(false);
  const cartTotalPrice = useCartStore((state) => state.cartTotalPrice);

  const itemCount = cart.length;
  const totalPrice = cartTotalPrice();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl lg:text-4xl font-bold">Review Your Sweets Order</h1>

      {/* Items count + total price */}
      {itemCount > 0 && (
        <div className="text-dark/80 text-lg font-semibold">
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'} - ${totalPrice.toFixed(2)}
        </div>
      )}

      {/* Toggle button */}
      {itemCount > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-primary hover:text-dark transition font-bold"
          >
            {open ? (
              <>
                Hide Sweets <FaChevronUp className="text-sm" />
              </>
            ) : (
              <>
                View Sweets <FaChevronDown className="text-sm" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Cart Items with Animation */}
      <AnimatePresence initial={false}>
        {open && itemCount > 0 && (
          <motion.div
            key="cart-items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-4">
              {cart.map((item) => (
                <CartItem key={item.cartItemId} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* If cart empty */}
      {itemCount === 0 && (
        <p className="text-center text-dark/60 text-lg">Your cart is empty.</p>
      )}
    </section>
  );
};

export default OrderSummary;
