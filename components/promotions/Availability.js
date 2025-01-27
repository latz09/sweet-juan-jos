const Availability = ({ delivery, pickup }) => {
	// Determine the availability message
	let message = '';

	if (delivery && pickup) {
		message = 'Available for Pickup and Delivery';
	} else if (delivery) {
		message = 'Available for Delivery';
	} else if (pickup) {
		message = 'Available for Pickup';
	} else {
		message = '';
	}

	return (
		<section className='my-6 text-center'>
			<h2 className='text-xl lg:text-2xl font-semibold text-light'>{message}!</h2>
		</section>
	);
};

export default Availability;
