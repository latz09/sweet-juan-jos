import Image from 'next/image';
import { FaDollarSign } from 'react-icons/fa6';
import { SubHeading } from '../utils/Typography';
import AnimateUp from '../utils/animations/AnimateUp';
import logo from '@/public/images/logo/transparent-juanjos.png';
import FadeInAndRotate from '../utils/animations/FadeInAndRotate';

const OfferingItem = ({ item, onOrderNow }) => {
	return (
		<div
			className='group relative flex flex-col justify-between gap-8 h-full bg-gradient-to-l from-light via-primary/5 to-light rounded-lg shadow shadow-primary/20 px-4 pb-8 pt-16 border border-primary/20 sm:hover:shadow-lg sm:hover:shadow-primary/30 sm:hover:border-dark/60 sm:hover:bg-light sm:hover:scale-95 transition duration-500 cursor-pointer'
			onClick={() => onOrderNow(item)}
		>
			{/* Logo positioned at the top-right corner */}
			<Image
				src={logo}
				alt='logo'
				width={50}
				height={50}
				className='absolute top-4 left-4 opacity-20 sm:group-hover:scale-90 transition duration-1000'
			/>
			<div className='text-2xl font-bold text-primary absolute top-4 right-6 flex sm:group-hover:text-dark  '>
				<span className='font-normal text-sm opacity-40 sm:group-hover:opacity-100 '>
					<FaDollarSign />
				</span>
				<span>{item.itemCost}</span>
			</div>

			<div className='flex justify-center'>
				<FadeInAndRotate>
					<Image
						src={item.itemImageUrl}
						alt={item.itemTitle}
						width={110}
						height={110}
					/>
				</FadeInAndRotate>
			</div>

			<div className='text-center flex-grow flex flex-col gap-6 justify-center'>
				<div className="space-y-1 font-bold">
					<p className='font-bold text-dark text-2xl lg:text-3xl'>
						{item.itemTitle}
					</p>
					<p>{`(${item.itemSubtitle})`}</p>
				</div>
				<div className='text-lg md:text-xl text-gray-600'>
					{item.itemDescription}
				</div>
			</div>

			<div className='flex justify-center mt-6'>
				<button
					className='font-bold text-lg md:text-xl bg-primary py-2 px-8  text-light rounded-full transition-colors duration-300 sm:group-hover:bg-dark'
					onClick={() => onOrderNow(item)}
				>
					Order Now
				</button>
			</div>
		</div>
	);
};

export default OfferingItem;
