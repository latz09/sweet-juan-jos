import ButtonLink from '../utils/ButtonLink';
import {useState} from 'react';
import { SubHeading } from '../utils/Typography';
import {motion} from 'framer-motion';

const CupcakesAndSpecialtyCakesMenu = ({ data }) => {
	const renderFlavorSection = (title, flavors) => (
		<div className='grid place-items-center gap-8 mx-2'>
			<SubHeading title={title} type='dark' />
			<FlavorList flavors={flavors} />
			{/* <div className="mt-16"> */}
			
			{/* </div> */}
		</div>
	);

	return (
		<div className='grid gap-12 place-items-center font-bold'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 place-items-cente max-w-7xl mx-auto'>
				{renderFlavorSection(data.cakeFlavors.title, data.cakeFlavors.flavors)}
				{renderFlavorSection(
					data.frostingFlavors.title,
					data.frostingFlavors.flavors
				)}
			</div>
			<span className=' italic'>{data.stipulation}</span>
            <SubHeading title={data.subheading} type='dark' />
            <ButtonLink
					title='Request Order Now'
					type='secondary'
					href='/sweet-juanjos/contact-us'
				/>
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
                    initial={{ opacity: 0, x: -100, scale: 0 }}
                    animate={viewed[index] ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onViewportEnter={() => {
                        // Update the state to mark this item as viewed
                        setViewed(prevViewed => {
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
