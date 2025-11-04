'use client';

import { useState, useEffect } from 'react';
import useCartStore from '@/lib/useCartStore';

const ConfirmOrderButton = ({
	cart,
	selectedMethod,
	contactInfo,
	deliveryAddress,
	zipValid,
	giftInfo = {},
	settings,
	deliveryFee = 5.0,
	selectedDate = '', // NEW
	selectedTimeSlot = '', // NEW
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [isHydrated, setIsHydrated] = useState(false);

	// Prevent hydration mismatch by waiting for client-side hydration
	useEffect(() => {
		setIsHydrated(true);
	}, []);

	// Updated validation to include date/time
	const isFormValid =
		cart.length > 0 && 
		selectedMethod &&
		contactInfo.name &&
		contactInfo.phone &&
		contactInfo.email &&
		selectedDate && // NEW: Date is required
		selectedTimeSlot && // NEW: Time slot is required
		(selectedMethod !== 'delivery' || zipValid);

	const cartTotal = useCartStore((state) => state.cartTotalPrice());
	const showDelivery = selectedMethod === 'delivery';
	const finalTotal = showDelivery ? cartTotal + deliveryFee : cartTotal;

	const handleConfirmOrder = async () => {
		if (!isFormValid) {
			// Show specific error if date/time missing
			if (!selectedDate || !selectedTimeSlot) {
				setError('Please select a date and time for your order.');
				return;
			}
			return;
		}

		setIsLoading(true);
		setError('');

		try {
			const response = await fetch('/api/onlineOrderingCheckout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cart,
					contactInfo,
					selectedMethod,
					deliveryAddress:
						selectedMethod === 'delivery' ? deliveryAddress : null,
					deliveryFee: showDelivery ? deliveryFee : 0,
					giftInfo,
					selectedDate, // NEW
					selectedTimeSlot, // NEW
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Failed to create checkout');
			}

			if (data.success && data.paymentLink) {
				// Redirect to Square payment page
				window.location.href = data.paymentLink;
			} else {
				throw new Error('No payment link received');
			}
		} catch (err) {
			console.error('Checkout error:', err);
			setError(err.message || 'Something went wrong. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className='space-y-2'>
			{error && (
				<div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
					{error}
				</div>
			)}

			<button
				type='button'
				onClick={handleConfirmOrder}
				disabled={!isFormValid || isLoading}
				className='w-full p-4 text-xl font-bold rounded bg-primary text-light hover:bg-dark transition disabled:opacity-50 disabled:cursor-not-allowed'
			>
				{isLoading ? 'Processing...' : 'Confirm Order'}
			</button>

			<div className='text-center text-dark text-lg font-semibold'>
				{isHydrated ? (
					<>
						Total: ${finalTotal.toFixed(2)}
						{showDelivery && (
							<span className='block text-dark/80 font-bold'>
								(includes ${deliveryFee.toFixed(2)} delivery fee)
							</span>
						)}
					</>
				) : (
					<span>Total: $0.00</span>
				)}
			</div>
		</section>
	);
};

export default ConfirmOrderButton;