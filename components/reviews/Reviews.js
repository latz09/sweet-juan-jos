import { reviews } from '../../data/reviews';
import { MdFormatQuote } from 'react-icons/md';
import { FaQuoteLeft } from 'react-icons/fa6';
import { GiCupcake } from 'react-icons/gi';

import { motion } from 'framer-motion';
import { MainHeading, Paragraph, SubHeading } from '../utils/Typography';
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
const Reviews = () => {
	return (
		<div className='grid place-items-center gap-24 py-24 lg:py-36 bg-gradient-to-b from-dark/0 via-primary/5 to-dark/0'>
			<div className='grid place-items-center gap-8'>
				<div
					className=' text-5xl lg:text-7xl text-primary'
					// variants={shakeAnimation}
					// initial='initial'
					// whileInView='animate'
				>
					<GiCupcake />
				</div>{' '}
				<MainHeading title={`Happy Customers`} type='dark' />
			</div>
			<div className='grid gap-24  '>
				{reviews.map((review, index) => (
					<Review key={index} review={review} />
				))}
			</div>
		</div>
	);
};

const Review = ({ review }) => {
	return (
		<motion.div
			className='flex flex-col items-center gap-4  lg:px-1 lg:w-1/2 mx-auto text-xl text-primary  '
			initial={{ y: 100 }}
			whileInView={{ y: 0 }}
			transition={{ duration: 1.1, delay: 0.1 }}
		>
			<div className='grid place-items-center text-center gap-8 font-black  px-4 lg:px-1 '>
				<motion.div
					className=' text-3xl lg:text-5xl text-primary'
					variants={shakeAnimation}
					initial='initial'
					whileInView='animate'
				>
					<FaQuoteLeft />
				</motion.div>{' '}
				<Paragraph content={`${review.review}"`} type='dark' />
				<SubHeading title={`-${review.name}`} type='dark' />
			</div>
		</motion.div>
	);
};

export default Reviews;
