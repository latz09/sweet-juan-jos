import { serviceCardsData } from '@/data/services';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MainHeading, SubHeading } from '../utils/Typography';
import Link from 'next/link';

const ServiceCards = () => {
	return (
		<div className=''>
			<div className='grid place-items-center my-16'>
				<MainHeading title='Our Delicious Offerings' type='dark' />
			</div>
			<div className='grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto place-items-center'>
				{serviceCardsData.map((service) => (
					<motion.div
						key={service.id}
						initial={{ scale: .95, opacity: 0 }}
						whileInView={{ scale: 1, opacity: 1 }}
						transition={{ duration: .4 }}
						className="shadow-lg shadow-primary/30 lg:hover:shadow-none lg:hover:scale-105 transition duration-1000 cursor-pointer lg:m-8"
					>
						<Link
							href={`/services/${service.href}`}
							className='relative group '
						>
							{/* Image as Background */}
							<motion.div className='relative lg:group-hover:scale-105 transition duration-700' >
								<Image src={service.image} alt={service.title} className=""  />
							</motion.div>

							{/* Overlay Container with Primary Background centered */}
							<div className='absolute inset-0 flex items-end  justify-center group '>
								<div className='bg-gradient-to-b w-full from-primary/70 lg:group-hover:from-primary to-primary/70 lg:group-hover:to-primary via-primary px-4 lg:px-16 py-6 shadow-lg shadow-primary/30 text-light text-center transitition duration-700'>
									{/* Title */}
									<SubHeading title={service.title} type='light' />
								</div>
							</div>
						</Link>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default ServiceCards;
