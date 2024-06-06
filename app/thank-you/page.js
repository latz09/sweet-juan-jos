import DynamicHello from '@/components/thank-you-page/DynamicHello';
import { MainHeading } from '@/components/utils/Typography';
import { Suspense } from 'react';


export const metadata = {
	title: 'Thank You!',
};

const ThankYouPage = () => {
    return (
      <div className='max-w-5xl mx-auto h-[70vh] lg:h-[75vh]'>
        <div className='grid place-items-center h-full'>
          <div className='flex flex-col gap-6'>
            <div className='h-1/3'>
            
                
              <MainHeading title='Thank You!' type='dark' />
            </div>
            <div className='h-2/3'>
              <Suspense fallback={<div className='h-full'><Placeholder /></div>}>
                <DynamicHello />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const Placeholder = () => (
    <div className='grid place-items-center h-full'>
      <div className='text-center grid gap-3'>
        <div className='h-8 w-40 bg-gray-200 rounded'></div>
        <div className='h-4 w-60 bg-gray-200 rounded mt-2'></div>
        <div className='h-4 w-40 bg-gray-200 rounded mt-2'></div>
        <div className='mt-8'>
          <div className='h-10 w-40 bg-gray-200 rounded'></div>
        </div>
      </div>
    </div>
  );
  
  export default ThankYouPage;
