import Image from 'next/image';
import logo from '../../public/images/logo.png';
import Socials from './Socials';
const LogoDisplay = () => {
	return (
		<div className='grid place-items-center gap-8 '>
			<div className=' w-1/2 lg:w-1/5 mx-auto '>
				<Image src={logo} alt='logo' />
			</div>
			<div className="grid place-items-center gap-8">
				<Socials />
				<button className='py-3 px-16 bg-light text-dark border border-primary font-bold text-lg lg:text-xl rounded-full shadow shadow-primary/50 hover:bg-primary hover:text-light  transition duration-700'>
					Order Now
				</button>
			</div>
		</div>
	);
};

export default LogoDisplay;
