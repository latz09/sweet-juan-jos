import { serviceCardsData } from '@/data/services';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MainHeading, SubHeading } from '../utils/Typography';
import Link from 'next/link';

const ServiceCards = () => {
	return (
		<div className='max-w-7xl mx-auto '>
			<div className='grid place-items-center my-16 '>
				<MainHeading title='Our Delicious Offerings' type='dark' />
			</div>
			<div className='grid lg:grid-cols-2 gap-24 place-items-center'>
				{serviceCardsData.map((service) => (
					<motion.div
						key={service.id}
						initial={{ y: 80, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						whileHover={{ scale: .95 }}
						transition={{ duration: .6 }}
						className="shadow-lg shadow-primary/30 hover:shadow-none cursor-pointer lg:m-8"
					>
						<Link
							href={`/services/${service.href}`}
							className='relative '
						>
							<motion.div className='' >
								<Image src={service.image} alt={service.title} className=""  />
							</motion.div>

							{/* Overlay Container with Primary Background centered */}
							<div className='absolute inset-0 flex items-center  justify-center  '>
								<div className='bg-gradient-to-b  from-primary/70  to-primary/70  via-primary px-4 lg:px-16 py-4 shadow-lg shadow-primary/30 text-light text-center '>
									
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
