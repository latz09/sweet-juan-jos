const Availability = ({ delivery, pickup }) => {
	let message = '';

	if (delivery?.enabled && pickup?.enabled) {
		message = 'Available for Pickup and Delivery';
	} else if (delivery?.enabled) {
		message = 'Available for Delivery';
	} else if (pickup?.enabled) {
		message = 'Available for Pickup';
	} else {
		message = 'Not Available';
	}

	return (
		<section className='my-6 text-center'>
			<h2 className='text-xl font-semibold text-light'>{message}</h2>
		</section>
	);
};

export default Availability;
