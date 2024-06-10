import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_AVAILABLE_DISPLAY_ITEMS_QUERY } from '@/data/queries/FETCH_AVAILABLE_DISPLAY_ITEMS_QUERY';
import { MainHeading } from '@/components/utils/Typography';
import AvailableDisplayItems from '@/components/DisplayItems/AvailableDisplayItems';
import AnimateUp from '@/components/utils/animations/AnimateUp';

export const metadata = {
	title: 'Available Display Items',
};

const AvailableDisplayItemsPage = async () => {
	const query = FETCH_AVAILABLE_DISPLAY_ITEMS_QUERY;
	const data = await sanityClient.fetch(query);

	return (
		<div className='pt-4 lg:pt-16 grid gap-12 lg:gap-16 bg-gradient-to-b from-light via-primary/20 to-light'>
			<MainHeading title='Available Display Items' />
			<AnimateUp>
				<AvailableDisplayItems data={data} />
			</AnimateUp>
		</div>
	);
};

export default AvailableDisplayItemsPage;

export const revalidate = 10;
