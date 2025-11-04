'use client';

function formatDateLabel(dateStr) {
  // Expecting 'YYYY-MM-DD'
  // Parse as local date to avoid timezone shifts
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day); // month is 0-indexed
  if (isNaN(d)) return dateStr; // fallback
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function normalizeTimes(arr = []) {
  // Supports [{ timeSlot: '11am-1pm' }] or ['11am-1pm']
  return arr.map(ts => (typeof ts === 'string' ? ts : ts?.timeSlot)).filter(Boolean);
}

function SlotGroup({ title, slots }) {
  if (!slots?.length) return null;

  // sort by date asc
  const sorted = [...slots].sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <div className='space-y-2'>
      <p className='font-semibold text-base lg:text-lg'>{title}</p>
      <div className='space-y-2'>
        {sorted.map(({ date, timeSlots }, idx) => {
          const times = normalizeTimes(timeSlots);
          if (!times.length) return null;
          return (
            <div key={`${title}-${date}-${idx}`} className='flex flex-wrap items-baseline gap-2'>
              <span className='text-lg lg:text-xl font-medium'>
                {formatDateLabel(date)}:
              </span>
              <span className='text-lg lg:text-xl'>
                {times.join(', ')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AvailabilityInfo({
  pickupSlots = [],
  deliverySlots = [],
  deliveryFee,
}) {
  const hasPickup = Array.isArray(pickupSlots) && pickupSlots.length > 0;
  const hasDelivery = Array.isArray(deliverySlots) && deliverySlots.length > 0;

  if (!hasPickup && !hasDelivery) return null;

  let availabilityLabel = '';
  if (hasPickup && hasDelivery) {
    availabilityLabel = 'Available for delivery and pickup.';
  } else if (hasPickup) {
    availabilityLabel = 'Available for pickup.';
  } else {
    availabilityLabel = 'Available for delivery.';
  }

  const feeNum = typeof deliveryFee === 'number' ? deliveryFee : parseFloat(deliveryFee);
  const showFee = hasDelivery && !Number.isNaN(feeNum);
  const deliveryFeeText =
    showFee && feeNum > 0
      ? ` Delivery fee: $${feeNum.toFixed(2)}`
      : showFee && feeNum === 0
      ? ' Free delivery this week!'
      : '';

  return (
    <div className='w-full mt-8 lg:mt-4 '>
      {/* Banner */}
      <p className='font-bold  text-xl lg:text-2xl'>
        {availabilityLabel}
        {deliveryFeeText && (
          <span className='block text-lg lg:text-xl mt-1'>
            {deliveryFeeText}
          </span>
        )}
      </p>

      {/* Dates & Times */}
      <div className='mt-4 lg:mt-6 grid grid-cols-1 gap-4 lg:gap-6'>
        {hasPickup && (
          <div className=''>
            <SlotGroup title='Pickup' slots={pickupSlots} />
          </div>
        )}
        {hasDelivery && (
          <div className=''>
            <SlotGroup title='Delivery' slots={deliverySlots} />
          </div>
        )}
      </div>
    </div>
  );
}