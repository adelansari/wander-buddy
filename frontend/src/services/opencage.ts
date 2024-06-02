import axios from 'axios';

export const getCityData = async (city: string) => {
  const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
    params: {
      q: city,
      key: import.meta.env.VITE_OPENCAGE_API_KEY,
      limit: 1,
    },
  });

  return response.data.results[0];
};
