import Image from 'next/image';

const DisplayItems = ({ data }) => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-8 '>Selected Display Items</h2>
      <div className="grid lg:grid-cols-2 place-items-center">
      {data.map(item => (
        <div key={item._id} className='flex items-center mb-4'>
          <div className='relative w-32 h-32 mr-4'>
            <Image
              src={item.imageUrl}
              alt={item.title}
              layout='fill'
              objectFit='cover'
              className='rounded'
            />
          </div>
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
