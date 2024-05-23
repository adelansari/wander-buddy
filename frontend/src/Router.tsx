import { createBrowserRouter } from 'react-router-dom';

import { Applayout } from './components/layouts/AppLayout';
import LandingPage from './components/pages/LandingPage';
import NoMatch from './components/pages/NoMatch';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Applayout />,
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NoMatch />,
  },
]);
