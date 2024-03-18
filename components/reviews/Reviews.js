import { reviews } from '../../data/reviews';
import { MdFormatQuote } from "react-icons/md";
import { motion } from 'framer-motion';
const Reviews = () => {
	return (
		<div className='grid gap-16 bg-dark py-24'>
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
		rotate: [0, 5, -5, 5, -5, 0], // Rotate degrees; tweak for desired effect
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
		<div
			className='flex flex-col items-center gap-4 px-2 lg:px-1 lg:w-1/2 mx-auto text-xl text-light'
     
		>
			<motion.div className='text-primar text-4xl '  variants={shakeAnimation}
      initial='initial'
      whileInView='animate'>
				< MdFormatQuote />
			</motion.div>
			<p className='text-center leading-7 lg:leading-8'>{review.review}</p>
			<p className='text-primary font-semibold'>- {review.name}</p>
		</div>
	);
};

export default Reviews;
