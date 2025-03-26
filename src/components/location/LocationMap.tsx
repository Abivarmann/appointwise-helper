
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

// This is a temporary field for the API key
// In a production app, this should be stored in environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtby1tYXBib3giLCJhIjoiY2tpem44cGkyMGg3ODJzcGMxcnRkcWtleCJ9.YrMH-z1Z7V2p7G9NuM-U_g';

interface LocationMapProps {
  coordinates: [number, number]; // [longitude, latitude]
  zoom?: number;
  className?: string;
  showMarker?: boolean;
}

const LocationMap = ({ 
  coordinates, 
  zoom = 8, 
  className = '',
  showMarker = true 
}: LocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKey, setApiKey] = useState<string>(MAPBOX_TOKEN);

  useEffect(() => {
    if (!mapContainer.current || !coordinates) return;

    // Initialize map only once
    if (!map.current) {
      mapboxgl.accessToken = apiKey;
      
      try {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: coordinates,
          zoom: zoom,
          interactive: true,
          attributionControl: false
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.NavigationControl(),
          'top-right'
        );

        if (showMarker) {
          // Add marker
          marker.current = new mapboxgl.Marker({ color: '#F43F5E' })
            .setLngLat(coordinates)
            .addTo(map.current);
        }

        map.current.on('load', () => {
          setMapLoaded(true);
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    } else {
      // Update existing map
      map.current.flyTo({
        center: coordinates,
        zoom: zoom,
        essential: true,
        duration: 1000
      });

      // Update marker position if it exists
      if (marker.current && showMarker) {
        marker.current.setLngLat(coordinates);
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        marker.current = null;
      }
    };
  }, [coordinates, zoom, apiKey, showMarker]);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      {!MAPBOX_TOKEN && (
        <div className="absolute top-0 left-0 right-0 z-10 mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            Please enter your Mapbox API key. Get one at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
          </p>
          <input 
            type="text"
            value={apiKey}
            onChange={handleApiKeyChange}
            placeholder="Enter Mapbox API key"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      )}
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="flex flex-col items-center text-gray-500">
            <MapPin className="w-8 h-8 mb-2 animate-pulse" />
            <p>Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg"
      />
      
      {/* Semi-transparent overlay for better form visibility */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px] rounded-lg"></div>
    </div>
  );
};

export default LocationMap;
