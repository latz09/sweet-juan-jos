import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ONLINE_ORDERING_SETTINGS_QUERY as query } from '@/data/queries/online-ordering/FETCH_ONLINE_ORDERING_SETTINGS_QUERY';
import CheckoutPage from '@/components/checkout/CheckoutPage';


const OnlineOrderCartPage = async () => {
	const settings = await sanityClient.fetch(query);

	return (
		<div>
			<div className='relative z-10'>
				<CheckoutPage settings={settings} />
			</div>
		</div>
	);
};

export default OnlineOrderCartPage;

export const revalidate = 10;
