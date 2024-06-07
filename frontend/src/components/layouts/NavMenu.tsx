import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from '@/assets/wander-app-logo-v1.svg';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../custom/themes/mode-toggle';

interface Route {
  path: string;
  name: string;
}

interface NavMenuProps {
  routes: Route[];
}

const NavMenu: React.FC<NavMenuProps> = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const matches = routes.map((route) => useMatch(route.path));
  const navigate = useNavigate();

  return (
    <nav className='sticky top-0 z-20 flex justify-between items-center p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white'>
      <div className='flex items-center'>
        <a href='/' className='flex items-center'>
          <Avatar className='filter dark:invert'>
            <AvatarImage src={Logo} />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <span className='ml-2 text-2xl font-medium text-black dark:text-white'>Wander Buddy</span>
        </a>
      </div>
      <div className='flex flex-grow justify-center absolute left-1/2 transform -translate-x-1/2'>
        <div className='hidden md:flex'>
          {routes.map(({ path, name }, index) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`block mt-4 md:inline-block md:mt-0 mx-4 ${
                matches[index] ? 'text-cyan-500 border-b-2 border-cyan-500' : ''
              } text-black dark:text-white`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className='flex items-center'>
        <div className='hidden md:flex'>
          <ModeToggle />
        </div>
        <div className='md:hidden flex items-center relative'>
          <button onClick={() => setIsOpen(!isOpen)} className='mr-2'>
            <Menu color='currentColor' size={32} />
          </button>
          {isOpen && (
            <div className='absolute top-12 right-0 p-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-lg shadow-lg z-10 w-48'>
              {routes.map(({ path, name }, index) => (
                <button
                  key={path}
                  onClick={() => {
                    navigate(path);
                    setIsOpen(false);
                  }}
                  className={`block mt-4 ${
                    matches[index] ? 'text-cyan-500 border-b-2 border-cyan-500' : ''
                  } text-black dark:text-white`}
                >
                  {name}
                </button>
              ))}
              <div className='flex justify-end mt-2'>
                <ModeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
