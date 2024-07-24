import { MainHeading, Paragraph, SubHeading } from '../utils/Typography';
import { RiDoubleQuotesL } from 'react-icons/ri';

const Reviews = ({ data }) => {
	return (
		<div className='grid place-items-center gap-16 mt-12  bg-gradient-to-b from-dark/0 via-primary/20 to-dark/0'>
			<MainHeading title={`Happy Customers`} type='dark' />
			

			<div className='grid gap-24  '>
				{data.map((review, index) => (
					<Review key={index} review={review} />
				))}
			</div>
			
		</div>
	);
};

const Review = ({ review }) => {
	return (
		<div
			className='flex flex-col items-center gap-4  lg:px-1 lg:w-1/2 mx-auto text-xl text-primary  '
			
		>
			<div className='grid place-items-center text-center gap-8 font-black  px-4 lg:px-1 '>
				<div
					className=' text-5xl lg:text-6xl text-primary'
				
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
