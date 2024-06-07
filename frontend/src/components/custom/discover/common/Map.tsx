import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProps } from '../types/Place';

const Map = forwardRef((props: MapProps, ref: React.Ref<any>) => {
  const { longitude, latitude, places } = props;
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  console.log('Rendering Map with props:', props);

  const addMarkerToMap = (lon: number, lat: number, place: string) => {
    if (mapInstance.current) {
      const imageUrl = `https://source.unsplash.com/100x100/?${place}`;
      const popup = new mapboxgl.Popup().setHTML(`
        <div class="w-24">
          <h3>${place}</h3>
          <img src="${imageUrl}" alt="${place}" className="w-24 h-24" />
        </div>
      `);

      new mapboxgl.Marker({ color: 'orange' }).setLngLat([lon, lat]).setPopup(popup).addTo(mapInstance.current);
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
      zoom: 14,
    });

    mapInstance.current = map;

    places.forEach((place) => {
      if (place.point) {
        const imageUrl = `https://source.unsplash.com/100x100/?${place.name}`;
        new mapboxgl.Marker()
          .setLngLat([place.point.lon, place.point.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(`
              <div class="w-24">
                <h3>${place.name}</h3>
                <img src="${imageUrl}" alt="${place.name}" className="w-24 h-24" />
              </div>
            `)
          )
          .addTo(map);
      }
    });

    new mapboxgl.Marker({ color: 'red' }).setLngLat([longitude, latitude]).addTo(map);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [longitude, latitude, places]);

  return <div ref={mapContainer} className='w-full h-96 md:h-80 lg:h-96 rounded-lg shadow-md' />;
});

export default Map;
