'use client';

import Image from 'next/image';

const ProductImage = ({ product }) => {
	const imageUrl = product?.image?.asset?.url;

	if (!imageUrl) return null;

	return (
		<div className='flex flex-col items-center w-full md:w-1/3 space-y-2'>
			<div className='relative w-full h-64 rounded overflow-hidden'>
				<Image
					src={imageUrl}
					alt={product.name}
					fill
					className='object-contain p-2'
					priority
				/>
			</div>
			<p className='text-dark/70 font-bold italic'>* Style may vary</p>
		</div>
	);
};

export default ProductImage;
