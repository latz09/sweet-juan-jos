import Image from 'next/image';
import { MainHeading, SubHeading } from '../utils/Typography';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';

const AvailableDisplayItemsBlurb = ({ data }) => {
	return (
		<Link href={'/available-display-items'}>
			<div className='py-16 grid  gap-12 place-items-center  max-w-5xl mx-auto '>
				<div className='grid gap-2 place-items-center '>
					<MainHeading title={data.heading} />
					<SubHeading title={data.subHeading} />
					<ViewOurInventory />
				</div>
			</div>
		</Link>
	);
};

export default AvailableDisplayItemsBlurb;

const ViewOurInventory = () => {
	return (
		<div className=' flex items-center gap-4 group p-4'>
			<span className='text-xl lg:text-2xl font-bold text-primary transform transition-transform duration-300 group-hover:text-dark'>
				View Our Inventory
			</span>
			<span className='pl-2 transform transition-transform duration-300 group-hover:translate-x-4 group-hover:text-primary'>
				<FaLongArrowAltRight />
			</span>
		</div>
	);
};
