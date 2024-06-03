import { useMatch, Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../custom/themes/mode-toggle';
import Logo from '@/assets/wander-app-logo-v1.svg';
import { useState } from 'react';
import { Menu } from 'lucide-react';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/discover', name: 'Discover' },
  { path: '/trips', name: 'Trips' },
];

export function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className='flex justify-between items-center p-4'>
      <div className='flex items-center'>
        <Avatar className='filter dark:invert'>
          <AvatarImage src={Logo} />
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>
        <span className='ml-2 text-2xl font-medium' style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px' }}>Wander Buddy</span>
        </div>
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu color='currentColor' size={32} />
          </button>
        </div>
        <div className={`${isOpen ? '' : 'hidden'} md:flex`}>
          {routes.map(({ path, name }) => (
            <a
              key={path}
              href={path}
              className={`block mt-4 md:inline-block md:mt-0 mr-6 ${
                useMatch(path) ? 'text-cyan-500 border-b-2 border-cyan-500' : ''
              }`}
            >
              {name}
            </a>
          ))}
        </div>
        <ModeToggle />
      </nav>
      <div className='flex-grow flex flex-col pb-20'>
        <div className='container px-4 md:px-8 flex-grow flex flex-col'>
          <Outlet />
        </div>
      </div>
      <div className='container px-4 md:px-8'>
        <Footer />
      </div>
    </>
  );
}
