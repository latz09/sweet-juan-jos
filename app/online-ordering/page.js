import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ONLINE_ORDERING_SETTINGS_QUERY } from '@/data/queries/online-ordering/FETCH_ONLINE_ORDERING_SETTINGS_QUERY';
import { FETCH_AVAILABLE_CATEGORIES_QUERY } from '@/data/queries/online-ordering/FETCH_AVAILABLE_CATEGORIES_QUERY';
import PageEntry from '@/components/utils/animations/PageEntry';
import OrderingPage from '@/components/online-ordering/OrderingPage';

const OnlineOrdering = async () => {
	const [settings, categories] = await Promise.all([
		sanityClient.fetch(FETCH_ONLINE_ORDERING_SETTINGS_QUERY),
		sanityClient.fetch(FETCH_AVAILABLE_CATEGORIES_QUERY),
	]);

	
	return (
		<PageEntry>
			<OrderingPage settings={settings} categories={categories} />
		</PageEntry>
	);
};

export default OnlineOrdering;

export const revalidate = 10