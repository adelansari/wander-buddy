import { useEffect, useState } from 'react';
import wikipedia from 'wikipedia';

interface CitySummaryProps {
  city: string;
}

const CitySummary: React.FC<CitySummaryProps> = ({ city }) => {
  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
    const fetchCitySummary = async () => {
      try {
        const citySummary = await wikipedia.summary(city);
        setSummary(citySummary.extract);
      } catch (error) {
        setSummary('Error fetching city summary.');
      }
    };

    fetchCitySummary();
  }, [city]);

  return <>{summary}</>;
};

export default CitySummary;
