'use client';

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

  return (
    <section>
      <button
        type="button"
        disabled={!isFormValid}
        className="w-full p-4 text-xl font-bold rounded bg-primary text-light hover:bg-dark transition"
      >
        Confirm Order
      </button>
    </section>
  );
};

export default ConfirmOrderButton;
