import { useState } from 'react';
import Spinner from '../spinner/Spinner';
import { destinationData } from '@/data/destinationData';

const HelpMeChoose = () => {
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  const handleImageLoad = () => setImagesLoaded((prevState) => prevState + 1);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Trending Destinations</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {destinationData.map((city, index) => (
          <div
            key={city}
            className='relative h-72 w-full rounded-xl shadow-xl overflow-hidden cursor-pointer transform group hover:scale-105 transition-all duration-300'
          >
            {imagesLoaded <= index && (
              <div className='absolute inset-0 flex items-center justify-center'>
                <Spinner />
              </div>
            )}
            <img
              src={`https://source.unsplash.com/400x400/?${city}`}
              alt={city}
              onLoad={handleImageLoad}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imagesLoaded > index ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {imagesLoaded > index && (
              <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50 text-white p-2 rounded-t-md font-serif text-xl font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                {city}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpMeChoose;
