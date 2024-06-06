import { Table } from '@/components/ui/table';
import React from 'react';
import { Place } from '../types/Place';

interface PlacesTableProps {
  category: string;
  places: Place[];
  mapRef: React.RefObject<{ addMarkerToMap: (lon: number, lat: number) => void }>;
}

const PlacesTable: React.FC<PlacesTableProps> = ({ category, places, mapRef }) => (
  <div key={category}>
    <h2>{category}</h2>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {places.map((place: Place) => (
          <tr key={place.xid}>
            <td>{place.name}</td>
            <td>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  if (mapRef.current) {
                    mapRef.current.addMarkerToMap(place.point.lon, place.point.lat);
                  }
                }}
              >
                {place.point.lon}, {place.point.lat}
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default PlacesTable;
