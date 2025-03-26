
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin } from 'lucide-react';
import MapLocation from '@/components/location/MapLocation';
import type { Doctor } from '@/data/mockData';

interface DoctorLocationMapProps {
  doctor: Doctor;
}

const DoctorLocationMap = ({ doctor }: DoctorLocationMapProps) => {
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  // Generate coordinates based on doctor's name and location
  const generateCoordinates = (doctorName: string, location: string): [number, number] => {
    // Use a deterministic hash function based on doctor name and location
    let hash = 0;
    const input = doctorName + location;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate coordinates that span globally
    // Longitude range: -180 to 180
    // Latitude range: -85 to 85 (not exactly -90 to 90 to avoid poles)
    const longitude = -180 + (Math.abs(hash) % 360);
    const latitude = -85 + (Math.abs(hash >> 8) % 170);
    
    return [longitude, latitude];
  };

  const coordinates = generateCoordinates(doctor.name, doctor.address);
  const address = `${doctor.clinic}, ${doctor.address}`;

  return (
    <div className="mt-4">
      <button 
        onClick={toggleMap} 
        className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Map className="w-4 h-4 mr-1" />
        {showMap ? 'Hide location map' : 'Show location map'}
      </button>
      
      {showMap && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3"
        >
          <MapLocation 
            address={address}
            coordinates={coordinates}
            className="border border-border"
          />
        </motion.div>
      )}
    </div>
  );
};

export default DoctorLocationMap;
