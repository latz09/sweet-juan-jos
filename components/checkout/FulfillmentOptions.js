'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseBoldSyntax } from '../utils/parseBoldSyntax';

const allowedDeliveryZips = ['54481', '54482', '54467']; // Example zip codes

const FulfillmentOptions = ({
	settings,
	selectedMethod,
	setSelectedMethod,
	deliveryFee,
	deliveryAddress,
	setDeliveryAddress,
	zipValid,
	setZipValid,
	giftInfo,
	setGiftInfo,
}) => {
	const { allowPickup, allowDelivery, pickupInfo, deliveryInfo, allowGifting } =
		settings;

	// Check if this is a gift based on whether any gift info exists
	const [isGift, setIsGift] = useState(false);

	// Initialize isGift based on existing giftInfo
	useEffect(() => {
		if (giftInfo && (giftInfo.name || giftInfo.note)) {
			setIsGift(true);
		}
	}, [giftInfo]);

	// Auto-select if only one option is available
	useEffect(() => {
		if (allowPickup && !allowDelivery) {
			setSelectedMethod('pickup');
		}
		if (!allowPickup && allowDelivery) {
			setSelectedMethod('delivery');
		}
	}, [allowPickup, allowDelivery, setSelectedMethod]);

	const renderHeading = () => {
		if (allowPickup && allowDelivery) return 'Choose Between';
		if (allowPickup && !allowDelivery) return 'Available for Pickup';
		if (!allowPickup && allowDelivery) return 'Available for Delivery';
		return '';
	};

	// Handle toggling gift status
	const handleGiftToggle = () => {
		const newIsGift = !isGift;
		setIsGift(newIsGift);
		
		// If turning off gift, clear the gift info
		if (!newIsGift) {
			setGiftInfo({ name: '', note: '' });
		}
	};

	// Generate delivery fee message
	const getDeliveryFeeMessage = () => {
		if (selectedMethod !== 'delivery' || deliveryFee === undefined) return null;
		
		if (deliveryFee === 0) {
			return 'Free delivery this week!';
		} else {
			return `Delivery fee: $${deliveryFee.toFixed(2)}`;
		}
	};

	const deliveryFeeMessage = getDeliveryFeeMessage();

	return (
		<section className='space-y-6'>
			{/* Dynamic heading */}
			<h2 className='text-2xl font-bold text-center'>{renderHeading()}</h2>

			{/* Buttons only if both are available */}
			{allowPickup && allowDelivery && (
				<div className='flex gap-4 justify-center items-center pb-4'>
					<button
						type='button'
						onClick={() => setSelectedMethod('pickup')}
						className={`text-lg uppercase w-full px-4 py-2 rounded-sm shadow font-bold scale-95 transition duration-500 ${
							selectedMethod === 'pickup'
								? 'bg-primary text-light shadow-lg shadow-primary/30 scale-100'
								: 'bg-light border border-primary/60 shadow-none'
						}`}
					>
						Pickup
					</button>
					<span className='uppercase font-bold opacity-80'>or</span>
					<button
						type='button'
						onClick={() => setSelectedMethod('delivery')}
						className={`text-lg uppercase w-full px-4 py-2 rounded-sm shadow font-bold scale-95 transition duration-500 ${
							selectedMethod === 'delivery'
								? 'bg-primary text-light shadow-lg shadow-primary/30 scale-100'
								: 'bg-light border border-primary/60 shadow-none'
						}`}
					>
						Delivery
					</button>
				</div>
			)}

			{/* Animate Info */}
			<AnimatePresence mode='wait' initial={false}>
				{selectedMethod === 'pickup' && pickupInfo?.length > 0 && (
					<motion.div
						key='pickup-info'
						initial={{ opacity: 0, scaleY: 0 }}
						animate={{ opacity: 1, scaleY: 1 }}
						exit={{ opacity: 0, scaleY: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						className='origin-top overflow-hidden space-y-2  text-dark md:text-lg pb-12'
					>
						<h3 className='text-xl lg:text-2xl font-bold opacity-80'>
							Pickup Details
						</h3>
						{pickupInfo.map((paragraph, idx) => (
							<p key={idx} className='text-xl lg:text-2xl'>
								{parseBoldSyntax(paragraph)}
							</p>
						))}
					</motion.div>
				)}

				{selectedMethod === 'delivery' && deliveryInfo?.length > 0 && (
					<motion.div
						key='delivery-info'
						initial={{ opacity: 0, scaleY: 0 }}
						animate={{ opacity: 1, scaleY: 1 }}
						exit={{ opacity: 0, scaleY: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						className='origin-top overflow-hidden space-y-4  text-dark md:text-lg '
					>
						<h3 className='text-xl lg:text-2xl font-bold opacity-80'>
							Delivery Details
						</h3>
						{deliveryInfo.map((paragraph, idx) => (
							<p key={idx} className='text-xl lg:text-2xl'>
								{parseBoldSyntax(paragraph)}
							</p>
						))}

						{/* Delivery fee message with matching styling from AvailabilityInfo */}
						{deliveryFeeMessage && (
							<div className='mt-6 p-4 bg-primary/10 rounded-sm border-l-2 rounded-l-lg border-primary'>
								<p className={`text-xl uppercase font-black text-center ${
									deliveryFee === 0 
										? '' 
										: 'text-white'
								}`}>
									{deliveryFee === 0 && '🎉 '}
									{deliveryFeeMessage}
								</p>
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Animate Address Fields if delivery selected */}
			<AnimatePresence mode='wait' initial={false}>
				{selectedMethod === 'delivery' && (
					<motion.div
						key='delivery-address-fields'
						initial={{ opacity: 0, scaleY: 0 }}
						animate={{ opacity: 1, scaleY: 1 }}
						exit={{ opacity: 0, scaleY: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						className='origin-top overflow-hidden space-y-4 pt-4'
					>
						<h3 className='text-xl lg:text-2xl font-bold mt-4'>
							Where Should Your Sweets Be Dropped Off?
						</h3>
						<div className='space-y-4'>
							<input
								type='text'
								placeholder='Street '
								value={deliveryAddress.address}
								onChange={(e) =>
									setDeliveryAddress({
										...deliveryAddress,
										address: e.target.value,
									})
								}
								className='online-order-form-input'
							/>
							<input
								type='text'
								placeholder='City'
								value={deliveryAddress.city}
								onChange={(e) =>
									setDeliveryAddress({
										...deliveryAddress,
										city: e.target.value,
									})
								}
								className='online-order-form-input'
							/>
							<input
								type='text'
								placeholder='State'
								value={deliveryAddress.state}
								onChange={(e) =>
									setDeliveryAddress({
										...deliveryAddress,
										state: e.target.value,
									})
								}
								className='online-order-form-input'
							/>
							<input
								type='text'
								placeholder='ZIP Code'
								value={deliveryAddress.zip}
								onChange={(e) => {
									const zip = e.target.value;
									setDeliveryAddress({ ...deliveryAddress, zip });
									setZipValid(allowedDeliveryZips.includes(zip));
								}}
								className='online-order-form-input'
							/>
						</div>
						{!zipValid && (
							<p className='text-red-600 font-bold text-xl text-center tracking-wide'>
								Sorry, we do not deliver to that ZIP Code.
							</p>
						)}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Gift Option if enabled */}
			{allowGifting && (
				<div className='space-y-4 pt-4 lg:pt-16 '>
					<button
						type='button'
						onClick={handleGiftToggle}
						className={`w-full py-3 rounded font-bold transition shadow ${
							isGift
								? 'text-lg uppercase  shadow-none'
								: 'bg-primary/5 text-dark'
						}`}
					>
						{isGift ? '✓ Marked as a Gift' : 'Is this a gift for someone?'}
					</button>

					<AnimatePresence mode='wait' initial={false}>
						{isGift && (
							<motion.div
								key='gift-fields'
								initial={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 1, scaleY: 1 }}
								exit={{ opacity: 0, scaleY: 0 }}
								transition={{ duration: 0.4, ease: 'easeInOut' }}
								className='origin-top overflow-hidden space-y-4  text-dark'
							>
								<h3 className='text-xl lg:text-2xl font-bold'>
									{`Who's the Sweet Treat For?`}
								</h3>
								<input
									type='text'
									placeholder='Recipient Name'
									value={giftInfo.name || ''}
									onChange={(e) =>
										setGiftInfo({ ...giftInfo, name: e.target.value })
									}
									className='online-order-form-input'
								/>
								<textarea
									placeholder='Optional Note'
									value={giftInfo.note || ''}
									onChange={(e) =>
										setGiftInfo({ ...giftInfo, note: e.target.value })
									}
									className='online-order-form-input resize-none'
									rows={3}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			)}
		</section>
	);
};

export default FulfillmentOptions;