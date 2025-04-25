'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmallBanner from './SmallBanner';
import PopupModal from './PopupModal';
import useNoScroll from '@/lib/useNoScroll';

const PromotionPopup = ({ promotion }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isBannerVisible, setIsBannerVisible] = useState(false);
	const [hasAutoOpened, setHasAutoOpened] = useState(false);

    useNoScroll(isModalOpen);

	useEffect(() => {
		// Automatically open modal after 5 seconds
		const timer = setTimeout(() => {
			setIsModalOpen(true);
			setHasAutoOpened(true);
		}, 3000);

		return () => clearTimeout(timer); // cleanup
	}, []);

	if (!promotion) return null;

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);

		// After user manually closes modal, show banner
		setIsBannerVisible(true);
	};

	return (
		<>
			<AnimatePresence mode="wait">
				{isModalOpen && (
					<PopupModal
						key="popup-modal"
						title={promotion.title}
						subtitle={promotion.subtitle}
						imageUrl={promotion.landingPageImage}
						linkUrl={`/promotions/${promotion.slug.current}`}
						onClose={closeModal}
						orderByDate={promotion.timeline.endDate}
					/>
				)}

				{!isModalOpen && isBannerVisible && (
					<SmallBanner
						key="small-banner"
						title={promotion.title}
						subtitle={promotion.subtitle}
						onClick={openModal}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default PromotionPopup;
