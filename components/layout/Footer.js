import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/logo/transparent-juanjos.png';
import Socials from '../utils/Socials';
import { NavigationLinks } from '@/data/NavigationLinks';

import  { FooterWeddingNavigationLinks } from '../special-events/WeddingNavigationLinks';

const Footer = () => {
	return (
		<div className='grid lg:grid-cols-3 place-items-center gap-16 max-w-7xl mx-auto py-32 text-lg lg:text-2xl'>
			<div className='grid gap-8'>
				<Link href={'/'}>
					<Image src={logo} alt='logo' height={200} width={200} />
				</Link>
				<div className='grid gap-8 lg:gap-4'>
					<div className='grid place-items-center gap-2 text-2xl font-bold'>
						<a href='mailto:sweetjuanjos@gmail.com'>sweetjuanjos@gmail.com</a>
						<a href='tel:7155721681'>715 572-1681</a>
					</div>
					<div className='hidden lg:block mt-6'>
						<Socials />
					</div>
				</div>
			</div>

			<div>
				<ul className='grid gap-6 place-items-center'>
					{NavigationLinks.map((link) => (
						<li key={link.id}>
							<Link href={link.slug} className='text-dark'>
								<span className='md:hover:font-bold transition duration-700'>
									{' '}
									{link.name}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className='grid place-items-center gap-6'>
				<div>
					<FooterWeddingNavigationLinks />
				</div>

				<div className='lg:hidden mt-12'>
					<Socials />
				</div>
			</div>
		</div>
	);
};

export default Footer;
