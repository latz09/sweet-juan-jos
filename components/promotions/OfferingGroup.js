'use client';

import { motion as m } from 'framer-motion';
import OfferingItem from './OfferingItem';

const OfferingGroup = ({ groupItems }) => {
	return (
		<div className=' space-y-8 pt-4 '>
			<m.div
				className='font-bold lg:text-base text-center md:text-start '
				initial={{ opacity: 0.5 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 1.2, delay: .2 }}
				viewport={{ once: true }}
			>
				<p className='text-lg md:text-xl opacity-70 mb-2'>{`$${groupItems.cost}`}</p>
				<h3 className='text-3xl md:text-4xl font-bold text-primary'>{groupItems.title}</h3>
				<p className='md:text-lg text-dark/80'>{`(${groupItems.subtitle})`}</p>
			</m.div>
			<div className='grid md:grid-cols-2 md:items-stretch gap-16 md:gap-12 mx-4'>
				{groupItems.items.map((item, index) => (
					<m.div
						key={index}
						className='w-full'
						initial={{ y: 40, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						viewport={{ once: true }}
					>
						<OfferingItem item={item} />
					</m.div>
				))}
			</div>
		</div>
	);
};

export default OfferingGroup;
