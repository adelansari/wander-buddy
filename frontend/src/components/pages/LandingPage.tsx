import backgroundImage from '@/assets/landing-image-1.jpg';
import { Search, CloudSun, Map } from 'lucide-react';
import { useEffect } from 'react';

const LandingPage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-8xl font-bold text-white text-center p-3 rounded-lg dark:text-black">
          Unlock Adventure <br /> <span className='text-6xl mt-5 dark:text-black'> One City at a Time</span>
        </h1>

        <div className="mt-5 flex space-x-5">
          <div className="flex items-center space-x-2 bg-white bg-opacity-75 p-5 rounded-full dark:bg-gray-800 dark:bg-opacity-75 px-10 mt-10">
            <Search className="w-6 h-6" />
            <span>Destination Search</span>
            <CloudSun className="w-6 h-6" />
            <span>Weather Forecast</span>
            <Map className="w-6 h-6" />
            <span>Itinerary Planner</span>
          </div>
        </div>
        
        <button
          onClick={() => window.location.href = '/discover'}
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 mt-20 px-10 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition ease-in-out delay-150"
        >
          Start Here
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
