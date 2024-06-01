import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import NoMatch from './components/pages/NoMatch';
import Discover from './components/pages/Discover';
import CityDetails from './components/custom/discover/CityDetails';
import { AppLayout } from './components/layouts/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'discover',
        element: <Discover />,
      },
      {
        path: 'discover/details/:cityName',
        element: <CityDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
]);
