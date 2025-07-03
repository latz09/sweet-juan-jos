'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import CategorySelector from './CategorySelector';
import ProductGrid from './ProductGrid';

const OrderingPage = ({ settings, categories }) => {
	const [selectedCategoryId, setSelectedCategoryId] = useState(null);

	useEffect(() => {
		if (categories.length > 0 && !selectedCategoryId) {
			setSelectedCategoryId(categories[0]._id);
		}
	}, [categories, selectedCategoryId]);

	const filteredProducts = settings.availableProducts.filter((product) => {
		return (
			product?.category?._id &&
			selectedCategoryId &&
			product.category._id === selectedCategoryId
		);
	});
	

	return (
		<div className='min-h-screen space-y-16 lg:space-y-24 '>
			<HeroSection
				heroImageUrl={settings?.heroImage?.asset?.url}
				pageTitle={settings?.pageTitle}
				introText={settings?.introText}
				allowDelivery={settings?.allowDelivery}
				allowPickup={settings?.allowPickup}
				deliveryInfo={settings?.deliveryInfo}
				pickupInfo={settings?.pickupInfo}
				deliveryFee={settings?.deliveryFee}
			/>
			<div className='space-y-6'>
				<CategorySelector
					categories={categories}
					selectedCategoryId={selectedCategoryId}
					setSelectedCategoryId={setSelectedCategoryId}
				/>
				<ProductGrid products={filteredProducts} />
				
			</div>
		</div>
	);
};

export default OrderingPage;
