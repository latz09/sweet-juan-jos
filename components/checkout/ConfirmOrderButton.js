'use client';

import useCartStore from '@/lib/useCartStore';
import { DELIVERY_FEE } from '@/lib/constants';

const ConfirmOrderButton = ({
  cart,
  selectedMethod,
  contactInfo,
  deliveryAddress,
  zipValid,
  settings
}) => {
  const isFormValid =
    cart.length > 0 &&
    selectedMethod &&
    contactInfo.name &&
    contactInfo.phone &&
    contactInfo.email &&
    (selectedMethod !== 'delivery' || zipValid);

  const cartTotal = useCartStore((state) => state.cartTotalPrice());
  const showDelivery = selectedMethod === 'delivery';
  const finalTotal = showDelivery ? cartTotal + DELIVERY_FEE : cartTotal;

  return (
    <section className="space-y-2">
      <button
        type="button"
        disabled={!isFormValid}
        className="w-full p-4 text-xl font-bold rounded bg-primary text-light hover:bg-dark transition disabled:opacity-50"
      >
        Confirm Order
      </button>

      <div className="text-center text-dark text-lg font-semibold">
        Total: ${finalTotal.toFixed(2)}
        {showDelivery && (
          <span className="block  text-dark/80 font-bold">
            (includes ${DELIVERY_FEE.toFixed(2)} delivery fee)
          </span>
        )}
      </div>
    </section>
  );
};

export default ConfirmOrderButton;
