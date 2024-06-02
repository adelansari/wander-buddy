import { Button } from '@/components/ui/button';

const SurpriseMe = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Feeling Adventurous?</h2>
      <Button>Random Destination</Button>
    </div>
  );
};

export default SurpriseMe;
