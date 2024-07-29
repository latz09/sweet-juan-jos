// GeneralContract.js
import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ACTIVE_TERMS_AND_CONDITIONS_QUERY } from '@/data/queries/FETCH_ACTIVE_TERMS_AND_CONDITIONS_QUERY';

import { MainHeading } from '@/components/utils/Typography';
import PageEntry from '@/components/utils/animations/PageEntry';
import TermsAndConditionsIntro from '@/components/terms-and-conditions/TermsAndConditionsIntro';
import Terms from '@/components/terms-and-conditions/Terms';
import GeneratePDFButtonForTerms from '@/components/utils/GeneratePDFButtonForTerms';

const GeneralContract = async () => {
	const query = FETCH_ACTIVE_TERMS_AND_CONDITIONS_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];

	return (
		<PageEntry>
			<div className='grid gap-4 lg:gap-8 '>
				<div className='py-12 grid gap-2 place-items-center bg-gradient-to-l from-primary via-primary/80 to-primary'>
					<MainHeading title='Terms & Conditions' type='light' />
					<GeneratePDFButtonForTerms data={data} />
				</div>

				<div className='max-w-5xl mx-auto px-4 grid gap-8 lg:gap-12'>
					<TermsAndConditionsIntro data={data.intro} />
					<Terms data={data.terms} />
				</div>
			</div>
		</PageEntry>
	);
};

export default GeneralContract;

export const revalidate = 10;
