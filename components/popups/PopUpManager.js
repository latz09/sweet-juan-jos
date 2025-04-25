'use client';

import PromotionPopup from './PromotionPopup';
import OnlineOrderingPopup from './OnlineOrderingPopup';

const PopUpManager = ({ promotion, acceptingOrders }) => {
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