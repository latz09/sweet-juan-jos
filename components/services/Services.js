import { services } from '@/data/services';
import { motion } from 'framer-motion';

const Services = () => {
	return (
		<div className='grid lg:grid-cols-2 gap-x-16 gap-y-32 lg:gap-y-16 max-w-6xl mx-auto'>
			{services.map((service) => (
				<motion.div
					key={service.id}
					className='grid place-items-center'
					initial={{ y: 100 }}
					whileInView={{ y: 0 }}
					transition={{ duration: 1.1, delay:.1 }}
				>
					{/* Icon component */}

					<service.icon className=' text-7xl lg:text-8xl mb-6 border-primary text-light bg-dark rounded-full p-4 shadow shadow-primary/50' />

					<h3 className='text-3xl font-semibold mb-2 text-primary  '>
						{service.title}
					</h3>
					<p className='text-center px-8 y leading-7 lg:leading-8'>
						{service.description}
					</p>
					<button className='mt-4 text-primary font-bold underline underline-offset-2'>
						Order Now
					</button>
				</motion.div>
			))}
		</div>
	);
};

export default Services;
