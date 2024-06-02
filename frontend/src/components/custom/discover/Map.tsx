import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Place {
  name: string;
  xid: string;
  point: {
    lon: number;
    lat: number;
  };
}

interface MapProps {
  longitude: number;
  latitude: number;
  places: Place[];
}

const Map = forwardRef((props: MapProps, ref) => {
  const { longitude, latitude, places } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const addMarkerToMap = (lon: number, lat: number) => {
    if (mapInstance.current) {
      new mapboxgl.Marker().setLngLat([lon, lat]).addTo(mapInstance.current);
    }
  };

  useImperativeHandle(ref, () => ({
    addMarkerToMap,
  }));

  useEffect(() => {
    if (!places) {
      return;
    }

    const mapboxKey = import.meta.env.VITE_MAPBOX_API_KEY as string;
    mapboxgl.accessToken = mapboxKey;

    const map = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 9,
    });

    mapInstance.current = map;

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    places.forEach((place) => {
      if (place.point) {
        new mapboxgl.Marker()
          .setLngLat([place.point.lon, place.point.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3>`))
          .addTo(map);
      }
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [longitude, latitude, places]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
});

export default Map;
