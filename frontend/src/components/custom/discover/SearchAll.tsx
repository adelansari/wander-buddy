import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import WeatherCard from '../weather/WeatherCard';
import NoSearchResult from '@/assets/empty.png';
import { getCityData } from '@/services/opencage';
import { getAttractionPlaces } from '@/services/opentripmap';
import Map from './Map';
import GoogleMap from './GoogleMap';
import { Place } from './Place';
import PlacesTable from './PlacesTable';
import SearchInput from './SearchInput';

const SearchAll = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [weatherData, setWeatherData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const weatherCardRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const [cityData, setCityData] = useState<any>(null);
  const [places, setPlaces] = useState<Record<string, Place[]>>({});
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

      const cityDataResponse = await getCityData(searchValue);
      setCityData(cityDataResponse);

      fetchPlaces(cityDataResponse.geometry.lng, cityDataResponse.geometry.lat);
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
      {cityData && <GoogleMap city={searchValue} />}
      {weatherData ? (
        <div ref={weatherCardRef}>
          <WeatherCard weatherData={weatherData} />
        </div>
      ) : hasError ? (
        <img src={NoSearchResult} alt='No results found' className='mx-auto w-80 mt-20' />
      ) : null}
      {Object.entries(places).map(([category, places]: [string, Place[]]) => (
        <PlacesTable key={category} category={category} places={places} mapRef={mapRef} />
      ))}
      {cityData && (
        <Map
          ref={mapRef}
          longitude={cityData.geometry.lng}
          latitude={cityData.geometry.lat}
          places={Object.values(places).flat()}
        />
      )}
    </div>
  );
};

export default SearchAll;
