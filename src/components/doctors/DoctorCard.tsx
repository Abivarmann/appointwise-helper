
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Star, ThumbsUp, Award, X } from 'lucide-react';
import type { Doctor } from '@/data/mockData';

interface DoctorCardProps {
  doctor: Doctor;
  locationData: {
    area: string;
    district: string;
    state: string;
    country: string;
  };
}

const DoctorCard = ({ doctor, locationData }: DoctorCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleBooking = () => {
    navigate('/booking', { 
      state: { 
        doctor,
        locationData
      } 
    });
  };

  return (
    <motion.div
      className="w-full hover-scale"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border">
        {/* Availability Badge */}
        <div 
          className={`absolute top-4 right-4 z-10 pill ${
            doctor.available 
              ? 'bg-green-100 text-green-600 border border-green-200' 
              : 'bg-amber-100 text-amber-600 border border-amber-200'
          }`}
        >
          {doctor.available ? (
            <div className="flex items-center">
              <Check className="w-3 h-3 mr-1" />
              <span>Available</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>Next: {doctor.nextAvailable}</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-border flex-shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-1">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {specialtyName(doctor.specialty)} • {doctor.experience} years exp.
              </p>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-amber-500 mr-1" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-muted-foreground ml-1">({doctor.reviewCount})</span>
                </div>
                
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-muted-foreground">{doctor.education}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-start mb-2 md:mb-0">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Consultation Fee</span>
                  <span className="text-lg font-semibold">${doctor.fee}</span>
                </div>
              </div>
              
              <button
                onClick={handleBooking}
                className="button-primary"
                disabled={!doctor.available}
              >
                {doctor.available ? 'Book Appointment' : 'Check Availability'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Hover Info */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-center text-white p-6">
              <h4 className="text-xl font-bold mb-2">{doctor.name}</h4>
              <p className="mb-4">{doctor.education}</p>
              <button
                onClick={handleBooking}
                className="button-primary bg-white text-primary hover:bg-white/90"
              >
                View Profile & Book
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Helper function to map specialty ID to name
const specialtyName = (id: string): string => {
  const specialtyMap: Record<string, string> = {
    neurologist: 'Neurologist',
    cardiologist: 'Cardiologist',
    dermatologist: 'Dermatologist',
    orthopedist: 'Orthopedist',
    ophthalmologist: 'Ophthalmologist',
    pediatrician: 'Pediatrician',
    psychiatrist: 'Psychiatrist',
    gynecologist: 'Gynecologist',
  };
  
  return specialtyMap[id] || id;
};

export default DoctorCard;
