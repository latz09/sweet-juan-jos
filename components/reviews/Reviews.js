import { reviews } from '../../data/reviews';
import { MdFormatQuote } from 'react-icons/md';
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';
import { GiCupcake } from 'react-icons/gi';

import { motion } from 'framer-motion';
import { MainHeading, Paragraph, SubHeading } from '../utils/Typography';
const Reviews = () => {
	return (
		<div className='grid place-items-center gap-16 py-24 lg:py-36'>
			<MainHeading title={`Happy Customers`} type='dark' />
			<div className='grid gap-24  '>
				{reviews.map((review, index) => (
					<Review key={index} review={review} />
				))}
			</div>
		</div>
	);
};

const shakeAnimation = {
	initial: { rotate: 0 },
	animate: {
		rotate: [0, 10, -10, 10, -10, 0], // Rotate degrees; tweak for desired effect
		transition: {
			duration: 1, // Duration of one shake cycle; adjust for the desired speed of shaking
			repeat: Infinity, // Repeat the animation indefinitely
			repeatType: 'loop', // Loop the animation
			ease: 'linear', // Linear easing for consistent shake speed
			repeatDelay: 1.5, // Delay between each shake cycle to achieve a total of 2 seconds with the animation
		},
	},
};

const Review = ({ review }) => {
	return (
		<motion.div
			className='flex flex-col items-center gap-4  lg:px-1 lg:w-1/2 mx-auto text-xl text-primary  '
			initial={{ y: 100 }}
			whileInView={{ y: 0 }}
			transition={{ duration: 1.1, delay: 0.1 }}
		>
			<div className='place-self-start  hidden lg:block'>
				<SubHeading title={`${review.name} -`} type='dark' />
			</div>
			<div className='grid place-items-center text-center gap-8 font-black bg-gradient-to-l from-dark via-dark/80 to-dark px-4 lg:px-8 pt-12 pb-8 shadow-lg shadow-primary/60 border-y lg:border-x border-dark lg:rounded'>
				{/* <motion.div
				className=' text-6xl lg:text-7xl text-light'
				variants={shakeAnimation}
				initial='initial'
				whileInView='animate'
			>
				<GiCupcake />
			</motion.div> */}
				<Paragraph content={`" ${review.review} "`} type='light' />
				<div className="block lg:hidden">
					<SubHeading title={`-${review.name}`} type='light' />
				</div>
			</div>
		</motion.div>
	);
};

export default Reviews;
