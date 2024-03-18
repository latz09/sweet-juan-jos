import { reviews } from "../../data/reviews";
import { BsChatSquareQuoteFill } from "react-icons/bs";

const Reviews = () => {
    
    return (
      <div className="grid gap-16 bg-dark py-24">
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    // <div></div>
    );
  };
  
  const Review = ({ review }) => {
    return (
      <div className='flex flex-col items-center gap-4 px-2 lg:px-1 lg:w-1/2 mx-auto text-xl text-light'>
        <div className="text-primary text-3xl ">
        <BsChatSquareQuoteFill />
        </div>
        <p className='text-center leading-7 lg:leading-8'>{review.review}</p>
        <p className='text-primary font-semibold'>- {review.name}</p>
      </div>
    );
  };
  
  export default Reviews;