import DynamicHello from "@/components/thank-you-page/DynamicHello";

export const metadata = {
	title: 'Thank You!',
};

const ThankYouPage = () => {
	return (
		<div className='max-w-5xl mx-auto h-[70vh] lg:h-[75vh] '>
			<DynamicHello />
		</div>
	);
};

export default ThankYouPage;
