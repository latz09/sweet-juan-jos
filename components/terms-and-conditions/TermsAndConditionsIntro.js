const TermsAndConditionsIntro = ({ data }) => {
	return (
		<div className='grid gap-2 text-center lg:text-start lg:gap-4 py-4'>
			{data.map((item, index) => (
				<div key={index} className=''>
					<h2
						className={`${index === 0 ? 'text-center font-bold mb-2 text-2xl lg:text-3xl  ' : 'text-lg lg:text-2xl font-semibold italic'}`}
					>
						{item}
					</h2>
				</div>
			))}
		</div>
	);
};

export default TermsAndConditionsIntro;
