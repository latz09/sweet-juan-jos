import { useEffect } from 'react';

const useNoScroll = (isActive) => {
	useEffect(() => {
		const html = document.documentElement;
		const body = document.body;

		if (isActive) {
			html.classList.add('no-scroll');
			body.classList.add('no-scroll');
		} else {
			html.classList.remove('no-scroll');
			body.classList.remove('no-scroll');
		}

		return () => {
			html.classList.remove('no-scroll');
			body.classList.remove('no-scroll');
		};
	}, [isActive]);
};

export default useNoScroll;
