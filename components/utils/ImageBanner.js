import Image from 'next/image';
import ImageBannerContainer from './animations/ImageBannerContainer';

const ImageBanner = ({ images }) => {
	return (
		<div className='flex flex-wrap justify-center max-w-5xl mx-auto'>
			{images.map((image, index) => (
				<ImageBannerContainer key={index}>
					<Image
						src={image.url}
						alt={`Banner Image ${index + 1}`}
						width={500}
						height={500}
						// layout='responsive'
						className='lg:hover:scale-105 hover:z-20 hover:shadow-lg hover:shadow-primary/30 transition duration-700'
					/>
				</ImageBannerContainer>
			))}
		</div>
	);
};

export default ImageBanner;
