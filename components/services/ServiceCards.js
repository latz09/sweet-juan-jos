import Image from 'next/image';
// import { motion } from 'framer-motion';
import { MainHeading, SubHeading } from '../utils/Typography';
import Link from 'next/link';
import AnimateUp from '../utils/animations/AnimateUp';

const ServiceCards = ({ data }) => {
	return (
		<div className='max-w-5xl mx-auto '>
			<div className='grid place-items-center mb-12 '>
				<MainHeading title='Browse Our Best' type='dark' />
			</div>
			<div className='grid lg:grid-cols-2 gap- place-items-center gap-x-4 gap-y-12 '>
				{data.map((service) => (
					<div
						className='relative shadow-hover-image rounded-lg'
						key={service.title}
					>
						<Link href={service.link}>
							<Image
								src={service.imageUrl}
								alt={service.title}
								className='w-full h-auto rounded-lg '
								width={500}
								height={500}
							/>
							<div className='absolute bottom-0 left-0 w-full bg-light/80 p-2 lg:p-4 rounded-b-lg'>
								<h3 className='text-2xl lg:text-4xl  font-bold px-2 text-center'>
									{service.title}
								</h3>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default ServiceCards;

// <div className='max-w-7xl mx-auto '>
// 			<div className='grid place-items-center mb-12 '>
// 				<MainHeading title='Our Delicious Offerings' type='dark' />
// 			</div>
// 			<div className='grid lg:grid-cols-2 gap-24 place-items-center'>
// 				{data.map((service) => (
// 					<div
// 						key={service.title}
// 						className='shadow-lg shadow-primary/30 hover:shadow-none cursor-pointer lg:m-8'
// 					>
// 						<Link href={service.link} className='relative '>
// 							<Image
// 								src={service.imageUrl}
// 								alt={service.title}
// 								className=''
// 								width={500}
// 								height={500}
// 							/>

// 							<div className='absolute inset-0 flex items-start   justify-center  shadow-lg shadow-primary/30 text-light text-center w-full'>
// 								<div className='w-full bg-primary px-4 lg:px-16 py-4'>
// 									<SubHeading title={service.title} type='light' />
// 								</div>
// 							</div>
// 						</Link>
// 					</div>
// 				))}
// 			</div>
// 		</div>
