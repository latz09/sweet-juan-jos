const ContactFormDetail = ({ label, value }) => {
	const isGridLayout = label === 'Interests' || label === 'Additional Details';

	return (
		<div className={`text-lg ${isGridLayout ? 'grid gap-1 my-4' : 'flex items-center gap-2 mb-2'}  `}>
			<span className='font-bold opacity-90 text-xl'>{label}:</span>
			<span className="font-semibold text-lg"> {value}</span>
		</div>
	);
};

export default ContactFormDetail;
