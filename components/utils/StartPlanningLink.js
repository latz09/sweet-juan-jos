import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
const StartPlanningLink = () => {
	return (
		<Link href='/contact-katie-jo'>
			<div className='text-primary px-4 py-2 rounded-sm group flex items-center cursor-pointer transition duration-300 text-xl lg:text-2xl font-bold text-center '>
				<span className='group-hover:text-dark '>Start Planning</span>
				<FaLongArrowAltRight className='pl-2 transform transition-transform duration-300 group-hover:translate-x-4' />
			</div>
		</Link>
	);
};

export default StartPlanningLink;
