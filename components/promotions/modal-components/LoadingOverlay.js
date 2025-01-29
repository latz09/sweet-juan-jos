import Image from 'next/image';
import logo from '@/public/images/logo/transparent-juanjos.png';

const LoadingOverlay = () => {
	return (
		<div className='fixed inset-0 bg-dark/60 backdrop-blur flex flex-col items-center justify-center z-[1000]'>
			<div className='loader mb-4 w-10 h-10 border-4 border-primary border-t-transparent border-dashed rounded-full animate-spin'></div>

			{/* Spinner */}
			<p className='text-light text-xl font-bold tracking-wider animate-pulse'>
				Gathering your order details...
			</p>

			{/* Logo at the bottom center */}
			<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 '>
				<Image
					src={logo}
					alt='logo'
					width={100}
					height={100}
					className='opacity-70'
				/>
			</div>
		</div>
	);
};

export default LoadingOverlay;
