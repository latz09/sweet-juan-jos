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
