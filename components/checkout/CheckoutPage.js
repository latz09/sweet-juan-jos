/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import PageEntry from '@/components/utils/animations/PageEntry';
import OrderSummary from './OrderSummary';
import FulfillmentOptions from './FulfillmentOptions';
import ContactForm from './ContactForm';
import ConfirmOrderButton from './ConfirmOrderButton';
import useCartStore from '@/lib/useCartStore';

const CheckoutPage = ({ settings }) => {
	const cart = useCartStore((state) => state.cart);

	// Form state
	const [selectedMethod, setSelectedMethod] = useState(''); // pickup | delivery
	const [deliveryAddress, setDeliveryAddress] = useState({
		address: '',
		city: '',
		state: '',
		zip: '',
	});
	const [contactInfo, setContactInfo] = useState({
		name: '',
		phone: '',
		email: '',
	});
	const [zipValid, setZipValid] = useState(true);
	const [giftInfo, setGiftInfo] = useState({ name: '', note: '' });

	return (
		<PageEntry>
			<div className='f'>
				<OrderSummary cart={cart} />
				<div className='max-w-3xl mx-auto  p-4 lg:p-6 space-y-24 '>
					<FulfillmentOptions
						settings={settings}
						selectedMethod={selectedMethod}
						setSelectedMethod={setSelectedMethod}
						deliveryAddress={deliveryAddress}
						setDeliveryAddress={setDeliveryAddress}
						zipValid={zipValid}
						setZipValid={setZipValid}
						giftInfo={giftInfo}
						setGiftInfo={setGiftInfo}
					/>

					<ContactForm
						contactInfo={contactInfo}
						setContactInfo={setContactInfo}
					/>

					<ConfirmOrderButton
						cart={cart}
						selectedMethod={selectedMethod}
						contactInfo={contactInfo}
						deliveryAddress={deliveryAddress}
						zipValid={zipValid}
						settings={settings}
					/>
					<div className='flex items-center justify-center space-x-4 mt-2'>
						<img
							src='https://cdn.simpleicons.org/visa'
							alt='Visa'
							className='h-8'
						/>
						<img
							src='https://cdn.simpleicons.org/mastercard'
							alt='Mastercard'
							className='h-8'
						/>
						<img
							src='https://cdn.simpleicons.org/americanexpress'
							alt='American Express'
							className='h-8'
						/>
						<img
							src='https://cdn.simpleicons.org/discover'
							alt='Discover'
							className='h-8'
						/>
					</div>
				</div>
			</div>
		</PageEntry>
	);
};

export default CheckoutPage;
