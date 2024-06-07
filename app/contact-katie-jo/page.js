import { sanityClient } from '@/lib/sanityConnection';
import { FETCH_CONTACT_PAGE_QUERY } from '@/data/queries/FETCH_CONTACT_PAGE_QUERY';
import ContactForm from '@/components/contact/ContactForm';
import { MainHeading, SubHeading } from '@/components/utils/Typography';
import PageEntry from '@/components/utils/animations/PageEntry';
import Image from 'next/image';


export const metadata = {
  title: 'Hello There!',
};

const ContactUsPage = async () => {
  const query = FETCH_CONTACT_PAGE_QUERY;
  const dataAsArray = await sanityClient.fetch(query);
  const data = dataAsArray[0];

  

  return (
    <PageEntry className='grid gap-16 mt-8  max-w-7xl mx-auto'>
      <div className='grid gap-4 px-2'>
        <div className='grid place-items-center lg:w-1/2 mx-auto gap-4'>
          <Image src={data.landingImage} alt='Landing Image' width={200} height={200} className='rounded-sm mb-8 shadow-md shadow-primary/30' />
          <SubHeading
            title={data.introduction}
            type='dark'
          />
          <MainHeading title='-Katie Jo' />
        </div>
      </div>
      <ContactForm />
    </PageEntry>
  );
};

export default ContactUsPage;
