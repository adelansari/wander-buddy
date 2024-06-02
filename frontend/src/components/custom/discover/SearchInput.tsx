import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FC } from 'react';

interface SearchInputProps {
  searchValue: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const SearchInput: FC<SearchInputProps> = ({ searchValue, handleInput, handleSearch }) => (
  <div className='flex items-center'>
    <Input
      value={searchValue}
      onChange={handleInput}
      placeholder='Search city'
      className='location-search-input border p-2 rounded'
    />
    <Button onClick={handleSearch}>Search</Button>
  </div>
);

export default SearchInput;
