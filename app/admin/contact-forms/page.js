import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_ALL_CONTACT_FORMS_QUERY } from '@/data/queries/FETCH_ALL_CONTACT_FORMS_QUERY';
import ContactFormsList from '@/components/admin/ContactFormList';

export const metadata = {
  title: 'Admin - Contact Forms',
};

const ContactForms = async () => {
  const query = FETCH_ALL_CONTACT_FORMS_QUERY;
  const data = await sanityClient.fetch(query);

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-8'>Admin - Contact Forms</h1>
      <ContactFormsList initialData={data} />
    </div>
  );
};

export default ContactForms;

export const revalidate = 1
