import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_CONTACT_PAGE_QUERY } from '@/data/queries/FETCH_CONTACT_PAGE_QUERY';
import { FETCH_ACTIVE_TERMS_AND_CONDITIONS_QUERY } from '@/data/queries/FETCH_ACTIVE_TERMS_AND_CONDITIONS_QUERY';
import ContactForm from '@/components/contact/ContactForm';
import { MainHeading, SubHeading } from '@/components/utils/Typography';
import PageEntry from '@/components/utils/animations/PageEntry';
import Image from 'next/image';
import AnimateUp from '@/components/utils/animations/AnimateUp';

export const metadata = {
	title: 'Hello There!',
};

const ContactUsPage = async () => {
	const query = FETCH_CONTACT_PAGE_QUERY;
	const dataAsArray = await sanityClient.fetch(query);
	const data = dataAsArray[0];

	const termsAndConditionsquery = FETCH_ACTIVE_TERMS_AND_CONDITIONS_QUERY;
	const termsAndConditionsDataAsArray = await sanityClient.fetch(termsAndConditionsquery);
	const termsAndConditionsData = termsAndConditionsDataAsArray[0];
	

	return (
		<PageEntry className='grid gap-16 lg:gap-20 mt-8 lg:mt-12  max-w-5xl mx-auto'>
			<div className='grid gap-4 px-2 '>
				<div className='grid place-items-center lg:grid-cols-3 mx-auto gap-4'>
					<Image
						src={data.landingImage}
						alt='Landing Image'
						width={250}
						height={250}
						className='lg:col-span-1 w-1/2 lg:w-3/4  rounded mb-8 lg:mb-0 shadow-md shadow-primary/30'
					/>
					<div className='gap-2 grid lg:col-span-2 '>
						<MainHeading title={data.heading} />
						<SubHeading title={data.introduction} type='dark' />
						<div className='mt-2'>
							<SubHeading title='-Katie Jo' />
						</div>
					</div>
				</div>
			</div>
			<AnimateUp>
				<ContactForm termsAndConditionsData={termsAndConditionsData}/>
			</AnimateUp>
		</PageEntry>
	);
};

export default ContactUsPage;

export const revalidate = 10;
