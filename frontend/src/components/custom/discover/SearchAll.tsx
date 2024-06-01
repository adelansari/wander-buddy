import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import WeatherCard from '../weather/WeatherCard';
import NoSearchResult from '@/assets/empty.png';

const SearchAll = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [weatherData, setWeatherData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const weatherCardRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    setHasError(false);
    try {
      const weatherResponse = await axios.get(`${import.meta.env.VITE_BACKEND_WEATHER_URL}/api/weather`, {
        params: {
          location: searchValue,
        },
      });
      const weatherData = weatherResponse.data;
      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'An unknown error occurred.';
      if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
        errorMessage = (error as any).response.data.message;
      }
      console.error('Error message:', errorMessage);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'City not found.',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
      setWeatherData(null);
      setHasError(true);
    }
  };

  useEffect(() => {
    if (weatherData && weatherCardRef.current) {
      weatherCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [weatherData]);

  return (
    <div className='p-4'>
      <h1 className='text-3xl text-center mb-4'>Where to?</h1>
      <div className='flex items-center'>
        <Input
          value={searchValue}
          onChange={handleInput}
          placeholder='Search city'
          className='location-search-input border p-2 rounded'
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {weatherData ? (
        <div ref={weatherCardRef}>
          <WeatherCard weatherData={weatherData} />
        </div>
      ) : hasError ? (
        <img src={NoSearchResult} alt='No results found' className='mx-auto w-80 mt-20' />
      ) : null}
    </div>
  );
};

export default SearchAll;
