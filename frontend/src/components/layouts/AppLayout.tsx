import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../mode-toggle';
import Logo from '../../assets/logoTravelBuddy.svg';

export function Applayout() {
  return (
    <>
      <nav className='flex justify-between items-center p-4'>
        <Avatar className='filter dark:invert'>
          <AvatarImage src={Logo} />
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>
        <ModeToggle />
      </nav>
      <Header />
      <div className='flex-grow flex flex-col'>
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
