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
  const matches = routes.map(route => useMatch(route.path));

  return (
    <>
      <nav className='relative flex justify-between items-center p-4'>
        <div className='flex items-center'>
          <Avatar className='filter dark:invert'>
            <AvatarImage src={Logo} />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <span className='ml-2 text-2xl font-medium' style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px' }}>Wander Buddy</span>
        </div>
        <div className='hidden md:flex flex-grow justify-center'>
          {routes.map(({ path, name }, index) => (
            <a
              key={path}
              href={path}
              className={`block mt-4 md:inline-block md:mt-0 mx-4 ${
                matches[index] ? 'text-cyan-500 border-b-2 border-cyan-500' : ''
              }`}
            >
              {name}
            </a>
          ))}
        </div>
        <div className='flex items-center md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} className="mr-4">
            <Menu color='currentColor' size={32} />
          </button>
          <ModeToggle />
        </div>
        <div className='hidden md:flex'>
          <ModeToggle />
        </div>
      </nav>
      {isOpen && (
        <div className='md:hidden flex flex-col items-center'>
          {routes.map(({ path, name }, index) => (
            <a
              key={path}
              href={path}
              className={`block mt-4 md:inline-block md:mt-0 mx-4 ${
                matches[index] ? 'text-cyan-500 border-b-2 border-cyan-500' : ''
              }`}
            >
              {name}
            </a>
          ))}
        </div>
      )}
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
