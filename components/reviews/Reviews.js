import { motion } from 'framer-motion';
import Image from 'next/image';
import { MainHeading, Paragraph, SubHeading } from '../utils/Typography';
import { RiDoubleQuotesL } from 'react-icons/ri';
const shakeAnimation = {
	initial: { rotate: 0 },
	animate: {
		rotate: [0, 10, -10, 10, -10, 0], // Rotate degrees; tweak for desired effect
		transition: {
			duration: 1, // Duration of one shake cycle; adjust for the desired speed of shaking
			repeat: Infinity, // Repeat the animation indefinitely
			repeatType: 'loop', // Loop the animation
			ease: 'linear', // Linear easing for consistent shake speed
			repeatDelay: 1, // Delay between each shake cycle to achieve a total of 2 seconds with the animation
		},
	},
};
const Reviews = ({ data, imageUrl }) => {
	return (
		<div className='grid place-items-center gap-16 mt-12  bg-gradient-to-b from-dark/0 via-primary/20 to-dark/0'>
			<MainHeading title={`Happy Customers`} type='dark' />
			

			<div className='grid gap-24  '>
				{data.map((review, index) => (
					<Review key={index} review={review} />
				))}
			</div>
			<Image src={imageUrl} alt='Reviews' height={350} width={350} className="shadow-lg shadow-primary/40 rounded-lg" />
		</div>
	);
};

const Review = ({ review }) => {
	return (
		<div
			className='flex flex-col items-center gap-4  lg:px-1 lg:w-1/2 mx-auto text-xl text-primary  '
			initial={{ y: 100 }}
			whileInView={{ y: 0 }}
			transition={{ duration: 1.1, delay: 0.1 }}
		>
			<div className='grid place-items-center text-center gap-8 font-black  px-4 lg:px-1 '>
				<div
					className=' text-5xl lg:text-6xl text-primary'
					variants={shakeAnimation}
					initial='initial'
					whileInView='animate'
				>
					<RiDoubleQuotesL />
				</div>{' '}
				<Paragraph content={`${review.review}"`} type='dark' />
				<SubHeading title={`-${review.author}`} type='dark' />
			</div>
		</div>
	);
};

export default Reviews;
