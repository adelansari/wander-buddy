import axios from 'axios';

export const getAttractionPlaces = async (lon: number, lat: number, kinds: string) => {
  const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius`, {
    params: {
      radius: 10000,
      lon: lon,
      lat: lat,
      kinds: kinds,
      rate: 3,
      format: 'json',
      apikey: import.meta.env.VITE_OPENTRIPMAP_API_KEY,
    },
  });

  console.log('OpenTripMap Response:', response);

  // Sort the places by their rate property in descending order and limit the number of places to 15
  const topPlaces = response.data.slice(0, 20);

  return topPlaces;
};
