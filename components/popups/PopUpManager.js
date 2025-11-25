'use client';

import { usePathname } from 'next/navigation';
import PromotionPopup from './PromotionPopup';
import DualPromotionPopup from './DualPromotionPopup';
import OnlineOrderingPopup from './OnlineOrderingPopup';

const PopUpManager = ({ promotions, acceptingOrders }) => {
	const pathname = usePathname();

	// Don't show popups on these pages
	if (
		pathname.startsWith('/online-ordering') ||
		pathname.startsWith('/promotions') ||
		pathname.startsWith('/contact-katie-jo') ||
		pathname.startsWith('/weddings-and-special-events')
	) {
		return null;
	}

	// If we have promotions, handle 1 vs 2
	if (promotions && promotions.length > 0) {
		if (promotions.length === 1) {
			return <PromotionPopup promotion={promotions[0]} />;
		}
		
		if (promotions.length >= 2) {
			// Only show first 2 if somehow more than 2 are active
			return <DualPromotionPopup promotions={promotions.slice(0, 2)} />;
		}
	}

	// If no promotions but accepting orders, show online ordering popup
	if (acceptingOrders) {
		return <OnlineOrderingPopup />;
	}

	// If nothing active, render nothing
	return null;
};

export default PopUpManager;