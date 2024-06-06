import { useState } from 'react';
import SearchInput from '../common/SearchInput';
import CityDetails from '../common/CityDetails';

const SearchAll = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [submittedCity, setSubmittedCity] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSubmittedCity(searchValue);
    setSearchValue('');
  };

  return (
    <div className='p-4 '>
      <h1 className='text-3xl text-center mb-4'>Where to?</h1>
      <SearchInput searchValue={searchValue} handleInput={handleInput} handleSearch={handleSearch} />
      {submittedCity && <CityDetails city={submittedCity} />}
    </div>
  );
};

export default SearchAll;
