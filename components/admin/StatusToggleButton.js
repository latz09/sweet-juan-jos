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
			className='mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
		>
			{status === 'active' ? 'Archive' : 'Activate'}
		</button>
	);
};

export default StatusToggleButton;
