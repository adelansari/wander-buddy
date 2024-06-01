import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import WeatherCard from '../weather/WeatherCard';

interface CityDetailsProps {
  cityName?: string;
}

const CityDetails = ({ cityName: cityNameProp }: CityDetailsProps) => {
  const [weatherData, setWeatherData] = useState(null);
  const { toast } = useToast();
  const { cityName: cityNameParam } = useParams();
  const cityName = cityNameProp || cityNameParam;

  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(`${import.meta.env.VITE_BACKEND_WEATHER_URL}/api/weather`, {
        params: {
          location: cityName,
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
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [cityName]);

  return (
    <div className='p-4'>
      <h1 className='text-3xl text-center mb-4'>Weather Details for {cityName}</h1>
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
};

export default CityDetails;
