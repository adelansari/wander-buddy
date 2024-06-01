import { FC } from 'react';
import logo from '@/assets/wander-app-logo-v1.svg';

const Spinner: FC = () => (
  <div className='relative flex justify-center items-center'>
    <div className='absolute animate-spin rounded-full h-32 w-32 border-t-8 border-b-8 border-cyan-500'></div>
    <img src={logo} className='rounded-full h-16 w-16 filter dark:invert' />
  </div>
);

export default Spinner;
