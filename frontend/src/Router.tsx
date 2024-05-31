import { createBrowserRouter } from 'react-router-dom';

import { Applayout } from './components/layouts/AppLayout';
import LandingPage from './components/pages/LandingPage';
import NoMatch from './components/pages/NoMatch';
import Discover from './components/pages/Discover';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'discover',
        element: <Discover />,
      },
    ],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
]);
