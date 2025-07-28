'use client';

import { useState, useEffect } from 'react';
import useNoScroll from '@/lib/useNoScroll';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { NavigationLinks } from '@/data/NavigationLinks';
import logo from '../../public/images/logo/transparent-juanjos.png';
import LinkIfActive from '../online-ordering/LinkIfActive';
import CartButton from '../cart/CartButton';

const Navigation = ({ acceptingOrders }) => {
	return (
		<div className='py-2 xl:py-6 sticky top-0 bg-light/95 z-40'>
			<DesktopNavigation acceptingOrders={acceptingOrders} />
			<MobileNavigation acceptingOrders={acceptingOrders} />
		</div>
	);
};

export default Navigation;

const DesktopNavigation = ({ acceptingOrders }) => {
	return (
		<div className='hidden xl:block max-w-[90rem] mx-auto px-2 pb-2'>
			<div className='mt-[2px] border-y border-primary py-4 flex items-center justify-around'>
				{NavigationLinks.map((link) => (
					<Link key={link.id} href={link.slug} passHref>
						<div className='text-lg px-4 font-bold transition duration-500 border-x hover:scale-110'>
							{link.name}
						</div>
					</Link>
				))}

				{/* Your Online Ordering Link */}
				<LinkIfActive acceptingOrders={acceptingOrders} mobile={false} />

				{/* Cart Button inline next to LinkIfActive */}
				<div className='ml-4'>
					<CartButton size='desktop' acceptingOrders={acceptingOrders} />
				</div>
			</div>
		</div>
	);
};

const MobileNavigation = ({ acceptingOrders }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	useNoScroll(isMenuOpen);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const menuVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	return (
		<>
			<div className='xl:hidden py-1'>
				<div className='p-4'>
					<div className='flex justify-between items-center'>
						<Link href='/'>
							<Image
								src={logo}
								alt='Sweet Juanjo Logo'
								width={100}
								height={100}
								className='pl-4'
							/>
						</Link>
						<CartButton size='mobile' acceptingOrders={acceptingOrders} />
						<button
							onClick={toggleMenu}
							className='text-2xl'
							aria-label='Open Menu'
						>
							<AiOutlineMenu />
						</button>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className='fixed top-0 left-0 h-full w-full bg-light/90 backdrop-blur z-50 flex flex-col '
						variants={menuVariants}
						initial='hidden'
						animate='visible'
						exit='hidden'
						transition={{ duration: 0.3 }}
					>
						<button
							onClick={toggleMenu}
							className='text-2xl absolute top-4 right-4 text-dark bg-light rounded-full p-2 z-10'
							aria-label='Close Menu'
						>
							<AiOutlineClose />
						</button>

						{/* Scrollable menu section */}
						<div className='pt-20 overflow-y-auto flex-1 p-6 scrollbar-hide '>
							<div className='grid grid-cols-1 gap-10 '>
								<LinkIfActive
									toggleMenu={toggleMenu}
									acceptingOrders={acceptingOrders}
									mobile={true}
								/>
								{NavigationLinks.map((link) => (
									<motion.div
										key={link.id}
										className='w-full text-center'
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										transition={{ duration: 0.6 }}
									>
										<Link href={link.slug}>
											<span
												className={`inline-block text-2xl border-x border-primary font-bold w-full py-3 px-8 cursor-pointer transition duration-300 `}
												onClick={toggleMenu}
											>
												{link.name}
											</span>
										</Link>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};
