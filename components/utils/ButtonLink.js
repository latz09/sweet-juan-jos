import Link from 'next/link';

const ButtonLink = ({ title, type, href }) => {
	switch (type) {
		case 'primary':
			type =
				'bg-primary text-light  shadow-lg  rounded-md hover:shadow-lg shadow-dark/40  hover:bg-light hover:text-dark';
			break;
		case 'secondary':
			type =
				'text-dark bg-gradient-to-b from-light/50 via-light/70 to-light/50 border border-light/40 shadow-lg shadow-dark/40 hover:bg-light/80 transition duration-700	';
			break;
	
	}

	return (
		<>
			<Link href={href}>
				<div className='grid place-items-center'>
					<button
						className={`py-3  px-8  font-bold text-2xl lg:text-4xl  hover:scale-95 transition duration-700 ${type}`}
					>
						{title}
					</button>
				</div>
			</Link>
		</>
	);
};

export default ButtonLink;
