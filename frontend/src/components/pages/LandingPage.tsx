  import { useState, useRef, useEffect } from 'react';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import WeatherCard from '../custom/weather/WeatherCard';
  
  const LandingPage = () => {
    const [searchValue, setSearchValue] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const weatherRef = useRef<HTMLDivElement | null>(null);
  
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    };

//function to handal scroll
const scrollToWeatherCard = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
   // console.log("hello");
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
  
    const handleSearch = async () => {
      try {
        // Get weather forecast from Symfony backend
        scrollToWeatherCard(weatherRef);
        const weatherResponse = await axios.get(`${import.meta.env.VITE_BACKEND_WEATHER_URL}/api/weather`, {
          params: {
            location: searchValue,
          },
        });
        const weatherData = weatherResponse.data;
        console.log('Weather data:', weatherData);
        setWeatherData(weatherData);
        setSearchValue('');

       
      } catch (error) {
        console.error('Error:', error); 
        if ((error as any).response && (error as any).response.data && (error as any).response.data.message) {
          console.error('Error message:', (error as any).response.data.message);
        }else {
          setSearchValue('');
          Swal.fire({
            title: 'Invalid City Name',
            text: 'Please enter valid city name',
            icon: 'error',
            confirmButtonText: 'OK',
            
          });
        }
      }
    };
    useEffect(() => {
      if (weatherData) {
        scrollToWeatherCard(weatherRef);
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
        <div  ref={weatherRef}>
        {weatherData && <WeatherCard weatherData={weatherData} />}
        </div>
      </div>
    );
  };
  
  export default LandingPage;