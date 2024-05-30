import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { router } from './Router';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <ThemeProvider storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
