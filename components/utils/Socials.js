import { FaFacebookF } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

const socialLinks = [
	{
		id: 'facebook',
		href: 'https://www.facebook.com/SweetJuanjos/',
		icon: <FaFacebookF />,
	},
	{
		id: 'instagram',
		href: 'https://www.instagram.com/sweetjuanjos/',
		icon: <AiFillInstagram />,
	},
];

const Socials = ({includeText}) => {
	return (
		<div className='grid place-items-center gap-4'>
			<div className='flex items-center gap-16 text-4xl text-primary'>
				{socialLinks.map(({ id, href, icon }) => (
					<a key={id} href={href} target='_blank' rel='noopener noreferrer'>
						{icon}
					</a>
				))}
			</div>
			{
				includeText && <p className='font-bold text-base text-center mx-4'>
				Join our sweet journey on social media for all the latest treats.
			</p>
			}
		
		</div>
	);
};

export default Socials;
