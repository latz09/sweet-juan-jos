export const MainHeading = ({title, type}) => {
    switch (type) {
		case 'dark':
			type =
				'text-dark';
			break;
		case 'light':
			type = 'text-light';
			break;
	}

    return (
        <div>
            <h1 className={`text-6xl lg:text-7xl font-bold text-center  ${type}`}>{title}</h1>
        </div>
    );
}

export const SubHeading = ({title, type}) => {
    switch (type) {
		case 'dark':
			type =
				'text-dark';
			break;
		case 'light':
			type = 'text-light';
			break;
	}

    return (
        <div>
            <h3 className={`text-3xl lg:text-4xl  font-bold px-2 ${type}`}>{title}</h3>
        </div>
    );
}


export const Paragraph = ({content, type}) => {
    switch (type) {
        case 'dark':
            type =
                'text-dark';
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
            <p className={`leading-8 lg:leading-10 text-2xl lg:text-4xl   ${type}`}>{content}</p>
        </div>
    );
}