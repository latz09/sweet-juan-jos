import AnimateUp from '../utils/animations/AnimateUp';
import { MainHeading, SubHeading } from '../utils/Typography';

const CandyAndTreatsMenu = ({ data }) => {
	return (
		<div className='lg:mx-auto grid gap-8 lg:gap-16'>
			<div className='opacity-70'>
				<MainHeading title='Prices per dozen' type='dark' />
			</div>
			<CookieAndCandyMenu data={data} />
		</div>
	);
};

export default CandyAndTreatsMenu;

export const CookieAndCandyMenu = ({ data }) => {
	return (
	  <div className='grid lg:grid-cols-2 lg:gap-x-24 lg:gap-y-12 place-items-center lg:mx-auto '>
		{data.map((item, index) => {
		  const isLastOdd = data.length % 2 !== 0 && index === data.length - 1;
		  return (
			<AnimateUp key={index} className={`w-full ${isLastOdd ? 'lg:col-span-2 flex justify-center' : ''}`}>
			  <div
				className={`grid place-items-center lg:flex items-center w-full lg:gap-12 ${
				  index % 2 !== 0
					? 'bg-primary/10 shadow-sm lg:shadow-none lg:bg-light'
					: 'bg-primary/0 lg:bg-light'
				} py-12 lg:py-0`}
			  >
				<h2 className='text-2xl lg:text-3xl font-bold flex flex-col text-center w-full'>
				  <span>{item.title}</span>
				  {item.description && (
					<div className='w-full'>
					  <p className='text-lg lg:text-lg'>{item.description}</p>
					</div>
				  )}
				</h2>
  
				<div className='text-2xl font-bold text-primary mt-2 lg:mt-0'>
				  ${item.price}+
				</div>
			  </div>
			</AnimateUp>
		  );
		})}
	  </div>
	);
  };
  