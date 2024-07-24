// GeneratePDFButtonForTerms.js
'use client';
import generatePDFForTerms from '@/lib/generatePDFForTerms';

const GeneratePDFButtonForTerms = ({ data }) => {

  const handleClick = async () => {
    console.log('Button clicked');
    generatePDFForTerms(data);
  };

  return (
    <button
      onClick={handleClick}
      className='mt-4 p-2 border border-light w-5/6 lg:w-1/3 text-dark bg-light mx-auto text-xl lg:text-2xl font-semibold rounded-sm shadow shadow-primary/20 lg:hover:border-primary/70 lg:hover:shadow-lg lg:hover:shadow-primary/40 transtion duration-700 lg:hover:bg-light lg:hover:text-dark'
    >
      Download Terms & Conditions PDF 
    </button>
  );
};

export default GeneratePDFButtonForTerms;
