import { MainHeading, SubHeading } from '../utils/Typography';

const CookieMenu = ({ cookieOptions, specialtyFlavors }) => {
	return (
		<div className='max-w-6xl mx-auto grid gap-10 lg:gap-20'>
			<div className='opacity-70'>
				<MainHeading title='Prices per dozen' type='dark' />
			</div>
			<div className=' grid gap-16 lg:gap-24 '>
				<Cookies cookieOptions={cookieOptions} />
				<SpecialtyCookeMenu specialtyFlavors={specialtyFlavors} />
			</div>
		</div>
	);
};

export default CookieMenu;

const Cookies = ({ cookieOptions }) => {
	return (
		<div className='flex flex-col md:flex-row md:flex-wrap gap-y-5 lg:gap-y-12 justify-center items-start'>
			{cookieOptions.map((cookie, index) => {
				// Using Tailwind's responsive classes to adjust the layout on different screen sizes
				let widthClass = 'md:w-1/2 w-full'; // Stack on small screens, half width on medium and up

				// Always centering items since they're full width on small screens
				let justifyContent = 'justify-center';

				return (
					<div
						key={index}
						className={`px-2  grid place-items-center ${widthClass}  ${justifyContent}`}
					>
						<div className='grid gap-1 place-items-center w-full '>
							<div className='flex items-center justify-between lg:justify-start  lg:gap-8 bordr w-full'>
								<SubHeading title={cookie.title} />
								<span className='font-bold text-2xl'>${cookie.price}+</span>
							</div>
							{cookie.description && (
								<p className='text-xl font-semibold'>{cookie.description}</p>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

const SpecialtyCookeMenu = ({ specialtyFlavors }) => {
	return (
		<div className='grid gap-6 lg:gap-12 mb-4 lg:mb-8'>
			<MainHeading title='Specialty Cookie Flavors' type='primary' />
			<div className='flex flex-wrap items-center justify-cente gap-y-4 lg:gap-y-12 mx-auto text-center font-bold '>
				{specialtyFlavors.map((cookie, index) => {
					return (
						<div key={index} className='w-full lg:w-1/2 '>
							<div className='flex items-center justify-center gap-2 '>
								<div className='text-xl md:text-2xl xl:text-3xl'>
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
