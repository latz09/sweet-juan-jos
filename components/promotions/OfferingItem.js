import Image from 'next/image';
import { SubHeading } from '../utils/Typography';
import AnimateUp from '../utils/animations/AnimateUp';
import logo from '@/public/images/logo/transparent-juanjos.png';
import FadeInAndRotate from '../utils/animations/FadeInAndRotate';

const OfferingItem = ({ item }) => {
	return (
		<div className='group relative flex flex-col justify-between gap-8 h-full bg-gradient-to-l from-light via-primary/5 to-light rounded-lg shadow shadow-primary/20 px-4 pb-8 pt-16 border border-primary/20 sm:hover:shadow-lg sm:hover:shadow-primary/30 sm:hover:border-dark/60 sm:hover:bg-light sm:hover:scale-95 transition duration-500'>
			{/* Logo positioned at the top-right corner */}
			<Image
				src={logo}
				alt='logo'
				width={50}
				height={50}
				className='absolute top-4 left-4 opacity-20 sm:group-hover:scale-90 transition duration-1000'
			/>

			<div className='flex justify-center'>
                <FadeInAndRotate>
				<Image
					src={item.itemImageUrl}
					alt={item.itemTitle}
					width={110}
					height={110}
					
				/></FadeInAndRotate>
			</div>

			<div className='text-center flex-grow flex flex-col gap-2 justify-center'>
				<p className='font-bold text-dark text-xl md:text-2xl'>{item.itemTitle}</p>
				<div className='md:text-lg text-gray-600'>{item.itemDescription}</div>
			</div>

			<div className='flex justify-center mt-4'>
				<button className='font-bold text-lg md:text-xl bg-primary py-2 px-8  text-light rounded-full transition-colors duration-300 sm:group-hover:bg-dark'>
					Order Now
				</button>
			</div>
		</div>
	);
};

export default OfferingItem;
