const TimeLine = ({ data }) => {
	// Check for missing data
	if (!data || !data.endDate) return null;

	// Parse the endDate
	const endDate = new Date(data.endDate);

	// Helper function to determine the ordinal suffix
	const getOrdinalSuffix = (day) => {
		if (day > 3 && day < 21) return 'th'; // Covers 11th-19th
		switch (day % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};

	// Extract day of the month
	const day = endDate.getUTCDate();
	const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

	// Format the date and time for Central Time
	const formattedDate = endDate.toLocaleDateString('en-US', {
		month: 'long', // Full month name
		day: 'numeric', // Day of the month
		timeZone: 'America/Chicago', // Central Time Zone
	});

	const formattedTime = endDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true, // Use 12-hour clock format
		timeZone: 'America/Chicago', // Central Time Zone
	});

	return (
		<div className=''>
			<div className='inline-block  rounded backdrop-blur-sm'>
				<p className='text-dark text-xl lg:text-2xl font-bold'>
					<span className='text-dark'>Orders Due by </span>
					<span className='font-bold underline decoration-primary underline-offset-4 decoration-[1.5px]'>{formattedTime}</span>
					<span className='text-dark'> on </span>
					<span className='font-bold underline decoration-primary underline-offset-4 decoration-[1.5px]'>
						{formattedDate.replace(day, dayWithSuffix)}
					</span>
					<span className='font-bold underline decoration-primary underline-offset-4 decoration-[1.5px]'>!</span>
				</p>
			</div>
		</div>
	);
};

export default TimeLine;