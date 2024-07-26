import Image from 'next/image';
import { SubHeading } from '../utils/Typography';
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import AnimateUp from '../utils/animations/AnimateUp';

const MenuItem = ({ title, image, link }) => {
	return (
		<AnimateUp>
			<li className=' grid place-items-center  '>
				<div
					className='relative lg:hover:scale-95 shadow-lg lg:rounded-sm shadow-primary/30 lg:hover:shadow-primary/80 transition duration-700  '
					key={title}
				>
					<Link href={`${link}`} className='group'>
						<Image
							src={image}
							alt={title}
							className='w-full h-auto lg:rounded-lg '
							width={400}
							height={400}
						/>
						<div className='absolute bottom-0  right-0 w-full ml-2 bg-light/90 lg:rounded-b-lg   '>
							<h3 className='text-lg xl:text-xl  font-bold  text-center px-4 py-2 text-dark'>
								{title}
							</h3>
						</div>
						<div className='absolute top-1 right-1 p-2 rounded-full  m-2 bg-light/70 transform transition-transform duration-700 group-hover:translate-x-4 '>
							<FaLongArrowAltRight className='text-xl text-dark/50 ' />
						</div>
					</Link>
				</div>
			</li>
		</AnimateUp>
	);
};

export default MenuItem;
