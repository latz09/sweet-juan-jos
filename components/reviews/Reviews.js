import { reviews } from '../../data/reviews';
import { MdFormatQuote } from 'react-icons/md';
import { BsFillChatSquareQuoteFill } from "react-icons/bs";

import { motion } from 'framer-motion';
import { Paragraph, SubHeading } from '../utils/Typography';
const Reviews = () => {
	return (
		<div className='grid gap-24 lg:gap-32 bg-dark py-24 lg:py-36'>
			{reviews.map((review, index) => (
				<Review key={index} review={review} />
			))}
		</div>
		// <div></div>
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
			className='flex flex-col items-center gap-4 px-2 lg:px-1 lg:w-1/2 mx-auto text-xl text-light '
			initial={{ y: 100 }}
			whileInView={{ y: 0 }}
			transition={{ duration: 1.1, delay: 0.1 }}
		>
			<motion.div
				className='text-primary text-3xl lg:text-5xl mb-4'
				variants={shakeAnimation}
				initial='initial'
				whileInView='animate'
			>
				<BsFillChatSquareQuoteFill />
			</motion.div>
			<div className="grid place-items-center text-center gap-8">
				<Paragraph content={review.review} type='light' />

				<SubHeading title={review.name} type='light' />
			</div>
		</motion.div>
	);
};

export default Reviews;
