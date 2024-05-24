import ButtonLink from '../utils/ButtonLink';
// import { useState } from 'react';
import { MainHeading, SubHeading } from '../utils/Typography';
// import { motion } from 'framer-motion';
import PdfDownload from '../utils/PdfDownload';

const CupcakesAndSpecialtyCakesMenu = ({
	cakeFlavors,
	frostingFlavors,
	smallCakeSizes,
	cupcakePrice,
}) => {
	return (
		<div className='grid gap-8 lg:gap-24'>
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
			<div className='grid lg:flex items-center gap-4 lg:gap-16 justify-around w-full max-w-7xl mx-auto '>
				<FlavorList flavors={cakeFlavors} title='Cake Flavors' />
				<FlavorList flavors={frostingFlavors} title='Frosting Options' />
			</div>
			
			<div className='grid place-items-center'>
				<MainHeading title={`$${price} / dozen`} type='dark' />
				<FlavorExplanation />
			</div>
		</div>
	);
};

const FlavorList = ({ flavors, title }) => {
	return (
		<div className='grid gap-4 place-items-center lg:w-1/2  bg-primary/10 shadow shadow-primary/10  text-dark font-bold  pb-8'>
			<div className='bg-dar  w-full text-center pb-4 pt-6 border-b border-primary/20 '>
				<SubHeading title={title} type='dark' />
			</div>
			<ul className='grid grid-cols-2 place-items-center gap-x-16 gap-y-8 lg:gap-y-6 p-4 '>
				{flavors.map((flavor, index) => (
					<li key={index} className='text-2xl text-center'>
						{flavor}
					</li>
				))}
			</ul>
		</div>
	);
};

const FlavorExplanation = () => {
	return (
		<div className='mt-8 mb-12 lg:mb-3 grid place-items-center gap-2 text-center'>
			<SubHeading
				title='One Flavor Combination per Dozen / per Cake'
				type='dark'
			/>
			<p className='italic font-bold text-lg'>
				* Flavors available with cupcakes only. Not available for specialty
				cakes.
			</p>
		</div>
	);
};

const SmallCakeSizes = ({ sizes }) => {
	return (
		<div className='grid gap-8 font-bold'>
			<MainHeading title='Small Cake Sizes' type='dark' />
			<div className='grid gap-8 place-items-center'>
				<ul className='grid place-items-center gap-y-8'>
					{sizes.map((size, index) => (
						<li
							key={index}
							className='text-2xl text-center flex items-center justify-between gap-24 w-full'
						>
							<span className='text-3xl'>{size.size}</span>
							<span>${size.price}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
