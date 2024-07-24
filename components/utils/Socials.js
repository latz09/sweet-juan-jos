import { FaFacebookF } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

const socialLinks = [
	{
		id: 'facebook',
		href: 'https://www.facebook.com/SweetJuanjos/',
		icon: <FaFacebookF />,
		label: 'Facebook', // Add accessible label
	},
	{
		id: 'instagram',
		href: 'https://www.instagram.com/sweetjuanjos/',
		icon: <AiFillInstagram />,
		label: 'Instagram', // Add accessible label
	},
];

const Socials = ({ includeText, color }) => {
	return (
		<div className='grid place-items-center gap-3'>
			{includeText && (
				<p className='font-bold text-2xl text-center mx-auto'>
					Stay connected for all things sweet!
				</p>
			)}
			<div
				className={`flex items-center gap-16 text-4xl ${color === 'light' ? 'text-light' : 'text-primary'}`}
			>
				{socialLinks.map(({ id, href, icon, label }) => (
					<a
						key={id}
						href={href}
						target='_blank'
						rel='noopener noreferrer'
						aria-label={label}
					>
						{icon}
					</a>
				))}
			</div>
		</div>
	);
};

export default Socials;
