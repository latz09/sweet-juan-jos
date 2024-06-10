import Image from 'next/image';
import { MainHeading, SubHeading } from '../utils/Typography';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';

const AvailableDisplayItemsBlurb = ({ data }) => {
	return (
		<Link href={'/'}>
			<div className='py-16 grid lg:grid-cols-4 gap-12 place-items-center  max-w-5xl mx-auto '>
				<div className='lg:col-span-3 grid gap-2 place-items-center '>
					<MainHeading title={data.heading} />
					<SubHeading title={data.subHeading} />

					<div className='hidden lg:block'>
						<ViewOurInventory />
					</div>
				</div>
				<div className='grid place-items-center'>
					<Image
						src={data.availableDisplayItemsImage}
						alt='Available Display Items'
						width={200}
						height={200}
					/>
					<div className='block lg:hidden'>
						<ViewOurInventory />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default AvailableDisplayItemsBlurb;

const ViewOurInventory = () => {
	return (
		<div className=' flex items-center gap-4 group p-4'>
			<span className='text-xl lg:text-2xl font-bold transform transition-transform duration-300 group-hover:text-primary'>
				View Our Inventory
			</span>
			<span className='pl-2 transform transition-transform duration-300 group-hover:translate-x-4'>
				<FaLongArrowAltRight />
			</span>
		</div>
	);
};
