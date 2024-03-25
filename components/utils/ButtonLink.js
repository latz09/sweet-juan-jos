import Link from 'next/link';

const ButtonLink = ({ title, type, href }) => {
	switch (type) {
		case 'primary':
			type =
				'bg-dark text-light  shadow-lg shadow-primary/50 hover:shadow-sm hover:border-dark/0 hover:bg-light hover:text-primary';
			break;
		case 'secondary':
			type = 'bg-light text-dark hover:bg-primary hover:text-light';
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
