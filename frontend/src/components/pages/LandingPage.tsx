import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CloudSun, Map } from 'lucide-react';
import backgroundImage from '@/assets/landing-image-1.jpg';

interface FeatureProps {
  Icon: React.ElementType;
  label: string;
}

const Feature: React.FC<FeatureProps> = ({ Icon, label }) => (
  <div className='flex items-center space-x-2'>
    <Icon className='w-6 h-6' />
    <span>{label}</span>
  </div>
);

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <img
          src={backgroundImage}
          alt='Background'
          className='w-full h-full object-cover'
          style={{ objectPosition: 'center center' }}
        />
      </div>
      <div className='absolute inset-0 flex flex-col items-center justify-center z-10'>
        <h1 className='text-5xl sm:text-7xl md:text-8xl font-bold text-white text-center p-3 rounded-lg dark:text-black leading-tight'>
          Unlock Adventure
          <h2 className='mt-4 sm:mt-6 md:mt-8 text-4xl sm:text-6xl md:text-6xl dark:text-black'>One City at a Time</h2>
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 bg-white bg-opacity-75 p-5 rounded-xl md:rounded-full dark:bg-gray-800 dark:bg-opacity-75 px-10 mt-10'>
          <Feature Icon={Search} label='Destination Search' />
          <Feature Icon={CloudSun} label='Weather Forecast' />
          <Feature Icon={Map} label='Itinerary Planner' />
        </div>

        <button
          onClick={() => navigate('/discover')}
          className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 mt-20 px-10 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600'
        >
          Start Here
        </button>
      </div>
    </div>
  );
};

export default LandingPage;