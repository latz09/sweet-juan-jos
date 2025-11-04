import { MainHeading, SubHeading } from '../utils/Typography';
import { CookieAndCandyMenu } from './CandyAndTreatsMenu';

const CookieMenu = ({ cookieOptions, specialtyFlavors }) => {
	return (
		<div className='max-w-6xl mx-auto grid gap-4 lg:gap-12 w-full'>
			<MainHeading title='Prices per dozen' type='primary' />

			<div className=' grid gap-24 lg:gap-24  '>
				{/* <Cookies cookieOptions={cookieOptions} /> */}
				<CookieAndCandyMenu data={cookieOptions} />

				<SpecialtyCookeMenu specialtyFlavors={specialtyFlavors} />
			</div>
		</div>
	);
};

export default CookieMenu;

const SpecialtyCookeMenu = ({ specialtyFlavors }) => {
	return (
	  <div className='grid gap-4 lg:gap-12 mb-4 lg:mb-8 text-center'>
		<MainHeading title='Specialty Cookie Flavors' type='primary' />
		<div className='flex flex-wrap items-center justify-center gap-y-4 lg:gap-y-12 mx-auto text-center font-bold w-full'>
		  {specialtyFlavors.map((cookie, index) => {
			const isLastOdd = specialtyFlavors.length % 2 !== 0 && index === specialtyFlavors.length - 1;
			return (
			  <div
				key={index}
				className={`w-full ${isLastOdd ? 'lg:w-full flex justify-center' : 'lg:w-1/2'} ${
				  index % 2 !== 0
					? 'bg-primary/10 shadow-sm lg:shadow-none lg:bg-light'
					: 'bg-primary/0 lg:bg-light'
				} py-12 lg:py-0`}
			  >
				<div className='grid lg:flex items-center justify-center gap-2'>
				  <div className='text-2xl lg:text-3xl font-bold'>
					{cookie.cookieFlavor}
				  </div>
  
				  {cookie.priceUpcharge && (
					<p className='text-2xl font-bold text-primary'>
					  ${cookie.priceUpcharge}+
					</p>
				  )}
				</div>
			  </div>
			);
		  })}
		</div>
	  </div>
	);
  };
  
 
  