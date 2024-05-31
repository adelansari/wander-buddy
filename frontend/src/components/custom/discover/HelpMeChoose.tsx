const HelpMeChoose = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Trending Destinations</h2>
      <div className='grid grid-cols-3 gap-4'>
        {['Paris', 'London', 'New York'].map((city) => (
          <div key={city} className='border p-2 rounded'>
            <img src={`https://source.unsplash.com/400x400/?${city}`} alt={city} />
            <p>{city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpMeChoose;
