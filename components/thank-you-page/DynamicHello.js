'use client';


import { useSearchParams } from 'next/navigation';
import { SubHeading } from '../utils/Typography';
import Link from 'next/link';

const DynamicHello = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'there';

  return (
    <div className='grid place-items-center '>
      <div className='text-center grid gap-3'>
        <SubHeading title={`Thank you, ${name}, for your request`} />
        <p className='text-xl lg:text-2xl'>
          We will get back to you shortly
        </p>
        <div className='mt-8'>
          <Link href='/'>
            <span className='text-xl font-semibold px-8 py-4 border border-primary/40 sm:hover:bg-dark/10 sm:hover:border-none sm:hover:scale-95 transition duration-700'>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicHello;