export interface Place {
  name: string;
  xid: string;
  point: {
    lon: number;
    lat: number;
  };
}

export interface MapProps {
  longitude: number;
  latitude: number;
  places: Place[];
}
