import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";


const Socials = () => {
	return (
		<div className='flex items-center gap-8 text-4xl text-primary'>
			<div>
				<a href='https://www.facebook.com/SweetJuanjos/' target='_blank' rel='noopener noreferrer' >
                    <FaFacebookF />
                </a>
			</div>
			<div>
				<a href='https://www.instagram.com/sweetjuanjos/' target='_blank' rel='noopener noreferrer' >
                    <AiFillInstagram />
                </a>
			</div>
		</div>
	);
};

export default Socials;
