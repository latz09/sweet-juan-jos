import AnimateUp from '../utils/animations/AnimateUp';
import { MainHeading, SubHeading } from '../utils/Typography';

const Section = ({ title, items }) => (
	<AnimateUp>
		<section className='grid gap-2'>
			<div className='grid place-items-start'>
				<SubHeading title={title} type='dark' />
			</div>
			<div className='mx-8 my-2 grid gap-4'>
				{items.map((item, index) => (
					<div key={index}>
						<div className='flex items-center gap-4'>
							<span className='w-2 h-2 bg-primary rounded-full shadow-xl'></span>
							<div className='flex flex-col'>
								<h3 className='text-xl lg:text-2xl font-bold'>{item.title}</h3>
								<p className='text-lg lg:text-xl font-semibold'>
									{item.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	</AnimateUp>
);

const DisplayThingsToRemember = ({ data }) => {
	return (
		<div className='max-w-5xl mx-auto p-6 grid gap-8'>
			<div className=' mb-4 lg:mb-8'>
				<p className='text-xl lg:text-2xl font-bold text-center'>
					{data.introduction}
				</p>
			</div>

			<Section
				title='Choosing How Many Desserts to Order'
				items={data.choosingDesserts.map((item) => ({
					title: item.title,
					description: item.description,
				}))}
			/>
			<Section
				title='Choosing How Many Cupcake Flavor Varieties to Order'
				items={data.choosingFlavors.flavorSuggestion.map((item) => ({
					title: item.cupcakeQuantity,
					description: item.numberOfFlavors,
				}))}
			/>
			<Section
				title='Choosing a Dessert Display Table Size'
				items={data.choosingTableSize.tableSuggestion.map((item) => ({
					title: item.orderQuantity,
					description: item.tableSize,
				}))}
			/>

			<AnimateUp>
				<section className='grid gap-2'>
					<div className='grid place-items-start'>
						<SubHeading title='Delivery' type='dark' />
					</div>
					<div className='mx-8 my-2 grid gap-4'>
						{data.delivery.details.map((detail, index) => (
							<div key={index}>
								<div className='flex items-center gap-4'>
									<span className='w-2 h-2 bg-primary rounded-full shadow-xl'></span>
									<div className='flex flex-col'>
										<p className='text-lg lg:text-xl font-semibold'>{detail}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</AnimateUp>

			<AnimateUp>
				<section className='my-8 grid gap-4 lg:gap-8'>
					<div className='grid lg:place-items-start'>
						<MainHeading title='Additional Information' type='dark' />
					</div>
					<div className='grid gap-8 lg:w-5/6 mx-auto'>
						{data.additionalInformation.map((item, index) => (
							<div key={index} className='grid gap-4'>
								<h3 className='text-xl lg:text-2xl font-bold text-dark px-4 py-2 bg-primary/10 rounded-sm shadow-lg shadow-dark/10 text-center lg:text-strt'>
									{item.title}
								</h3>
								<p className='text-lg lg:text-xl font-bold mx-2 '>
									{item.description}
								</p>
							</div>
						))}
					</div>
				</section>
			</AnimateUp>
		</div>
	);
};

export default DisplayThingsToRemember;
