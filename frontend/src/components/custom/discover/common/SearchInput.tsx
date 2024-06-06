import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FC } from 'react';

interface SearchInputProps {
  searchValue: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SearchInput: FC<SearchInputProps> = ({ searchValue, handleInput, handleSearch }) => {
  return (
    <div className='flex justify-center mb-4'>
      <Input type='text' placeholder='Search for a city' value={searchValue} onChange={handleInput} className='mr-2' />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchInput;
