import { Footer } from './components/layouts/Footer';
import { Button } from './components/ui/button';
import { ModeToggle } from './components/ui/mode-toggle';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <>
      <ThemeProvider storageKey='vite-ui-theme'>
        <ModeToggle />
        <Button>Click me</Button>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
