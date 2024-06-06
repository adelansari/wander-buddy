import { useParams } from 'react-router-dom';
import CityDetails from './CityDetails';

const CityDetailsPage = () => {
  const { city = '' } = useParams<{ city?: string }>();

  return (
    <div className='p-4'>
      <CityDetails city={city} />
    </div>
  );
};

export default CityDetailsPage;
