'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import DualPromotionModal from './DualPrromotionModal';
import SmallBanner from './SmallBanner';
import useNoScroll from '@/lib/useNoScroll';

const DualPromotionPopup = ({ promotions }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isBannerVisible, setIsBannerVisible] = useState(false);

	useNoScroll(isModalOpen);

	useEffect(() => {
		// Automatically open modal after 3 seconds
		const timer = setTimeout(() => {
			setIsModalOpen(true);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (!promotions || promotions.length === 0) return null;

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setIsBannerVisible(true);
	};

	return (
		<>
			<AnimatePresence mode="wait">
				{isModalOpen && (
					<DualPromotionModal
						key="dual-promotion-modal"
						promotions={promotions}
						onClose={closeModal}
					/>
				)}

				{!isModalOpen && isBannerVisible && (
					<SmallBanner
						key="dual-promotion-banner"
						title="View Active Promotions"
						subtitle=""
						onClick={openModal}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default DualPromotionPopup;