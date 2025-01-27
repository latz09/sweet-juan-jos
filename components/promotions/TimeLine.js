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
		<div className='text-center text-light text-2xl mt-8'>
			{`Orders Due by `}
			<span className='font-bold underline underline-offset-4 decoration-primary/30'>
				{formattedTime}
			</span>{' '}
			on{' '}
			<span className='font-bold'>
				{formattedDate.replace(day, dayWithSuffix)}!
			</span>
		</div>
	);
};

export default TimeLine;
