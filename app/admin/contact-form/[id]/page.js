import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_CONTACT_FORM_BY_ID_QUERY } from '@/data/queries/FETCH_CONTACT_FORM_BY_ID_QUERY';
import ContactFormDetailsContent from '@/components/admin/ContactFormDetailsContent';

export const metadata = {
	title: 'Admin - Contact Form Details',
};

const ContactFormDetails = async ({ params }) => {
	const { id } = params;
	const query = FETCH_CONTACT_FORM_BY_ID_QUERY;
	const data = await sanityClient.fetch(query, { id });

	const eventDetails = data
		? [
				{
					label: 'Event Date',
					value: new Date(data.eventDate).toLocaleString(),
				},
				{ label: 'Amount', value: data.amount },
				{ label: 'Interests', value: data.interests.join(', ') },
				{ label: 'Additional Details', value: data.additionalDetails },
				{ label: 'Status', value: data.status },
				{ label: 'Sent At', value: new Date(data.sentAt).toLocaleString() },
			]
		: [];

	return (
		<ContactFormDetailsContent
			data={data}
			id={id}
			eventDetails={eventDetails}
		/>
	);
};

export default ContactFormDetails;

export const revalidate = 10;
