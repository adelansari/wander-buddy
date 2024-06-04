import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import { destinationDataLong } from '@/data/destinationDataLong';

const HelpMeChoose = () => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loadError, setLoadError] = useState<boolean>(false);
  const navigate = useNavigate();

  const selectRandomCity = () => {
    const randomCity = destinationDataLong[Math.floor(Math.random() * destinationDataLong.length)];
    setSelectedCity(randomCity);
    setImagesLoaded(false);
    setLoadError(false);
  };

  useEffect(() => {
    selectRandomCity();
  }, []);

  const handleImageLoad = () => setImagesLoaded(true);
  const handleImageError = () => setLoadError(true);

  const handleGridItemClick = (city: string) => {
    navigate(`/discover/details/${city}`);
  };

  return (
    <div className='flex flex-col items-center w-full'>
      <h2 className='text-2xl font-bold mb-4 gap-4'>Your Surprise</h2>
      
        <div className='grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {selectedCity ? (
            <div
              className='relative h-72 w-full rounded-xl shadow-xl overflow-hidden cursor-pointer transform group hover:scale-105 transition-all duration-300'
              onClick={() => handleGridItemClick(selectedCity)}
              role='button'
              aria-label={`Explore ${selectedCity}`}
              tabIndex={0}
            >
              {!imagesLoaded && !loadError && <Spinner />}
              <img
                src={`https://source.unsplash.com/400x400/?${selectedCity}`}
                alt={selectedCity}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              {imagesLoaded && !loadError && (
                <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50 text-white p-2 rounded-t-md font-serif text-xl font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                  {selectedCity}
                </div>
              )}
              {loadError && (
                <div className='absolute inset-0 flex justify-center items-center bg-gray-200 text-gray-500'>
                  Image failed to load
                </div>
              )}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
    
        <button
          onClick={selectRandomCity}
          className='mt-6 px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300'
        >
          Show Random City
        </button>
    
    </div>
  );
};

export default HelpMeChoose;