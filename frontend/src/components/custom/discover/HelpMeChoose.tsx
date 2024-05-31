import { useState } from 'react';
import { destinationData } from '@/data/destinationData';
import { Card } from '@/components/ui/card';

const HelpMeChoose = () => {
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  const handleImageLoad = () => {
    setImagesLoaded((prevState) => prevState + 1);
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Trending Destinations</h2>
      <Card className='p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {destinationData.map((city, index) => (
            <Card key={city} className='group relative h-72 w-full rounded-xl shadow-xl overflow-hidden'>
              <img
                src={`https://source.unsplash.com/400x400/?${city}`}
                alt={city}
                onLoad={handleImageLoad}
                className={`animate-fade-in block h-full w-full object-cover object-center transition duration-300 ${
                  imagesLoaded > index ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-110`}
              />
              <div className='absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110'>
                <h1 className='font-serif text-2xl font-bold text-white shadow-xl bg-black bg-opacity-30 p-2 rounded'>
                  {city}
                </h1>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HelpMeChoose;
