'use client';

import { useState } from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import useCartStore from '@/lib/useCartStore'; // adjust path if different
import useToastStore from '@/lib/useToastStore';

const ProductCard = ({ product }) => {
	const [selectedQuantity, setSelectedQuantity] = useState(null);
	const [selectedFlavor, setSelectedFlavor] = useState(null);
	const [selectedFrosting, setSelectedFrosting] = useState(null);

	const addToCart = useCartStore((state) => state.addToCart);
    const addToast = useToastStore((state) => state.addToast);

	const calculateTotalPrice = () => {
		const basePrice = selectedQuantity?.price || 0;
		const flavorUpcharge = selectedFlavor?.upcharge || 0;
		const frostingUpcharge = selectedFrosting?.upcharge || 0;
		const units = selectedQuantity?.units || 0;
		const upcharges = (flavorUpcharge + frostingUpcharge) * units;
		return (basePrice + upcharges).toFixed(2);
	};

	const handleAddToCart = () => {
		if (!selectedQuantity) return; // Protect against missing selection

		const cartItem = {
			productId: product._id,
			name: product.name,
			quantityLabel: selectedQuantity.label,
			quantityUnits: selectedQuantity.units,
			flavor: selectedFlavor?.name || null,
			frosting: selectedFrosting?.name || null,
			totalPrice: parseFloat(calculateTotalPrice()),
			imageUrl: product?.image?.asset?.url || null, // nice for displaying cart previews
		};

		addToCart(cartItem);
        addToast(`${product.name} added to cart!`);
	};

	const readyToAdd = () => {
		if (!selectedQuantity) return false;
		if (product.flavorOptions && !selectedFlavor) return false;
		if (product.frostingOptions && !selectedFrosting) return false;
		return true;
	};

	return (
		<div className='flex flex-col md:flex-row items-center rounded shadow-sm shadow-primary/30 overflow-hidden space-y-6 md:space-y-0 md:space-x-8 p-4 gap-8 w'>
			<ProductImage product={product} />
			<div className='flex flex-col w-full space-y-6'>
				<ProductInfo
					product={product}
					selectedQuantity={selectedQuantity}
					setSelectedQuantity={setSelectedQuantity}
					selectedFlavor={selectedFlavor}
					setSelectedFlavor={setSelectedFlavor}
					selectedFrosting={selectedFrosting}
					setSelectedFrosting={setSelectedFrosting}
					calculateTotalPrice={calculateTotalPrice}
				/>

				{/* Add to Cart Button */}
				{readyToAdd() && (
					<div className="grid md:place-items-end">
						<button
							onClick={handleAddToCart}
							className=' md:px-8 py-3 rounded bg-primary text-light font-black text-xl hover:bg-dark transition'
						>
							Add to Cart
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
