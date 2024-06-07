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

  return (
    <div
      className='relative w-full min-h-screen overflow-auto'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className='absolute inset-0 flex flex-col items-center justify-center z-10 '>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center p-3 rounded-lg dark:text-black leading-tight'>
          Unlock Adventure
        </h1>
        <h2 className='mt-4 sm:mt-6 md:mt-8 text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-black'>
          One City at a Time
        </h2>

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
