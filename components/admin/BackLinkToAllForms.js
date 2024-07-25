import { MdOutlineArrowBack } from 'react-icons/md';
import Link from 'next/link';


const BackLinkToAllForms = () => {
	return (
		<div className='grid place-items-center mb-3'>
			<Link href='/admin/contact-forms'>
				<span className='text-primary text-xl grid place-items-center gap-1 font-bold'>
					<MdOutlineArrowBack className='inline-block text-2xl mr-2' />
					<span className='text-primary opacity-80'>Back to Contact Forms</span>
				</span>
			</Link>
		</div>
	);
};

export default BackLinkToAllForms;
