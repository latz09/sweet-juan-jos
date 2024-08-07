'use client';

import { useState } from 'react';

const StatusToggleButton = ({ id, currentStatus, onStatusChange }) => {
	const [status, setStatus] = useState(currentStatus);

	const toggleStatus = async () => {
		const newStatus = status === 'active' ? 'archived' : 'active';
		console.log('Toggling status to:', newStatus);

		// Optimistically update the UI
		setStatus(newStatus);
		onStatusChange(newStatus);

		try {
			const response = await fetch('/api/toggleStatus', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id, newStatus }),
			});

			if (!response.ok) {
				// If the API call fails, revert the UI change
				setStatus(status);
				onStatusChange(status);
				console.error('Failed to update status');
			} else {
				// If the API call succeeds, reload the page
				window.location.reload();
			}
		} catch (error) {
			// If the API call fails, revert the UI change
			setStatus(status);
			onStatusChange(status);
			console.error('Failed to update status:', error);
		}
	};

	return (
		<button
			onClick={toggleStatus}
			className='mt-4 border w-5/6 lg:w-1/2 p-2 bg-dark text-light font-semibold text-xl rounded hover:bg-blue-700 transition'
		>
			{status === 'active' ? 'Send to Archive' : 'Activate'}
		</button>
	);
};

export default StatusToggleButton;
