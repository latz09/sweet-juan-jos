import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ONLINE_ORDERING_AVAILABILITY as onlineOrderingQuery } from '@/data/queries/online-ordering/FETCH_ONLINE_ORDERING_AVAILABILITY';

import { FETCH_PROMOTION_POP_UP_QUERY as promotionPopupQuery } from '@/data/queries/FETCH_PROMOTION_POP_UP_QUERY';

import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { Josefin_Slab } from 'next/font/google';
import PopUpManager from '@/components/popups/PopUpManager';
import ToastContainer from '@/components/utils/animations/ToastContainer';


const josefinSlab = Josefin_Slab({
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

const RootLayout = async ({ children }) => {
	const promotions = await sanityClient.fetch(promotionPopupQuery);
	const onlineOrdering = await sanityClient.fetch(onlineOrderingQuery);

	const acceptingOrders = onlineOrdering[0]?.acceptingOrders ?? false;
	const activePromotions = promotions && promotions.length > 0 ? promotions : null;

	return (
		<html lang='en'>
			<body className={`${josefinSlab.className}  text-dark`}>

				<Navigation acceptingOrders={acceptingOrders} />
			
				{/* <PopUpManager promotions={activePromotions} acceptingOrders={acceptingOrders} /> */}
				
				<div className='max-w-7l mx-auto '>
					<div>{children}</div>
					<ToastContainer />
					<Footer />
				</div>
			
				<Analytics />
			</body>
		</html>
	);
};

export default RootLayout;