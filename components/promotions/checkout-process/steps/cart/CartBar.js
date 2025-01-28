// components/CartBar.jsx
'use client';

import { useState, useEffect } from 'react';
import { useCart } from './CartContext'; // Adjust path as needed
import OrderModal from '@/components/promotions/modal-components/OrderModal';

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

  // Open the multi-step OrderModal
  function handleOpenCart() {
    setCartOpen(true);
  }

  function handleCloseModal() {
    setCartOpen(false);
  }

  return (
    <>
      {/* Conditionally render the cart bar if there are items */}
      {cart.length > 0 && (
        <div className='fixed bottom-0 left-0 right-0 bg-dark text-light p-4 flex justify-center gap-8 items-center z-50 shadow-lg'>
          <p>
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart — Total: $
            {cartTotal.toFixed(2)}
          </p>
          <button
            className='bg-primary text-light font-bold px-4 py-2 rounded-sm shadow-lg shadow-primary/30'
            onClick={handleOpenCart}
          >
            Place Order
          </button>
        </div>
      )}

      {/* Render OrderModal regardless of cart state */}
      {cartOpen && (
        <OrderModal
          onClose={handleCloseModal}
          deliveryDetails={deliveryDetails}
          pickupDetails={pickupDetails}
          giftOption={giftOption}
          autoResponseEmailData={autoResponseEmailData}
        />
      )}
    </>
  );
}
