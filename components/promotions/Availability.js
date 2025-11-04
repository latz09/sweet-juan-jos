const Availability = ({ pickupSlots = [], deliverySlots = [] }) => {
  const hasPickup = Array.isArray(pickupSlots) && pickupSlots.length > 0;
  const hasDelivery = Array.isArray(deliverySlots) && deliverySlots.length > 0;

  let message = '';
  if (hasPickup && hasDelivery) {
    message = 'Available for Pickup and Delivery';
  } else if (hasPickup) {
    message = 'Available for Pickup';
  } else if (hasDelivery) {
    message = 'Available for Delivery';
  } else {
    return null; // neither available — don't render
  }

  return (
    <div className=' lg:mt-6'>
      <div className='inline-block'>
        <p className='text-dark text-lg lg:text-xl font-semibold tracking-wide'>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Availability;