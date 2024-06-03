import backgroundImage from '@/assets/landing-image.jpg';

const LandingPage: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden rounded-lg border-2 border-white" style={{ margin: '20px', marginTop: '75px', marginBottom: '10vh', borderRadius: '50px' }}>
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover rounded-lg"
          style={{ objectPosition: 'center top' }}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center bg-white bg-opacity-75 p-4 rounded-lg dark:bg-gray-800 dark:bg-opacity-75">
          Unlock Adventures <br /> One City at a Time
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
