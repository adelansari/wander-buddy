import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { Place } from '../types/Place';
import { Button } from '@/components/ui/button';

interface PlacesTableProps {
  category: string;
  places: Place[];
  mapRef: React.RefObject<{ addMarkerToMap: (lon: number, lat: number, place: string) => void }>;
}

const PlacesTable: React.FC<PlacesTableProps> = ({ category, places, mapRef }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleClick = (e: React.MouseEvent, lon: number, lat: number, place: string) => {
    e.preventDefault();
    if (mapRef.current) {
      mapRef.current.addMarkerToMap(lon, lat, place);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(places.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPlaces = places.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='flex flex-col items-center justify-center '>
      <div className='pt-6 border border-gray-300 rounded-lg w-full md:max-w-3xl overflow-x-auto' key={category}>
        <h2 className='text-center mb-4 text-2xl font-bold'>{category}</h2>
        <Table className='mx-auto w-full text-gray-600'>
          <TableHeader>
            <TableRow className='border-b-2 border-gray-300 '>
              <TableHead className='w-1/2 md:w-1/3 py-4 text-left text-md font-bold text-blue-500'>Name</TableHead>
              <TableHead className='w-1/2 md:w-2/3 py-4 text-right text-md font-bold text-blue-500'>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPlaces.map((place: Place) => (
              <TableRow key={place.xid} className='border-b border-gray-200 hover:bg-gray-100'>
                <TableCell className='py-4 text-sm'>{place.name}</TableCell>
                <TableCell className='py-4 text-right font-medium text-sm'>
                  <a
                    href='#'
                    onClick={(e) => handleClick(e, place.point.lon, place.point.lat, place.name)}
                    className=' hover:underline'
                  >
                    {place.point.lon}, {place.point.lat}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='p-6 flex justify-between items-center'>
          <Button className='text-sm' variant='outline' onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className='mx-4 text-sm'>
            {currentPage} / {Math.ceil(places.length / itemsPerPage)}
          </span>
          <Button
            className='text-sm'
            variant='outline'
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(places.length / itemsPerPage)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlacesTable;
