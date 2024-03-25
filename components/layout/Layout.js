import Meta from '../meta/Meta';
import Footer from './Footer';
import Navigation from './Navigation';

const Layout = ({ children }) => {
	return (
		<>
			<Meta />
			<Navigation />
			<div className='max-w-7l mx-auto'>
				{children}
				<Footer />
			</div>
		</>
	);
};

export default Layout;
