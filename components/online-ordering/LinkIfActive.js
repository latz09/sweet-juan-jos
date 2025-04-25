import Link from 'next/link';

const LinkIfActive = ({ acceptingOrders, toggleMenu }) => {
	if (!acceptingOrders) return null; // Hide if not accepting

	return (
		<Link href='/online-ordering' onClick={toggleMenu}>
			<div className='bg-primary rounded-sm text-light font-black text-xl hover:scale-95 py-4 lg:py-2 shadow-lg shadow-primary/30 hover:shadow-none px-4 transition duration-500 text-center'>
				Online Ordering
			</div>
		</Link>
	);
};

export default LinkIfActive;
