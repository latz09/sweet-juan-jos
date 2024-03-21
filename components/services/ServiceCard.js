import { servicestwo } from '@/data/services';
import Image from 'next/image';

const ServiceCard = () => {
	return (
		<div className=" mx-2 lg:mx-0">
            <h2 className='text-4xl font-bold text-center mb-24 mt-12 '>Our Delicious Offerings</h2>
			<div className='grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto place-items-center'>
				{servicestwo.map((service) => (
					<div
						key={service.id}
						className='relative group shadow-lg shadow-primary/40'
					>
						{/* Image as Background */}
						<div className='h-30 relative group-hover:opacity-90  transition duration-500'>
							<Image src={service.image} alt={service.title} />
						</div>

						{/* Overlay Container with Primary Background centered */}
						<div className='absolute inset-0 flex items-center justify-center group-hover:scale-105 transition duration-700'>
							<div className='bg-gradient-to-t from-primary/90 to-primary via-primary/95 px-16 py-4 shadow-lg shadow-primary/30 text-light text-center rounded-lg'>
								{/* Title */}
								<h3 className='font-semibold  text-2xl lg:text-3xl'>{service.title}</h3>

								{/* Order Now Button */}
								<button className='mt-4 italic font-bold '>Order Now</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ServiceCard;
