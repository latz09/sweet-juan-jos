import './globals.css';

import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { Josefin_Slab } from 'next/font/google';

const josefinSlab = Josefin_Slab({
	// style: 'normal',
	// weight: '800, 700', // Specify the weights and styles you need
	// display: 'swap',
	subsets: ['latin'],
});

export const metadata = {
	metadataBase: new URL('https://www.sweetjuanjos.com/'),
	title: {
		default: 'Sweet Juanjos',
		template: `%s | Sweet Juanjos`,
	},
	description: `Sweet Juanjo's specialize's in cupcakes, custom cakes, and cookies. All our products are created in our licensed kitchen, and are made to order. Contact us to discuss your vision for your next celebration.`,
	twitter: {
		card: 'summary_large_image',
	},
};

const RootLayout = ({ children }) => {
	return (
		<html lang='en'>
			<body className={`${josefinSlab.className}  text-dark`}>
				<Navigation />
				<div className='max-w-7l mx-auto '>
					<div>{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
