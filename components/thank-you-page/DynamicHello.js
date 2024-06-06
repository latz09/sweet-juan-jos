'use client';

import { useSearchParams } from 'next/navigation';
import { SubHeading } from '../utils/Typography';
import Link from 'next/link';
import { motion } from 'framer-motion';

const DynamicHello = () => {
	const searchParams = useSearchParams();
	const name = searchParams.get('name') || 'there';

	return (
		<motion.div
			className='grid place-items-center h-full'
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 1.1 }}
		>
			<div className='text-center grid gap-3'>
				<SubHeading title={`Thank you, ${name}, for your request`} />
				<p className='text-xl lg:text-2xl'>We will get back to you shortly</p>
				<motion.div className='font-bold opacity-80 tracking-wide lg:text-lg '
                initial={{ opacity: 0, x: 50}}
                animate={{ opacity: 1, x: 0}}
                transition={{ duration: 1.2, delay: 1.8 }}
                >
					-Katie Jo
				</motion.div>
				<motion.div
					className='mt-8'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.75, delay: 0.55 }}
				>
					<Link href='/'>
						<span className='text-xl font-semibold px-8 py-4 border border-primary/40 sm:hover:bg-dark/10 sm:hover:border-none sm:hover:scale-95 transition duration-700'>
							Back to Home
						</span>
					</Link>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default DynamicHello;
