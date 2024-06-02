import ContactForm from '@/components/contact/ContactForm';
import { MainHeading, SubHeading } from '@/components/utils/Typography';
import PageEntry from '@/components/utils/animations/PageEntry';
import Image from 'next/image';
import contactImage from '@/public/images/contact-page.jpg';
export const metadata = {
	title: 'Hello There! ',
};

const ContactUsPage = () => {
	return (
		<PageEntry className='grid gap-16 mt-8 px-2 max-w-7xl mx-auto '>
			<div className='grid gap-4'>
				<div className='grid place-items-center  lg:w-1/2 mx-auto gap-4'>
					<Image src={contactImage} alt='' width={200} height={200} className="rounded-xl mb-8" />
					<SubHeading
						title='Feel free to fill out the form below and we will get back to you as
						soon as possible, thanks!'
						type='dark'
					/>

					<MainHeading title={'-Katie Jo'} />
				</div>
			</div>
			<ContactForm />
		</PageEntry>
	);
};

export default ContactUsPage;
