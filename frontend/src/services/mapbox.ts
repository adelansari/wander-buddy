import MapboxClient from '@mapbox/mapbox-sdk';

const client = MapboxClient({ accessToken: import.meta.env.VITE_MAPBOX_API_KEY });

export const getCityData = async (city: string) => {
  const response = await client.geocoding
    .forwardGeocode({
      query: city,
      autocomplete: false,
      limit: 1,
    })
    .send();

  return response.body.features[0];
};
