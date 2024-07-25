import Image from 'next/image';

const DisplayItems = ({ data }) => {
	return (
		<div>
			<h2 className='text-2xl font-bold mb-8 '>Selected Display Items</h2>
			<div className='grid grid-cols-2 lg:grid-cols-3 place-items-center'>
				{data.map((item) => (
					<div key={item._id} className='grid place-items-center gap-3'>
					
							<Image
								src={item.imageUrl}
								alt={item.title}
								width={150}
                                height={150}
								className='rounded-sm shadow-lg'
							/>
						
						<div>
							<h3 className='text-xl font-bold'>{item.inventoryID}</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DisplayItems;
