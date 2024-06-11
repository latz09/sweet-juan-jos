import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
const StartPlanningLink = () => {
	return (
		<Link href='/contact-katie-jo'>
			<div className='text-primary px-4 py-2 rounded-sm group flex items-center cursor-pointer  text-xl lg:text-2xl font-bold text-center '>
				<span className='lg:group-hover:text-dark '>Start Planning</span>
				<FaLongArrowAltRight className='pl-2 transform transition-transform duration-300 text-dark lg:group-hover:translate-x-4 lg:group-hover:text-primary' />
			</div>
		</Link>
	);
};

export default StartPlanningLink;
