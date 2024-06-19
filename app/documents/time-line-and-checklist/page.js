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
			<div className='grid gap-16 py-8 max-w-5xl mx-auto '>
				<div className='grid place-items-center gap-2'>
					<SubHeading title='Time Line and Checklist' type='dark' />
					<GeneratePDFButton data={data} />
				</div>
				<DisplaySteps data={data} />
			</div>
		</PageEntry>
	);
};

export default TimeLineAndChecklist;
