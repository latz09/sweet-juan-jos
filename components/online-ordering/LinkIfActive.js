import Link from 'next/link';

const LinkIfActive = ({ acceptingOrders, toggleMenu, mobile }) => {
	if (!acceptingOrders) return null; // Hide if not accepting

	return (
		<>
			{!mobile ? (
				<Link href='/online-ordering' onClick={toggleMenu}>
					<div className='bg-primary rounded-sm text-light font-black text-xl hover:scale-95 py-4 lg:py-2 shadow-lg shadow-primary/30 hover:shadow-none px-4 transition duration-500 text-center'>
						Online Ordering
					</div>
				</Link>
			) : (
				<Link href='/online-ordering' onClick={toggleMenu}>
					<div className=' text-center inline-block text-3xl uppercase text-primary border-x-2 underline underline-offset-4 decoration-1 decoration-wavy  border-primary font-bold w-full py-3 px-8 cursor-pointer '>
						Online Ordering
					</div>
				</Link>
			)}
		</>
	);
};

export default LinkIfActive;
