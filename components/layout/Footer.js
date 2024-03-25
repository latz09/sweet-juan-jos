import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo/transparent-juanjos.png';
import Socials from '../utils/Socials';
import { NavigationLinks } from '@/data/NavigationLinks';

const Footer = () => {
	return (
		<div className='grid lg:grid-cols-3 place-items-center gap-16 max-w-7xl mx-auto py-32 text-lg lg:text-2xl'>
			<div className=''>
				<Image src={logo} alt='logo' height={200} width={200} />
			</div>

			<div>
				<ul className='grid gap-6 place-items-center'>
					{NavigationLinks.map((link) => (
						<li key={link.id}>
							<Link href={link.slug} className='text-dark'>
								<span> {link.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className='grid place-items-center gap-6'>
				<div>
					<Socials />
				</div>
				<div className='grid place-items-center gap-1'>
					<div>sweetjuanjos@gmail.com</div>
					<div>715 572-1681</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
