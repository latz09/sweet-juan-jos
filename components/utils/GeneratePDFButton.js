// GeneratePDFButton.js
'use client';
import generatePDF from '@/lib/generatePDF';

const GeneratePDFButton = ({ data }) => {
	console.log('Button data:', data);

	const handleClick = async () => {
		console.log('Button clicked');
		await generatePDF(data);
	};

	return (
		<button
			onClick={handleClick}
			className='mt-4 p-2 border border-primary/40 w-5/6 lg:w-1/2 mx-auto text-xl lg:text-2xl font-semibold rounded-sm shadow shadow-primary/20 lg:hover:border-primary/70 lg:hover:shadow-lg lg:hover:shadow-primary/40 transtion duration-700 lg:hover:bg-primary lg:hover:text-light'
		>
			Generate PDF Checklist
		</button>
	);
};

export default GeneratePDFButton;
