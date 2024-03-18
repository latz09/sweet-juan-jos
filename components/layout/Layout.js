import Footer from './Footer';
import Navigation from './Navigation';

const Layout = ({ children }) => {
	return (
		<div className=''>
			<Navigation />
			<div className="max-w-7l mx-auto">
				{children}
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
