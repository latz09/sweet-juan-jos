const LoadingOverlay = () => {
	return (
		<div className='fixed inset-0 bg-dark/70 backdrop-blur flex flex-col items-center justify-center z-[1000]'>
			<div className="loader mb-4 w-10 h-10 border-4 border-primary border-t-transparent border-dashed rounded-full animate-spin"></div>

			{/* You can replace this with a spinner */}
			<p className='text-light text-xl font-bold'>
				Gathering your information...
			</p>
		</div>
	);
};

export default LoadingOverlay;
