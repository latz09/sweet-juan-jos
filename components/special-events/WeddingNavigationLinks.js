'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCheck, FaPenAlt, FaQuestion } from 'react-icons/fa';

const WeddingNavigationLinks = () => {
	return (
		<div className='grid lg:grid-cols-3 gap-8 lg:gap-2 place-items-center w-5/6 lg:w-full max-w-7xl mx-auto lg:px-2'>
			{weddingLinks.map((link, index) => (
				<Link href={link.link} key={index} className='w-full shadow-lg rounded-sm h-full'>
					<motion.div
						className='px-8 py-4 w-full bg-dark text-light font-bold h-full  '
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.3 }}
					>
						<div className='flex items-center  lg:justify-around gap-4 text-center h-full  '>
							<span className='lg:text-2xl text-primary'>{link.icon}</span>
							<span className='lg:text-xl  w-full'>{link.title}</span>
						</div>
					</motion.div>
				</Link>
			))}
		</div>
	);
};

export default WeddingNavigationLinks;

const weddingLinks = [
	{
		title: 'Special Events Timeline & Checklist',
		link: '/',
		icon: <FaCheck />,
	},
	{
		title: 'Guidelines & Things to Remember',
		link: '/',
		icon: <FaQuestion />,
	},
	{
		title: 'General Contract',
		link: '/',
		icon: <FaPenAlt />,
	},
];
