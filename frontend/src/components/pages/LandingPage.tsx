import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import WeatherCard from '../custom/weather/WeatherCard';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

const LandingPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [weatherData, setWeatherData] = useState(null);
  const weatherCardRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Get weather forecast from Symfony backend
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
        description: errorMessage,
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {
    if (weatherData && weatherCardRef.current) {
      weatherCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [weatherData]);

  return (
    <div className='p-4'>
      <h1 className='text-3xl text-center mb-4'>Your Pocket-sized Pathfinder.</h1>
      <p className='mb-4'>
        Wander Buddy is your one-stop destination for all your travel needs. Discover, Forecast, and Craft your
        adventure!
      </p>
      <h2 className='text-2xl mb-4'>Features</h2>
      <ul className='list-disc list-inside mb-4'>
        <li>Search for destinations</li>
        <li>View real-time weather forecasts</li>
        <li>Plan your travel itinerary</li>
      </ul>
      <div className='flex items-center'>
        <Input
          value={searchValue}
          onChange={handleInput}
          placeholder='Search Places ...'
          className='location-search-input'
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {weatherData && (
        <div ref={weatherCardRef}>
          <WeatherCard weatherData={weatherData} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
