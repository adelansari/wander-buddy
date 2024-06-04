import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import { destinationData } from '@/data/destinationData';
import wikipedia from 'wikipedia';

const HelpMeChoose = () => {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [citySummary, setCitySummary] = useState<string>('');
  const [loadError, setLoadError] = useState<boolean>(false);
  const navigate = useNavigate();

  const selectRandomCity = async () => {
    const randomCity = destinationData[Math.floor(Math.random() * destinationData.length)];
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
    <div className='flex flex-col items-center w-full p-4'>
      <h2 className='text-3xl font-extrabold mb-6'>Surprise Destination</h2>

      <div className='grid md:grid-cols-2 gap-6 w-full bg-gray-900 p-6 rounded-md shadow-lg'>
        {citySummary && (
          <div className='p-4 text-white bg-gray-800 rounded-md h-72 overflow-y-auto'>
            <h1
              className='text-2xl font-semibold mb-2 cursor-pointer hover:underline'
              onClick={() => handleGridItemClick(selectedCity)}
              tabIndex={0}
              role='button'
              aria-label={`Explore ${selectedCity}`}
            >
              {selectedCity}
            </h1>
            <p className='text-sm'>{citySummary}</p>
          </div>
        )}
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
              className={`w-full h-full object-cover transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
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
      </div>

      <button
        onClick={selectRandomCity}
        className='mt-8 px-8 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
      >
        Show Random City
      </button>
    </div>
  );
};

export default HelpMeChoose;
