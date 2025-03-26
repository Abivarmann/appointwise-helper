
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

  // For demo purposes, we'll create random-ish coordinates based on the doctor's name
  // In a real app, these would come from the database
  const generateCoordinates = (doctorName: string): [number, number] => {
    // Use a simple hash function to generate a predictable value from the name
    let hash = 0;
    for (let i = 0; i < doctorName.length; i++) {
      hash = doctorName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate coordinates within India (roughly)
    const longitude = 72.0 + (hash % 10) + (Math.abs(hash) % 100) / 100;
    const latitude = 17.0 + ((hash >> 8) % 15) + (Math.abs(hash >> 8) % 100) / 100;
    
    return [longitude, latitude];
  };

  const coordinates = generateCoordinates(doctor.name);
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
