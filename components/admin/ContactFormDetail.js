const ContactFormDetail = ({ label, value }) => (
	<div className='text-lg flex items-center gap-2 mb-2'>
		<span className='font-bold opacity-90 text-xl'>{label}:</span>
		<span className="font-semibold text-lg"> {value}</span>
	</div>
);

export default ContactFormDetail;
