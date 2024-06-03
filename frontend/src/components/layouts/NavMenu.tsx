import { useMatch } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../custom/themes/mode-toggle';
import Logo from '@/assets/wander-app-logo-v1.svg';
import { useState } from 'react';
import { Menu } from 'lucide-react';

interface Route {
  path: string;
  name: string;
}

interface NavMenuProps {
  routes: Route[];
}

export function NavMenu({ routes }: NavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const matches = routes.map((route) => useMatch(route.path));

  return (
    <>
      <nav className='relative flex justify-between items-center p-4'>
        <div className='flex items-center'>
          <a href="/" className="flex items-center">
            <Avatar className='filter dark:invert'>
              <AvatarImage src={Logo} />
              <AvatarFallback>WB</AvatarFallback>
            </Avatar>
            <span
              className='ml-2 text-2xl font-medium'
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '24px' }}
            >
              Wander Buddy
            </span>
          </a>
        </div>
        <div className='flex flex-grow justify-center absolute left-1/2 transform -translate-x-1/2'>
          <div className='hidden md:flex'>
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
        </div>
        <div className='flex items-center'>
          <div className='hidden md:flex'>
            <ModeToggle />
          </div>
          <div className='md:hidden flex items-center'>
            <button onClick={() => setIsOpen(!isOpen)} className='mr-2'>
              <Menu color='currentColor' size={32} />
            </button>
          </div>
        </div>
      </nav>
      <div className={`md:hidden ${isOpen ? 'flex' : 'hidden'} flex-col items-center`}>
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
        {isOpen && <ModeToggle />}
      </div>
    </>
  );
}
