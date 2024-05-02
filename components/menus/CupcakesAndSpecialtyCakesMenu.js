import ButtonLink from '../utils/ButtonLink';
import { useState } from 'react';
import { SubHeading } from '../utils/Typography';
import { motion } from 'framer-motion';
import PdfDownload from '../utils/PdfDownload';

const CupcakesAndSpecialtyCakesMenu = ({ data }) => {
	const renderFlavorSection = (title, flavors) => (
		<div className='grid place-items-center gap-8 mx-2 text-center'>
			<SubHeading title={title} type='dark' />
			<FlavorList flavors={flavors} />
		</div>
	);

	return (
		<div className='grid gap-16 place-items-center font-bold text-center'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 place-items-cente max-w-7xl mx-auto'>
				{renderFlavorSection(data.cakeFlavors.title, data.cakeFlavors.flavors)}
				{renderFlavorSection(
					data.frostingFlavors.title,
					data.frostingFlavors.flavors
				)}
			</div>
			<PdfDownload
				title='View Latest Flavor Options'
				document='flavors'
				icon={true}
				
			/>
			<div className='grid gap-2'>
				<SubHeading title={data.subheading} type='dark' />
				<span className=' italic text-center mx-4'>{data.stipulation}</span>
			</div>

			<div className='grid gap-2'>
				<SubHeading title={data.sizes.title} type='dark' />
				<ul className='grid grid-cols-1 gap-2 text-lg'>
					{data.sizes.options.map((size, index) => (
						<li key={index}>{size}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CupcakesAndSpecialtyCakesMenu;

const FlavorList = ({ flavors }) => {
	// State to keep track of which elements have been viewed
	const [viewed, setViewed] = useState(new Array(flavors.length).fill(false));

	return (
		<ul className='grid grid-cols-2 place-items-center gap-4 text-lg'>
			{flavors.map((flavor, index) => (
				<motion.li
					key={index}
					initial={{ opacity: 0, y: 20, scale: 0 }}
					animate={viewed[index] ? { opacity: 1, y: 0, scale: 1 } : {}}
					transition={{ duration: 0.4, delay: index * 0.1 }}
					onViewportEnter={() => {
						// Update the state to mark this item as viewed
						setViewed((prevViewed) => {
							const updatedViewed = [...prevViewed];
							updatedViewed[index] = true;
							return updatedViewed;
						});
					}}
				>
					{flavor}
				</motion.li>
			))}
		</ul>
	);
};
