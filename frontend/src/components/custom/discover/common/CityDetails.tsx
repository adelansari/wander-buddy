import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import WeatherCard, { WeatherData } from '../../weather/WeatherCard';
import NoSearchResult from '@/assets/empty.png';
import { getAttractionPlaces } from '@/services/opentripmap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Place } from '../types/Place';
import GoogleMap from './GoogleMap';
import PlacesTable from './PlacesTable';
import Map from './Map';
import CitySummary from '../common/CitySummary';

interface WeatherDataWithCoord extends WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
}

interface CityDetailsProps {
  city: string;
}

const CityDetails: React.FC<CityDetailsProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherDataWithCoord | null>(null);
  const [places, setPlaces] = useState<Record<string, Place[]>>({});
  const [selectedCategory, setSelectedCategory] = useState('interesting_places');
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();
  const mapRef = useRef<{ addMarkerToMap: (lon: number, lat: number) => void } | null>(null);

  const fetchPlaces = async (lon: number, lat: number) => {
    const categories = ['interesting_places', 'historic', 'museums'];
    const places: Record<string, Place[]> = {};

    for (const category of categories) {
      places[category] = await getAttractionPlaces(lon, lat, category);
    }

    setPlaces(places);
  };

  useEffect(() => {
    const fetchData = async () => {
      setHasError(false);
      try {
        const weatherResponse = await axios.get(`${import.meta.env.VITE_BACKEND_WEATHER_URL}/api/weather`, {
          params: { location: city },
        });
        setWeatherData(weatherResponse.data);

        // Extract coordinates from the weather API response
        const { coord } = weatherResponse.data;
        if (coord) {
          fetchPlaces(coord.lon, coord.lat);
        }
      } catch (error) {
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

    fetchData();
  }, [city]);

  return (
    <div>
    <div className='w-full bg-gray-100 dark:bg-gray-900 p-6 rounded-md shadow-lg'>
  <h1 className="text-3xl font-bold mb-4 text-center">{city.charAt(0).toUpperCase() + city.slice(1)}
  </h1>
  <div className='grid md:grid-cols-3 gap-6'>
    <div className='relative h-400 p-4 mr-3 ml-4 bg-white dark:bg-gray-800 shadow-md rounded-lg h-50 overflow-y-scroll flex-grow hover:scale-105 transition-transform duration-300'>
      <CitySummary city={city} />
    </div>
    <div className='relative h-400 mx-auto shadow-md rounded-lg overflow-hidden cursor-pointer transform group hover:scale-105 transition-transform duration-300 flex items-center justify-center flex-grow'>
      <GoogleMap city={city} />
    </div>
    {weatherData ? (
     
        <WeatherCard weatherData={weatherData} />

    ) : hasError ? (
      <img src={NoSearchResult} alt='No results found' className='mx-auto w-80 mt-20 flex-grow' />
    ) : null}
  </div>
</div>

      <Tabs defaultValue='interesting_places' className='w-full'>
        <TabsList>
          {Object.keys(places).map((category) => (
            <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(places).map(([category, places]: [string, Place[]]) => (
          <TabsContent key={category} value={category}>
            <PlacesTable category={category} places={places} mapRef={mapRef} />
          </TabsContent>
        ))}
      </Tabs>
      {weatherData && weatherData.coord && (
        <Map
          ref={mapRef}
          longitude={weatherData.coord.lon}
          latitude={weatherData.coord.lat}
          places={places[selectedCategory] || []}
        />
      )}
    </div>
  );
};

export default CityDetails;
