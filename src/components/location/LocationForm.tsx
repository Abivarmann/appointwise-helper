
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAvailableLocations } from '@/data/mockData';
import { toast } from "sonner";
import LocationMap from './LocationMap';

const LocationForm = () => {
  const navigate = useNavigate();
  const { areas, districts, states, countries } = getAvailableLocations();
  
  // Sort location data alphabetically
  const sortedStates = [...states].sort((a, b) => a.localeCompare(b));
  
  const [formData, setFormData] = useState({
    area: '',
    district: '',
    state: '',
    country: 'India' // Default to India
  });
  
  // Filter options based on selections
  const [filteredDistricts, setFilteredDistricts] = useState<string[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | null>(null);
  
  // Generate deterministic but realistic coordinates for India
  const getIndiaCoordinates = (): [number, number] => {
    // Center coordinates of India (approximate)
    return [78.9629, 20.5937]; 
  };

  // Generate coordinates for a state within India
  const getStateCoordinates = (state: string): [number, number] => {
    // Use a deterministic approach to generate realistic coordinates within India
    // This is a simplified implementation
    const stateHash = state.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Longitude range for India: approximately 68 to 97
    // Latitude range for India: approximately 8 to 37
    const longitude = 68 + (stateHash % 29);
    const latitude = 8 + (stateHash % 29);
    return [longitude, latitude];
  };

  // Set India coordinates by default
  useEffect(() => {
    setSelectedCoordinates(getIndiaCoordinates());
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update filtered options based on selection
    if (name === 'state') {
      if (value) {
        // Filter districts based on selected state
        // For a real app, this would use actual data relationships
        // For this demo, we'll use a deterministic but consistent approach
        const statePrefix = value.substring(0, 3).toLowerCase();
        const stateRelatedDistricts = districts.filter(district => {
          // Include districts that have some relationship with the state name
          // or follow a deterministic pattern based on the state
          return (
            district.toLowerCase().includes(statePrefix) ||
            district.charCodeAt(0) % sortedStates.indexOf(value) === 0 ||
            district.length % (sortedStates.indexOf(value) + 1) === 0
          );
        });
        
        // Ensure we have at least some districts
        const districtsList = stateRelatedDistricts.length > 0 
          ? stateRelatedDistricts 
          : districts.slice(0, 10);
        
        // Sort districts alphabetically
        setFilteredDistricts([...districtsList].sort((a, b) => a.localeCompare(b)));
        
        // Update map coordinates based on selected state
        setSelectedCoordinates(getStateCoordinates(value));
      } else {
        setFilteredDistricts([]);
        setSelectedCoordinates(getIndiaCoordinates());
      }
      
      // Reset district and area selections
      setFilteredAreas([]);
      setFormData(prev => ({ ...prev, district: '', area: '' }));
    }
    
    if (name === 'district') {
      if (value) {
        // Filter areas based on selected district
        // Similar approach as above for generating related areas
        const districtPrefix = value.substring(0, 3).toLowerCase();
        const districtRelatedAreas = areas.filter(area => {
          return (
            area.toLowerCase().includes(districtPrefix) ||
            area.charCodeAt(0) % filteredDistricts.indexOf(value) === 0 ||
            area.length % (filteredDistricts.indexOf(value) + 1) === 0
          );
        });
        
        // Ensure we have at least some areas
        const areasList = districtRelatedAreas.length > 0 
          ? districtRelatedAreas 
          : areas.slice(0, 10);
        
        // Sort areas alphabetically
        setFilteredAreas([...areasList].sort((a, b) => a.localeCompare(b)));
        
        // Generate district coordinates - would ideally use real geocoding
        const districtHash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const stateCoords = selectedCoordinates || getIndiaCoordinates();
        const longitude = stateCoords[0] + (districtHash % 5 - 2.5) / 10;
        const latitude = stateCoords[1] + (districtHash % 5 - 2.5) / 10;
        setSelectedCoordinates([longitude, latitude]);
      } else {
        setFilteredAreas([]);
        // Reset to state coordinates if district is cleared
        if (formData.state) {
          setSelectedCoordinates(getStateCoordinates(formData.state));
        }
      }
      
      // Reset area selection
      setFormData(prev => ({ ...prev, area: '' }));
    }
    
    if (name === 'area' && value) {
      // Update map coordinates for selected area - would ideally use real geocoding
      const areaHash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const districtCoords = selectedCoordinates || getIndiaCoordinates();
      const longitude = districtCoords[0] + (areaHash % 5 - 2.5) / 20;
      const latitude = districtCoords[1] + (areaHash % 5 - 2.5) / 20;
      setSelectedCoordinates([longitude, latitude]);
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.area || !formData.district || !formData.state) {
      toast.error("Please select all location fields before searching.");
      return;
    }
    
    // Navigate to doctors page with location data
    navigate('/doctors', { state: { location: formData } });
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="w-full max-w-3xl mx-auto relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="glass-card overflow-hidden p-6 relative z-10">
        <div className="flex items-center space-x-2 mb-6">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Find Doctors Near You</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" variants={itemVariants}>
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium text-foreground">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="input-field bg-gray-100"
                disabled={true} // Disabled as we're only showing India
              >
                <option value="India">India</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium text-foreground">
                State/Union Territory
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select State/Union Territory</option>
                {sortedStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="district" className="text-sm font-medium text-foreground">
                District/City
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="input-field"
                disabled={!formData.state}
              >
                <option value="">Select District/City</option>
                {filteredDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="area" className="text-sm font-medium text-foreground">
                Area/Neighborhood
              </label>
              <select
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                className="input-field"
                disabled={!formData.district}
              >
                <option value="">Select Area/Neighborhood</option>
                {filteredAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </motion.div>
          
          <motion.div
            className="flex justify-center"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              className="button-primary w-full md:w-auto"
              disabled={!formData.area || !formData.district || !formData.state}
            >
              <Search className="w-4 h-4 mr-2" />
              Find Doctors
            </button>
          </motion.div>
        </form>
      </div>
      
      {/* Background Map */}
      <div className="absolute inset-0 -z-10 rounded-xl overflow-hidden">
        {selectedCoordinates && (
          <LocationMap 
            coordinates={selectedCoordinates}
            zoom={formData.area ? 12 : formData.district ? 10 : formData.state ? 8 : 5}
            className="w-full h-full"
          />
        )}
      </div>
    </motion.div>
  );
};

export default LocationForm;
