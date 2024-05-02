import { FaCloudDownloadAlt } from 'react-icons/fa';

const PdfDownload = ({ title, document, icon }) => {
	let href;

	switch (document) {
		case 'pricing':
			href =
				'https://drive.google.com/uc?export=download&id=13S0MxxiklSx4GN0VAhnVlpontiGAqO5F';
			break;
		case 'flavors':
			href =
				'https://drive.google.com/uc?export=download&id=1zpwifbYSeIytCyIv4p2u4pVJW1FfniBt';
			break;
		case 'checklist':
			href =
				'https://drive.google.com/uc?export=download&id=1HqaE7vyOrHh73VTKGfNDYIZcGryxveUK';
			break;
	}

	return (
		<div className=''>
			<a href={href} download>
				<button className='text-2xl font-bold flex gap-4 items-center hover:scale-95 hover:opacity-90 transition duration-700 text-primary'>
					<span>{title}</span>
					<span className={`${icon ? 'text-3xl' : 'hidden'}`}>
						<FaCloudDownloadAlt />
					</span>
				</button>
			</a>
		</div>
	);
};

export default PdfDownload;
