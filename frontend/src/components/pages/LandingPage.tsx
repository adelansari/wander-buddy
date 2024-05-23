import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import 'tailwindcss/tailwind.css';

const LandingPage = () => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', search);
  };

  return (
    <div className='p-4'>
      <h1 className='text-4xl mb-4'>Travel Buddy</h1>
      <p className='mb-4'>
        Wander Buddy is your one-stop destination for all your travel needs. Search, Plan and Enjoy!
      </p>
      <h2 className='text-2xl mb-4'>Features</h2>
      <ul className='list-disc list-inside mb-4'>
        <li>Search for destinations</li>
        <li>View real-time weather forecasts</li>
        <li>Plan your travel itinerary</li>
      </ul>
      <div className='flex items-center'>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search destinations'
          className='mr-2'
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
};

export default LandingPage;
