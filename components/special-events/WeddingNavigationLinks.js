'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCheck, FaPenAlt, FaQuestion } from 'react-icons/fa';
import { MdTableBar } from 'react-icons/md';

const WeddingNavigationLinks = () => {
	return (
		<div className='grid lg:grid-cols-3 gap-8 lg:gap-2 place-items-center w-5/6 lg:w-full max-w-7xl mx-auto lg:px-2'>
			{weddingLinks.map((link, index) => (
				<Link
					href={link.link}
					key={index}
					className='w-full shadow-lg rounded-sm h-full'
				>
					<motion.div
						className='px-8 py-4 w-full bg-dark text-light font-bold h-full  '
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.3 }}
					>
						<div className='flex items-center  lg:justify-around gap-4 text-center h-full  '>
							<span className='lg:text-2xl text-primary'>{link.icon}</span>
							<span className='lg:text-xl  w-full'>{link.title} </span>
						</div>
					</motion.div>
				</Link>
			))}
		</div>
	);
};

export default WeddingNavigationLinks;

export const FooterWeddingNavigationLinks = () => {
	return (
		<div className='grid gap-5 lg:gap-4 w-full place-items-center lg:place-items-start'>
			<div className='text-center font-bold'>Documents</div>
			{weddingLinks.map((link, index) => (
				<Link href={link.link} key={index} className='flex items-center gap-2 group '>
					<span className='text-sm text-primary transform transition-transform duration-300 group-hover:scale-125'>{link.icon}</span>
					<div className='transform transition-transform duration-300 group-hover:translate-x-4'>{link.title}</div>
				</Link>
			))}
			<Link href='/available-display-items' className="flex items-center gap-2  group">
				<div className='text-sm text-primary transform transition-transform duration-300 group-hover:scale-125 '>
					<MdTableBar />
				</div>
				<div className='transform transition-transform duration-300 group-hover:translate-x-4'>Available Display Items</div>
			</Link>
		</div>
	);
};

const weddingLinks = [
	{
		title: 'Events Timeline & Checklist',
		link: '/documents/time-line-and-checklist',
		icon: <FaCheck />,
	},
	{
		title: 'Guidelines & Things to Remember',
		link: '/documents/things-to-remember',
		icon: <FaQuestion />,
	},
	{
		title: 'Terms & Conditions',
		link: '/documents/terms-and-conditions',
		icon: <FaPenAlt />,
	},
];
