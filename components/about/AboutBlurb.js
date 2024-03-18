import Image from 'next/image';
import trebzPortrait from '../../public/images/about/trebz.webp';

const AboutBlurb = () => {
	return (
		<div className='max-w-5xl mx-auto grid gap-12 '>
			<div className='grid place-items-center '>
				<span className='text-5xl '>Meet Jo</span>
				<span className='text-2xl'>{`The 'Jo' in Juanjo's`}</span>
			</div>
			<div className=' mx-auto grid lg:grid-cols-3 gap-x-16  borde'>
				<Image
					src={trebzPortrait}
					alt='Trebz'
					className='w-1/2 lg:w-full mx-auto border-2 border-primary/40 rounded shadow-lg shadow-primary/50'
				/>
				<div className='lg:col-span-2 place-self-center text-center lg:text-justify'>
					<h4 className='text-3xl mt-12 lg:mt-0'>{`Hi!, I'm Katie Jo, the founder of Sweet Juanjo's!`}</h4>
					<div className='grid gap-2 mt-4'>
						<p className='leading-7 lg:leading-8'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus
							viverra adipiscing at in tellus integer.
						</p>
						<p className='leading-7 lg:leading-8'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus
							viverra adipiscing at in tellus integer.
						</p>
						<div className='grid place-items-center mt-8'>
							<button className="text-primary font-bold underline underline-offset-4">Our Story</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutBlurb;
