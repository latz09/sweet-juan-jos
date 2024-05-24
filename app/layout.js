import './globals.css';

import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { Josefin_Slab } from 'next/font/google';


const josefinSlab = Josefin_Slab({
    // style: 'normal',
    // weight: '800, 700', // Specify the weights and styles you need
    // display: 'swap',
    subsets: ['latin']
  });

  export const metadata = {
	metadataBase: new URL('https://sweet-juan-jos.vercel.app/'),
	title: {
		default: 'Sweet JuanJos',
		template: `%s | Sweet JuanJos`,
	},
	description:
		`Sweet Juanjo's Bakery in Stevens Point, WI, offers expertly crafted cupcakes, specialty cakes, and cookies perfect for weddings and special events. All treats are made-to-order in our licensed kitchen. Call or visit to bring your celebration vision to life!`,
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
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
};

export default RootLayout;
