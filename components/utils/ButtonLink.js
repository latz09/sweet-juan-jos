import Link from 'next/link';
import FadeInAndRotate from './animations/FadeInAndRotate';

const ButtonLink = ({
	title = 'Request an Order',
	type,
	href = '/contact-katie-jo',
}) => {
	switch (type) {
		case 'primary':
			type =
				'text-light bg-primary  shadow-lg shadow-primary/30 border border-primary hover:bg-light/80 transition duration-700';
			break;
		case 'secondary':
			type =
				'text-dark bg-gradient-to-b from-light/50 via-light/70 to-light/50 border border-light/40 shadow-lg shadow-dark/40 hover:bg-light/80 transition duration-700	';
			break;
	}

	return (
		<>
			<Link href={href}>
				<div className='grid place-items-center '>
					<button
						className={`py-3  px-8  font-bold text-2xl lg:text-4xl  hover:scale-95 transition duration-700  ${type}`}
					>
						{title}
					</button>
				</div>
			</Link>
		</>
	);
};

export default ButtonLink;

export const OnlineOrderingLandingButton = () => {
	return (
		<FadeInAndRotate>
			<div className='mt-6 px-2'>
				<Link href={'online-ordering'}>
					<div className='grid place-items-center space-y-1'>
						<button className=' text-dark font-black text-2xl uppercase'>
							Online Ordering Now Available!
						</button>

						<p className='text-dark font-bold uppercase tracking-wide text-sm lg:text-base pb-2'>
							Limited Menu Available — Order Today for Friday!
						</p>
						<p className=' px-4 py-1 bg-dark rounded-sm text-light font-bold uppercase'>
							View Menu
						</p>
					</div>
				</Link>
			</div>
		</FadeInAndRotate>
	);
};
