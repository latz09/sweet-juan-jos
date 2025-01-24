const TimeLine = ({ data }) => {
	if (!data || !data.endDate) return null; // Handle missing data

	// Parse the endDate
	const endDate = new Date(data.endDate);

	// Format the date and time
	const formattedDate = endDate.toLocaleDateString('en-US', {
		month: 'long', // Full month name
		day: 'numeric', // Day of the month
	});

	const formattedTime = endDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true, // Use 12-hour clock format
	});

	return (
		<div className='text-center  text-light text-2xl  mt-8'>
			{`Order's Due by `}
			<span className='font-bold  underline underline-offset-4 decoration-primary/30 '>{formattedTime}</span> on{' '}
			<span className='font-bold  '>{formattedDate}!</span>
			
		</div>
	);
};

export default TimeLine;
