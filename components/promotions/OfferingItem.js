import Image from 'next/image';
import { useCart } from './checkout-process/steps/cart/CartContext';
import { FaDollarSign } from 'react-icons/fa6';

import logo from '@/public/images/logo/transparent-juanjos.png';
import FadeInAndRotate from '../utils/animations/FadeInAndRotate';

const OfferingItem = ({ item }) => {
	const { cart, addToCart } = useCart();

	// Find if this item is already in the cart
	const cartItem = cart.find((cartItem) => cartItem.name === item.itemTitle);
	const quantityInCart = cartItem ? cartItem.quantity : 0;
	const isMaxReached = quantityInCart >= 10;

	function handleAddToCart(e) {
		e.stopPropagation();
		if (isMaxReached) return; // Prevent adding if max is reached

		// Add the item to the cart
		addToCart({
			id: `${Math.random()}`, // ensure unique id
			name: item.itemTitle,
			itemImageUrl: item.itemImageUrl,
			itemSubtitle: item.itemSubtitle,
			price: parseFloat(item.itemCost || '0'),
			quantity: 1,
		});
		// Optionally do something else, like show a toast "Item added"
	}

	return (
		<div
			className={`relative flex flex-col justify-between gap-8 h-full bg-gradient-to-l from-light via-primary/5 to-light rounded-lg px-4 pb-8 pt-16 border transition duration-500 cursor-pointer select-none ${
				!isMaxReached
					? 'group sm:hover:shadow-lg sm:hover:shadow-primary/30 sm:hover:border-dark/60 sm:hover:bg-light sm:hover:scale-95 shadow shadow-primary/20  border-primary/20'
					: 'sm:hover:shadow-primary/20 sm:hover:border-primary/20 sm:hover:bg-transparent  border-primary/0 scale-90'
			}`}
			onClick={handleAddToCart}
		>
			{/* Logo positioned at the top-right corner */}
			<Image
				src={logo}
				alt='logo'
				width={50}
				height={50}
				className={`absolute top-4 left-4 opacity-20  transition duration-1000 ${!isMaxReached ? 'sm:group-hover:scale-90' : 'sm:group-hover:scale-100'}`}
			/>
			<div className='text-2xl font-bold text-primary absolute top-4 right-6 flex sm:group-hover:text-dark  '>
				<span className='font-normal text-sm opacity-40 sm:group-hover:opacity-100 '>
					<FaDollarSign />
				</span>
				{item.itemCost && <span>{item.itemCost}</span>}
			</div>

			<div className='flex justify-center'>
				<FadeInAndRotate>
					{item.itemImageUrl && (
						<Image
							src={item.itemImageUrl}
							alt={item.itemTitle || 'Default Alt'}
							width={110}
							height={110}
						/>
					)}
				</FadeInAndRotate>
			</div>

			<div className='text-center flex-grow flex flex-col gap-6 justify-center'>
				<div className='space-y-1 font-bold'>
					{item.itemTitle && (
						<p className='font-bold text-dark text-2xl lg:text-3xl '>
							{item.itemTitle}
						</p>
					)}
					{item.itemSubtitle && <p>{`(${item.itemSubtitle})`}</p>}
				</div>
				{item.itemDescription && (
					<div className='text-lg md:text-xl text-gray-600'>
						{item.itemDescription}
					</div>
				)}
			</div>

			<div className='flex justify-center mt-6'>
				<button
					className={`font-bold text-lg md:text-xl py-2 px-8  transition-colors duration-300 ${
						isMaxReached
							? 'bg-primary/10 scale-95 text-dark/70 cursor-not-allowed rounded-sm'
							: 'bg-primary text-light  sm:group-hover:bg-dark rounded-full'
					}`}
					onClick={handleAddToCart}
					disabled={isMaxReached}
				>
					{isMaxReached ? 'Maximum of 10' : 'Add to Order'}
				</button>
			</div>
		</div>
	);
};

export default OfferingItem;
