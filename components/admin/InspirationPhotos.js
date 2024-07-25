import Image from 'next/image';

const InspirationPhotos = ({ photos }) => (
  <div>
    <h2 className="text-2xl font-semibold mt-4">Inspiration Photos:</h2>
    <div className="grid lg:grid-cols-3 gap-4 mt-4 place-items-center">
      {photos.map((photo, index) => (
        <div key={index} className="relative ">
          <Image
            src={photo}
            alt={`Inspiration Photo ${index + 1}`}
            className="rounded-md shadow-md"
            height={200}
            width={200}
          />
        </div>
      ))}
    </div>
  </div>
);

export default InspirationPhotos;
