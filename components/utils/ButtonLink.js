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
				'text-dark bg-gradient-to-b from-light/50 via-light/70 to-light/50  shadow-lg shadow-primary/40 hover:bg-light/80 transition duration-700 w-full	';
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
			<Link href={'online-ordering'}>
				<div className='grid place-items-center space-y-2'>
					<button className='py-3 px-8 font-bold text-2xl lg:text-4xl hover:scale-95 transition duration-700 text-dark bg-primary shadow-lg shadow-light/40 hover:bg-primary/80 w-full'>
						Order Now
					</button>
					<p className='text-dark font-bold uppercase tracking-wide text-xs lg:text-sm italic -mt-1'>
						Limited Menu Available
					</p>
				</div>
			</Link>
		</FadeInAndRotate>
	);
};