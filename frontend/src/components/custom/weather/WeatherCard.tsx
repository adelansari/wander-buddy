import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';

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

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const styles = {
    cardBgColor: isDarkMode ? 'bg-gray-900' : 'bg-white',
    textColor: isDarkMode ? 'text-gray-300' : 'text-gray-800',
    headerBgColor: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
    rectangleBgColor: isDarkMode ? 'bg-gray-800' : 'bg-white',
    iconBgColor: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
    contentBgColor: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
    spaceBgColor: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
  };

  const getDayAndDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getDay()];
    const month = months[currentDate.getMonth()];
    const date = currentDate.getDate();
    return `${dayOfWeek}, ${month} ${date}`;
  };

  const dayAndDate = getDayAndDate();

  return (
    <Card className={`w-[600px] mx-auto mt-4 p-0 shadow-md rounded-lg ${styles.cardBgColor} ${styles.textColor}`}>
      <div className={`py-2 px-4 mb-4 rounded-t-lg text-center ${styles.headerBgColor}`}>
        <h2 className="text-xl font-bold">{name} Weather Forecast</h2>
      </div>
      <div className={`h-4 ${styles.spaceBgColor}`}></div>
      <CardContent className={`flex ${styles.contentBgColor}`}>
        <div className={`flex-1 flex flex-col items-center justify-center ${styles.rectangleBgColor} p-4 rounded-lg shadow-md`}>
          <div className="text-2xl font-bold mb-1">{dayAndDate}</div>
          <img className="w-20 h-20 mb-2 rounded-lg" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
          <div className="text-5xl font-bold">{Math.round(temp)}°C</div>
          <div className="text-sm">{description}</div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4 ml-4">
          <div className={`flex flex-col items-center justify-center ${styles.rectangleBgColor} p-4 rounded-lg shadow-md`}>
            <div className="text-sm">Feels Like</div>
            <div className="text-xl font-medium">{Math.round(feels_like)}°C</div>
          </div>
          <div className={`flex flex-col items-center justify-center ${styles.rectangleBgColor} p-4 rounded-lg shadow-md`}>
            <div className="text-sm">Humidity</div>
            <div className="text-xl font-medium">{humidity}%</div>
          </div>
          <div className={`flex flex-col items-center justify-center ${styles.rectangleBgColor} p-4 rounded-lg shadow-md`}>
            <div className="text-sm">Wind Speed</div>
            <div className="text-xl font-medium">{speed} m/s</div>
          </div>
          <div className={`flex flex-col items-center justify-center ${styles.rectangleBgColor} p-4 rounded-lg shadow-md`}>
            <div className="text-sm">Sunrise</div>
            <div className="text-lg font-medium">{new Date(sunrise * 1000).toLocaleTimeString()}</div>
          </div>
          <div className={`flex flex-col items-center justify-center ${styles.rectangleBgColor} p-4 rounded-lg shadow-md`}>
            <div className="text-sm">Sunset</div>
            <div className="text-lg font-medium">{new Date(sunset * 1000).toLocaleTimeString()}</div>
          </div>
          <div className={`flex flex-col items-center justify-center ${styles.rectangleBgColor} p-4 rounded-lg shadow-md`}>
            <div className="text-sm">Pressure</div>
            <div className="text-lg font-medium">{pressure} hPa</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};



export default WeatherCard;
