
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAvailableLocations } from '@/data/mockData';

const LocationForm = () => {
  const navigate = useNavigate();
  const { areas, districts, states, countries } = getAvailableLocations();
  
  const [formData, setFormData] = useState({
    area: '',
    district: '',
    state: '',
    country: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!formData.area || !formData.district || !formData.state || !formData.country) {
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
                required
                className="input-field"
              >
                <option value="">Select Country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium text-foreground">
                State/Province
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="input-field"
                disabled={!formData.country}
              >
                <option value="">Select State/Province</option>
                {states.map(state => (
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
                {districts.map(district => (
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
                {areas.map(area => (
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
              disabled={!formData.area || !formData.district || !formData.state || !formData.country}
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
