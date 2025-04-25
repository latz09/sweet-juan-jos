'use client';

import { usePathname } from 'next/navigation'; // 👈 import this
import PromotionPopup from './PromotionPopup';
import OnlineOrderingPopup from './OnlineOrderingPopup';

const PopUpManager = ({ promotion, acceptingOrders }) => {
	const pathname = usePathname(); 
   
	// Don't show popups on these pages
	if (
		pathname.startsWith('/online-ordering') ||
		pathname.startsWith('/promotions') ||
		pathname.startsWith('/contact-katie-jo')
	) {
		return null;
	}

	if (promotion?.active) {
		return <PromotionPopup promotion={promotion} />;
	}

	if (acceptingOrders) {
		return <OnlineOrderingPopup />;
	}

	// If nothing active, render nothing
	return null;
};

export default PopUpManager;
