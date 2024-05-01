import ContactForm from '@/components/contact/ContactForm';
import { MainHeading } from '@/components/utils/Typography';

const ContactUs = () => {
	return (
		<div className='grid gap-16 mt-8 px-2 max-w-7xl mx-auto '>
			<div className="grid gap-6">
				<MainHeading title={`Contact Sweet JuanJo's`} />
				<p className='text-center text-lg lg:text-xl font-bold'>
					We would love to hear from you. Please fill out the form below and we will get back to you as soon as
					possible.
				</p>
			</div>
			<ContactForm />
		</div>
	);
};

export default ContactUs;
