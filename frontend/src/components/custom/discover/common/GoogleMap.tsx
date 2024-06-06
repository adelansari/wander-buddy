import { FC } from 'react';

interface GoogleMapProps {
  city: string;
}

const GoogleMap: FC<GoogleMapProps> = ({ city }) => {
  const googleMapUrl = `https://maps.google.com/maps?q=${city}&output=embed`;

  return (
    <div className='google-map'>
      <iframe
        title='Google Map'
        src={googleMapUrl}
        width='400'
        height='400'
        style={{ border: 0 }}
        allowFullScreen={true}
        loading='lazy'
      />
    </div>
  );
};

export default GoogleMap;
