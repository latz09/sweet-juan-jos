import ButtonLink from '../utils/ButtonLink';
// import { useState } from 'react';
import { MainHeading, SubHeading } from '../utils/Typography';
// import { motion } from 'framer-motion';
import PdfDownload from '../utils/PdfDownload';
import AnimateUp from '../utils/animations/AnimateUp';

const CupcakesAndSpecialtyCakesMenu = ({
	cakeFlavors,
	frostingFlavors,
	smallCakeSizes,
	cupcakePrice,
}) => {
	return (
		<div className='grid gap-8 lg:gap-20'>
			<MainHeading title='Choose Your Flavor' type='dark' />

			<Flavors
				cakeFlavors={cakeFlavors}
				frostingFlavors={frostingFlavors}
				title='Cake Flavors'
				price={cupcakePrice}
			/>

			<SmallCakeSizes sizes={smallCakeSizes} />
		</div>
	);
};

export default CupcakesAndSpecialtyCakesMenu;

const Flavors = ({ cakeFlavors, frostingFlavors, price }) => {
	return (
		<div className='grid gap-16'>
			<AnimateUp>
				<div className='grid lg:flex items-center lg:gap-16 justify-around w-full max-w-7xl mx-auto '>
					<FlavorList flavors={cakeFlavors} title='Cake Flavors' />
					<FlavorList
						flavors={frostingFlavors}
						title='Frosting Options'
						background='other'
					/>
				</div>
			</AnimateUp>
			<AnimateUp>
				<div className='grid place-items-center gap-2 lg:gap-4 lg:mt-8'>
					<MainHeading title='Cupcakes' type='dark' />
					<SubHeading title={`$${price} / dozen`} type='dark' />
					<FlavorExplanation />
				</div>
			</AnimateUp>
		</div>
	);
};

const FlavorList = ({ flavors, title, background }) => {
	return (
		<div
			className={`grid gap-4 h-full lg:border border-primary/50 rounded-sm place-items-center lg:w-1/2   shadow shadow-primary/5 lg:shadow-primary/20  text-dark font-bold  pb-8 ${background === 'other' ? 'bg-primary/5 lg:bg-primary/10' : 'bg-primary/10 '}`}
		>
			<div className='bg-dar  w-full text-center pb-4 pt-6 border-b border-primary/20 '>
				<SubHeading title={title} type='dark' />
			</div>
			<ul className='grid grid-cols-2 place-items-center gap-x-16 gap-y-8 lg:gap-y-6 p-4'>
				{flavors.map((flavor, index) => {
					const isLastOdd =
						flavors.length % 2 !== 0 && index === flavors.length - 1;
					return (
						<li
							key={index}
							className={`text-xl lg:text-2xl text-dark/90 text-center ${isLastOdd ? 'col-span-2' : ''}`}
						>
							{flavor}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

const FlavorExplanation = () => {
	return (
		<div className=' mb-12 lg:mb-3 grid place-items-center text-center'>
			<SubHeading title='One Flavor Combination per Dozen' type='dark' />
			<p className='italic font-bold text-lg  w-4/5 mx-auto text-center mt-2'>
				** Minimum two dozen.
			</p>
		</div>
	);
};

const SmallCakeSizes = ({ sizes }) => {
	return (
		<AnimateUp>
			<div className='grid gap-4 font-bold'>
				<div className='grid place-items-center gap-1 lg:gap-2'>
					<MainHeading title='Small Cake Sizes' type='dark' />
					<div className=' mb-12 grid '>
						<SubHeading title='One Flavor Combination per Dozen' type='dark' />
						<p className='italic font-bold text-lg  w-4/5 mx-auto text-center mt-2'>
							* Flavors available with cupcakes only. Not available for
							specialty cakes.
						</p>
					</div>
				</div>
				<div className='grid gap-8 place-items-center '>
					<ul className='grid place-items-center lg:gap-y-8 gap-y-1 bg-primary/10 lg:bg-primary/0 '>
						{sizes.map((size, index) => (
							<li
								key={index}
								className='text-lg lg:text-2xl text-center flex items-center justify-between gap-24 w-full bg-primary/5 lg:bg-primary/0 px-8 py-6 lg:py-4 lg:p-0 text-dark shadow-sm lg:shadow-none '
							>
								<span className=' text-2xl lg:text-3xl'>{size.size}</span>
								<span>${size.price}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</AnimateUp>
	);
};
