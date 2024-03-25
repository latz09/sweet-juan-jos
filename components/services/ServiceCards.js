import { services } from '@/data/services';
import Image from 'next/image';
import { MainHeading, SubHeading } from '../utils/Typography';
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";

const ServiceCards = () => {
	return (
		<div className='mx-2 lg:mx-0'>
			<div className='grid place-items-center my-16'>
				<MainHeading title='Our Delicious Offerings' type='dark' />
			</div>
			<div className='grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto place-items-center'>
				{services.map((service) => (
					<Link href={`/services/${service.href}`} key={service.id}
					
						className='relative group shadow-lg shadow-primary/40 lg:hover:shadow-none lg:hover:scale-105 transition duration-1000 cursor-pointer'
					>
						{/* Image as Background */}
						<div className='h-30 relative group-hover:opacity-95 transition duration-500'>
							<Image src={service.image} alt={service.title} />
						</div>

						{/* Overlay Container with Primary Background centered */}
						<div className='absolute inset-0 flex items-center justify-center lg:group-hover:scale-90 transition duration-700 group'>
							<div className='bg-gradient-to-b w-full from-primary/90 lg:group-hover:from-primary to-primary lg:group-hover:to-primary via-primary/90 px-4 lg:px-16 py-6 shadow-lg shadow-primary/30 text-light text-center'>
								{/* Title */}
								<SubHeading title={service.title} type='light' />
							</div>
						</div>

				
					
					</Link>
				))}
			</div>
		</div>
	);
};

export default ServiceCards;
