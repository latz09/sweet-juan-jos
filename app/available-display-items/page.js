import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_AVAILABLE_DISPLAY_ITEMS_QUERY } from '@/data/queries/FETCH_AVAILABLE_DISPLAY_ITEMS_QUERY';
import { SubHeading } from '@/components/utils/Typography';
import AvailableDisplayItems from '@/components/DisplayItems/AvailableDisplayItems';

export const metadata = {
  title: 'Available Display Items',
};

const AvailableDisplayItemsPage = async () => {
  const query = FETCH_AVAILABLE_DISPLAY_ITEMS_QUERY;
  const data = await sanityClient.fetch(query);

  return (
    <div className='grid gap-12 lg:gap-16'>
      <SubHeading title='Available Display Items' />
      <AvailableDisplayItems data={data} />
    </div>
  );
};

export default AvailableDisplayItemsPage;

export const revalidate = 10;
