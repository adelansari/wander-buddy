import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wikipedia from 'wikipedia';
import { destinationDataLong } from '@/data/destinationDataLong';
import Spinner from '../spinner/Spinner';
import { Button } from '@/components/ui/button';

const SurpriseMe = () => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [citySummary, setCitySummary] = useState<string>('');
  const [loadError, setLoadError] = useState<boolean>(false);
  const navigate = useNavigate();

  const selectRandomCity = async () => {
    const randomCity = destinationDataLong[Math.floor(Math.random() * destinationDataLong.length)];
    setSelectedCity(randomCity);
    setImagesLoaded(false);
    setLoadError(false);

    try {
      const summary = await wikipedia.summary(randomCity);
      setCitySummary(summary.extract);
    } catch (error) {
      setCitySummary('Error fetching city summary.');
    }
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
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Feeling Adventurous?</h2>

      <div className='grid md:grid-cols-2 gap-6 w-full bg-gray-100 dark:bg-gray-900 p-6 rounded-md shadow-lg'>
        {selectedCity ? (
          <div
            className='relative h-72 w-full mx-auto rounded-xl shadow-xl overflow-hidden cursor-pointer transform group hover:scale-105 transition-transform duration-300 flex items-center justify-center'
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
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imagesLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {imagesLoaded && !loadError && (
              <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-60 text-white p-2 font-serif text-xl font-bold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
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
        {citySummary && (
          <div className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md h-72 overflow-y-scroll'>
            <h1
              className='text-2xl font-semibold mb-2 cursor-pointer hover:underline'
              onClick={() => handleGridItemClick(selectedCity)}
              tabIndex={0}
              role='button'
              aria-label={`Explore ${selectedCity}`}
            >
              {selectedCity}
            </h1>
            <p className='text-sm text-gray-600 dark:text-gray-300'>{citySummary}</p>
          </div>
        )}
      </div>

      <div className='mt-4'>
        <Button onClick={selectRandomCity}>Show Random City</Button>
      </div>
    </div>
  );
};

export default SurpriseMe;
