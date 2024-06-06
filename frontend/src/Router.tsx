import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/components/pages/LandingPage';
import NoMatch from '@/components/pages/NoMatch';
import Discover from '@/components/pages/Discover';
import { AppLayout } from '@/components/layouts/AppLayout';
import Trips from '@/components/pages/Trips';
import CityDetailsPage from '@/components/custom/discover/common/CityDetailsPage';

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
        path: 'discover/details/:city',
        element: <CityDetailsPage />,
      },
      {
        path: 'trips',
        element: <Trips />,
      },
    ],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
]);
