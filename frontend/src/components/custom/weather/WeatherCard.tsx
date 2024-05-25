import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { name, main, weather } = weatherData;
  const {temp, humidity} = main;
  const { description, icon } = weather[0];

  return (
    <Card className='w-[350px] mx-auto mt-4'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <img className='w-20 h-20' src={`http://openweathermap.org/img/wn/${icon}.png`} alt='Weather icon' />
            <div>Temperature: {temp}°C</div>
            <div>Humidity: {humidity}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
