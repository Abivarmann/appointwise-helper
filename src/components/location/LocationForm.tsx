
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAvailableLocations } from '@/data/mockData';
import { toast } from "sonner";

const LocationForm = () => {
  const navigate = useNavigate();
  const { areas, districts, states, countries } = getAvailableLocations();
  
  const [formData, setFormData] = useState({
    area: '',
    district: '',
    state: '',
    country: 'India' // Default to India
  });
  
  // Filter options based on selections
  const [filteredStates, setFilteredStates] = useState(states);
  const [filteredDistricts, setFilteredDistricts] = useState<string[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<string[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update filtered options based on selection
    if (name === 'state') {
      // For demo purposes, filter districts randomly but consistently based on state
      const stateHash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const filteredDistrictsList = districts.filter((_, index) => {
        return (index + stateHash) % 3 === 0 || (index + stateHash) % 7 === 0;
      });
      setFilteredDistricts(filteredDistrictsList.length > 0 ? filteredDistrictsList : districts.slice(0, 5));
      setFilteredAreas([]);
      setFormData(prev => ({ ...prev, district: '', area: '' }));
    }
    
    if (name === 'district') {
      // For demo purposes, filter areas randomly but consistently based on district
      const districtHash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const filteredAreasList = areas.filter((_, index) => {
        return (index + districtHash) % 4 === 0 || (index + districtHash) % 5 === 0;
      });
      setFilteredAreas(filteredAreasList.length > 0 ? filteredAreasList : areas.slice(0, 5));
      setFormData(prev => ({ ...prev, area: '' }));
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
      className="w-full max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="glass-card overflow-hidden p-6">
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
                {filteredStates.map(state => (
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
    </motion.div>
  );
};

export default LocationForm;
