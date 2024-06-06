import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import WeatherCard, { WeatherData } from '../../weather/WeatherCard';
import NoSearchResult from '@/assets/empty.png';
import { getAttractionPlaces } from '@/services/opentripmap';
import Map from '../common/Map';
import GoogleMap from '../common/GoogleMap';
import { Place } from '../types/Place';
import PlacesTable from '../common/PlacesTable';
import SearchInput from '../common/SearchInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WeatherDataWithCoord extends WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
}

const SearchAll = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherDataWithCoord | null>(null);
  const [places, setPlaces] = useState<Record<string, Place[]>>({});
  const [selectedCategory, setSelectedCategory] = useState('interesting_places');
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();
  const weatherCardRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<{ addMarkerToMap: (lon: number, lat: number) => void } | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  const fetchPlaces = async (lon: number, lat: number) => {
    const categories = ['interesting_places', 'historic', 'museums'];
    const places: Record<string, Place[]> = {};

    for (const category of categories) {
      places[category] = await getAttractionPlaces(lon, lat, category);
    }

    setPlaces(places);
  };

  const handleSearch = async () => {
    setHasError(false);
    try {
      const weatherResponse = await axios.get(`${import.meta.env.VITE_BACKEND_WEATHER_URL}/api/weather`, {
        params: { location: searchValue },
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

  useEffect(() => {
    if (weatherData && weatherCardRef.current) {
      weatherCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [weatherData]);

  return (
    <div className='p-4'>
      <h1 className='text-3xl text-center mb-4'>Where to?</h1>
      <SearchInput searchValue={searchValue} handleInput={handleInput} handleSearch={handleSearch} />
      {weatherData && <GoogleMap city={searchValue} />}
      {weatherData ? (
        <div ref={weatherCardRef}>
          <WeatherCard weatherData={weatherData} />
        </div>
      ) : hasError ? (
        <img src={NoSearchResult} alt='No results found' className='mx-auto w-80 mt-20' />
      ) : null}
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

export default SearchAll;