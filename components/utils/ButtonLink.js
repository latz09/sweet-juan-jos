import Link from 'next/link';

const ButtonLink = ({ title, type, href }) => {
	switch (type) {
		case 'primary':
			type =
				'bg-dark text-light  shadow-lg shadow-dark/50 border border-light/60 hover:border-dark hover:shadow-sm  hover:bg-light hover:text-dark';
			break;
		case 'secondary':
			type = 'bg-primary text-light hover:bg-light hover:text-dark hover:border hover:border-primary	';
			break;
	}

	return (
		<>
			<Link href={href}>
				<div className='grid place-items-center'>
					<button
						className={`py-3  px-8  font-bold text-2xl lg:text-3xl rounded-sm hover:scale-95 transition duration-700 ${type}`}
					>
						{title}
					</button>
				</div>
			</Link>
		</>
	);
};

export default ButtonLink;
