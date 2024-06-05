import DynamicHello from '@/components/thank-you-page/DynamicHello';
import { MainHeading } from '@/components/utils/Typography';
import { Suspense } from 'react';
export const metadata = {
	title: 'Thank You!',
};

const ThankYouPage = () => {
	return (
		<div className='max-w-5xl mx-auto h-[70vh] lg:h-[75vh] '>
			<div className='grid place-items-center h-full'>
				<div className='grid place-items-center gap-6'>
					<MainHeading title='Thank You!' type='dark' />
					<Suspense fallback={<div className="hidden">Loading...</div>}>
						<DynamicHello />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default ThankYouPage;
