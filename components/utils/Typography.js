export const MainHeading = ({ title, type }) => {
	switch (type) {
		case 'dark':
			type = 'text-dark';
			break;
		case 'light':
			type = 'text-light';
			break;
		case 'primary':
			type = 'text-primary font-bold';
			break;
	}

	return (
		<div>
			<h1 className={`text-4xl lg:text-6xl font-bold text-center   ${type}`}>
				{title}
			</h1>
		</div>
	);
};

export const SubHeading = ({ title, type }) => {
	switch (type) {
		case 'dark':
			type = 'text-dark';
			break;
		case 'light':
			type = 'text-light';
			break;
		case 'primary':
			type = 'text-primary font-bold';
			break;
	}

	return (
		<div>
			<h3
				className={`text-2xl lg:text-4xl  font-bold px-2 text-center ${type} `}
			>
				{title}
			</h3>
		</div>
	);
};

export const Paragraph = ({ content, type }) => {
	switch (type) {
		case 'dark':
			type = 'text-dark';
			break;
		case 'light':
			type = 'text-light';
			break;
		case 'primary':
			type = 'text-primary font-bold';
			break;
	}

	return (
		<div>
			<p
				className={`leading-9 lg:leading-[3rem] text-xl lg:text-3xl   ${type}`}
			>
				{content}
			</p>
		</div>
	);
};
