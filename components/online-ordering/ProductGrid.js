'use client';

import AnimateUp from '../utils/animations/AnimateUp';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, maxOrderAmount, acceptingOrders }) => {
    
	return (
		<div className='grid grid-cols-1  gap-16 lg:gap-24 px-4 sm:px-8 lg:px-12 py-8 max-w-7xl mx-auto'>
			{products.map((product) => (
				<AnimateUp key={product._id}>
					<ProductCard product={product} maxOrderAmount={maxOrderAmount} acceptingOrders={acceptingOrders} />
				</AnimateUp>
			))}
		</div>
	);
};

export default ProductGrid;
