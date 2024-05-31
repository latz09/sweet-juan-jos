import ContactForm from '@/components/contact/ContactForm';
import { MainHeading } from '@/components/utils/Typography';
import PageEntry from '@/components/utils/animations/PageEntry';


export const metadata = {
	title: 'Hello There! ',
	
};


const ContactUsPage = () => {
	return (
		<PageEntry className='grid gap-16 mt-8 px-2 max-w-7xl mx-auto '>
			<div className='grid gap-6'>
				<MainHeading title={`Contact Sweet JuanJo's`} />
				<p className='text-center text-lg lg:text-xl font-bold lg:w-2/3 mx-auto'>
					We would love to hear from you. Please fill out the form below and we
					will get back to you as soon as possible.
				</p>
			</div>
			<ContactForm />
		</PageEntry>
	);
};

export default ContactUsPage;
