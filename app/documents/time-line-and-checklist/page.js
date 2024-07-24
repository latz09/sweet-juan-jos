import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ACTIVE_EVENT_DESSERT_CHECKLIST_QUERY } from '@/data/queries/FETCH_ACTIVE_EVENT_DESSERT_CHECKLIST_QUERY';
import DisplaySteps from '@/components/TimeLineAndChecklist/DisplaySteps';
import { MainHeading, SubHeading } from '@/components/utils/Typography';
import GeneratePDFButton from '@/components/utils/GeneratePDFButton';
import PageEntry from '@/components/utils/animations/PageEntry';

const TimeLineAndChecklist = async () => {
	const query = FETCH_ACTIVE_EVENT_DESSERT_CHECKLIST_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];

	return (
		<PageEntry>
			<div className='grid gap-16 lg:gap-24 '>
				<div className='grid place-items-center gap-2 bg-gradient-to-l from-primary via-primary/80 to-primary py-12'>
					<SubHeading title='Time Line and Checklist' type='light' />
					<GeneratePDFButton data={data} />
				</div>
				<div className='max-w-5xl mx-auto grid gap-10 lg:gap-12'>
					<SubHeading title="The Sweet Juanjo's Way" />
					<DisplaySteps data={data} />
				</div>
			</div>
		</PageEntry>
	);
};

export default TimeLineAndChecklist;

export const revalidate = 10;
