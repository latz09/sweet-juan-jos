const DateTimeDisplay = ({ pickupSlots = [], deliverySlots = [] }) => {
	const getOrdinalSuffix = (day) => {
		if (day > 3 && day < 21) return 'th';
		switch (day % 10) {
			case 1: return 'st';
			case 2: return 'nd';
			case 3: return 'rd';
			default: return 'th';
		}
	};

	const formatDateWithOrdinal = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		const day = date.getUTCDate();
		const month = date.toLocaleDateString('en-US', {
			month: 'long',
			timeZone: 'America/Chicago',
		});
		return `${month} ${day}${getOrdinalSuffix(day)}`;
	};

	const formatTimeSlots = (slots) => {
		if (!slots || slots.length === 0) return '';
		return slots.map((slot) => slot.timeSlot).join(' or ');
	};

	const hasPickup = pickupSlots?.length > 0;
	const hasDelivery = deliverySlots?.length > 0;

	if (!hasPickup && !hasDelivery) return null;

	return (
		<div className=" space-y-6">
			{/* Pickup Section */}
			{hasPickup && (
				<div>
					<h3 className="text-primary font-bold text-lg lg:text-xl uppercase tracking-wide mb-2">
						Pickup
					</h3>
					<ul className="space-y-1">
						{pickupSlots.map((slot, index) => (
							<li key={index} className="text-lg lg:text-xl font-medium">
								{formatDateWithOrdinal(slot.date)}{' '}
								{slot.timeSlots?.length > 0 && (
									<span className="text-dark">
										• {formatTimeSlots(slot.timeSlots)}
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Delivery Section */}
			{hasDelivery && (
				<div>
					<h3 className="text-primary font-bold text-lg lg:text-xl uppercase tracking-wide mb-2">
						Delivery
					</h3>
					<ul className="space-y-1">
						{deliverySlots.map((slot, index) => (
							<li key={index} className="text-lg lg:text-xl font-medium">
								{formatDateWithOrdinal(slot.date)}{' '}
								{slot.timeSlots?.length > 0 && (
									<span className="text-dark">
										• {formatTimeSlots(slot.timeSlots)}
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DateTimeDisplay;
