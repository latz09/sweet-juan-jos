'use client';

import Image from 'next/image';

const ProductImage = ({ product }) => {
  const imageUrl = product?.image?.asset?.url;

  if (!imageUrl) return null;

  return (
    <div className="relative w-full md:w-1/3 h-64 rounded overflow-hidden">
      <Image
        src={imageUrl}
        alt={product.name}
        fill
        className="object-contain p-2 bg-white"
        priority
      />
    </div>
  );
};

export default ProductImage;
