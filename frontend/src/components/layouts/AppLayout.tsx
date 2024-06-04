import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import NavMenu from './NavMenu';

interface Route {
  path: string;
  name: string;
}

const routes: Route[] = [
  { path: '/', name: 'Home' },
  { path: '/discover', name: 'Discover' },
  { path: '/trips', name: 'Trips' },
];

export function AppLayout() {
  const location = useLocation();

  return (
    <>
      <NavMenu routes={routes} />
      <div className='flex-grow flex flex-col pb-20'>
        <div className='container px-4 md:px-8 flex-grow flex flex-col'>
          <Outlet />
        </div>
      </div>
      {location.pathname !== '/' && (
        <div className='container px-4 md:px-8'>
          <Footer />
        </div>
      )}
    </>
  );
}
