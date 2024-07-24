import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ACTIVE_TIPS_AND_REMINDERS_QUERY } from '@/data/queries/FETCH_ACTIVE_TIPS_AND_REMINDERS_QUERY';
import { MainHeading} from '@/components/utils/Typography';
import PageEntry from '@/components/utils/animations/PageEntry';

import DisplayThingsToRemember from '@/components/things-to-remember/DisplayThingsToRemember';
import GeneratePDFButtonForTips from '@/components/utils/GeneratePDFButtonForTips';

const ThingsToRemember = async () => {
	const query = FETCH_ACTIVE_TIPS_AND_REMINDERS_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];

	return (
		<PageEntry>
			<div className='grid gap-4 lg:gap-8 '>
				
				<div className='py-12 grid gap-2 place-items-center bg-gradient-to-l from-primary via-primary/80 to-primary'>
					<MainHeading title='Things to Remember' type='light' />
					<GeneratePDFButtonForTips data={data} />
				</div>

				<div className='max-w-5xl mx-auto '>
					<DisplayThingsToRemember data={data} />
				</div>
			</div>
		</PageEntry>
	);
};

export default ThingsToRemember;

export const revalidate = 10;
