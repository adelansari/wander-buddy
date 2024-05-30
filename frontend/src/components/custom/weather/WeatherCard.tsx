import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { name, main, weather, wind, sys } = weatherData;
  const { temp, feels_like, humidity, pressure } = main;
  const { description, icon } = weather[0];
  const { speed } = wind;
  const { sunrise, sunset } = sys;

  const dayAndDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const [dayOfWeek, date] = dayAndDate.split(', ');

  return (
    <Card className='w-full sm:w-[600px] mx-auto mt-4 p-0 shadow-md rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300'>
      <div className='py-2 px-4 rounded-t-lg text-center bg-gray-200 dark:bg-gray-700'>
        <h2 className='text-xl font-bold'>{name} Weather Forecast</h2>
      </div>
      <div className='pt-4 h-4 bg-gray-100 dark:bg-gray-900'></div>
      <CardContent className='flex bg-gray-100 dark:bg-gray-900'>
        <div className='flex-1 flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md'>
          <div className='text-2xl font-bold mb-1 text-center'>
            <div>{dayOfWeek}</div>
            <div>{date}</div>
          </div>
          <img
            className='w-20 h-20 mb-2 rounded-lg'
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt='Weather icon'
          />
          <div className='text-5xl font-bold'>{Math.round(temp)}°C</div>
          <div className='text-sm'>{description}</div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 ml-4'>
          {[
            { label: 'Feels Like', value: `${Math.round(feels_like)}°C` },
            { label: 'Humidity', value: `${humidity}%` },
            { label: 'Wind Speed', value: `${speed} m/s` },
            { label: 'Sunrise', value: new Date(sunrise * 1000).toLocaleTimeString() },
            { label: 'Sunset', value: new Date(sunset * 1000).toLocaleTimeString() },
            { label: 'Pressure', value: `${pressure} hPa` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className='flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md'
            >
              <div className='text-sm'>{label}</div>
              <div className='text-lg font-medium'>{value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
