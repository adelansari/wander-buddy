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
import BackToTopButton from '@/components/layouts/BackToTopButton';
import Spinner from '../../spinner/Spinner';

interface WeatherDataWithCoord extends WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
}

type CategoryDisplayNames = {
  [key: string]: string;
};

const categoryDisplayNames: CategoryDisplayNames = {
  interesting_places: 'Interesting places',
  historic: 'Historic sites',
  museums: 'Museums',
};

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
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

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
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: city,
            appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
            units: 'metric',
          },
        });
        setWeatherData(weatherResponse.data);

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
    <div className='bg-gray-100 dark:bg-gray-900 min-h-screen relative md:w-4/5 mx-auto'>
      {weatherData ? (
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-3xl font-bold mb-4 text-center'>{city.charAt(0).toUpperCase() + city.slice(1)}</h1>
          <div className='w-full h-64 md:h-96 relative mb-6 '>
            {!imagesLoaded && <Spinner />}
            <img
              src={`https://source.unsplash.com/800x600/?${city}`}
              alt={city}
              onLoad={() => setImagesLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imagesLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='h-96 p-10 rounded-xl overflow-y-scroll '>
              <h1 className='text-xl font-semibold mb-2' aria-label={`Explore ${city}`}>
                Summary
              </h1>
              <CitySummary city={city.toLowerCase()} />
            </div>
            <div className='h-96 rounded-xl overflow-hidden cursor-pointer flex items-center justify-center'>
              <GoogleMap city={city} />
            </div>
          </div>
          <div className='mt-8'>
            <WeatherCard weatherData={weatherData} />
          </div>

          <div className='w-full mt-7'>
            <Tabs defaultValue='interesting_places' className='w-full mt-7'>
              <TabsList className='flex justify-center items-center w-full md:w-1/2 md:mx-auto'>
                {Object.keys(places).map((category) => (
                  <TabsTrigger
                    className='w-full text-center'
                    key={category}
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {categoryDisplayNames[category]}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(places).map(([category, places]: [string, Place[]]) => (
                <TabsContent className='p-4 text-2xl font-bold' key={category} value={category}>
                  <PlacesTable category={categoryDisplayNames[category]} places={places} mapRef={mapRef} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className='mt-6'>
            {weatherData && weatherData.coord && (
              <Map
                ref={mapRef}
                longitude={weatherData.coord.lon}
                latitude={weatherData.coord.lat}
                places={places[selectedCategory] || []}
              />
            )}
          </div>
          <BackToTopButton />
        </div>
      ) : hasError ? (
        <img src={NoSearchResult} alt='No results found' className='mx-auto w-80' />
      ) : null}
    </div>
  );
};

export default CityDetails;
