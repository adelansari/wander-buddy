import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import { Place } from '../types/Place';
import { Button } from '@/components/ui/button';

interface PlacesTableProps {
  category: string;
  places: Place[];
  mapRef: React.RefObject<{ addMarkerToMap: (lon: number, lat: number) => void }>;
}

const PlacesTable: React.FC<PlacesTableProps> = ({ category, places, mapRef }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleClick = (e: React.MouseEvent, lon: number, lat: number) => {
    e.preventDefault();
    if (mapRef.current) {
      mapRef.current.addMarkerToMap(lon, lat);
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
    <div className="flex items-start justify-center min-h-screen">
      <div className="p-2 border border-gray-300 rounded-lg w-3/4" key={category}>
        <h2 className="text-center mb-2">{category}</h2>
        <Table className="mx-auto w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPlaces.map((place: Place) => (
              <TableRow key={place.xid}>
                <TableCell className="text-sm">{place.name}</TableCell>
                <TableCell className="text-right font-medium text-sm">
                  <a
                    href="#"
                    onClick={(e) => handleClick(e, place.point.lon, place.point.lat)}
                  >
                    {place.point.lon}, {place.point.lat}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-2">
          <Button
            className="text-sm"
            variant="outline"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-4 text-sm">
             {currentPage} / {Math.ceil(places.length / itemsPerPage)}
          </span>
          <Button
            className="text-sm"
            variant="outline"
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
