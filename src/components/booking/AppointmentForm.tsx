
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, AlertCircle } from 'lucide-react';
import type { Doctor, LocationType } from '@/data/mockData';

interface AppointmentFormProps {
  doctor: Doctor;
  locationData: LocationType;
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
  '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM', 
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
];

const AppointmentForm = ({ doctor, locationData }: AppointmentFormProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for visit is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };
  
  const handlePrevStep = () => {
    setStep(1);
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (step === 2 && validateStep2()) {
      // Generate a random appointment number
      const appointmentNumber = Math.floor(100000 + Math.random() * 900000);
      
      // Calculate the estimated time (random for demo purposes)
      const waitTime = Math.floor(5 + Math.random() * 20);
      
      // Navigate to confirmation page
      navigate('/confirmation', {
        state: {
          doctor,
          locationData,
          appointment: {
            ...formData,
            appointmentNumber,
            waitTime,
            fee: doctor.fee
          }
        }
      });
    }
  };
  
  // Get tomorrow's date in YYYY-MM-DD format
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  // Get one month from now date in YYYY-MM-DD format
  const getOneMonthFromNow = () => {
    const oneMonth = new Date();
    oneMonth.setMonth(oneMonth.getMonth() + 1);
    return oneMonth.toISOString().split('T')[0];
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-card overflow-hidden border border-border">
        <div className="bg-primary/5 p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            Book Appointment with {doctor.name}
          </h2>
          <p className="text-muted-foreground mt-1">
            Fill out the form below to book your appointment
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.name ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.email ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="johndoe@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field pl-10 ${errors.phone ? 'border-red-300 focus:ring-red-500' : ''}`}
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium mb-1">
                    Reason for Visit
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={3}
                    className={`input-field ${errors.reason ? 'border-red-300 focus:ring-red-500' : ''}`}
                    placeholder="Please describe your symptoms or reason for the appointment"
                  />
                  {errors.reason && <p className="text-sm text-red-500 mt-1">{errors.reason}</p>}
                </div>
                
                <div className="pt-4">
                  <motion.button
                    type="button"
                    onClick={handleNextStep}
                    className="button-primary w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to Select Date & Time
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium mb-1">
                      Select Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={getTomorrowDate()}
                        max={getOneMonthFromNow()}
                        className={`input-field pl-10 ${errors.date ? 'border-red-300 focus:ring-red-500' : ''}`}
                      />
                    </div>
                    {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium mb-1">
                      Select Time Slot
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`input-field pl-10 ${errors.time ? 'border-red-300 focus:ring-red-500' : ''}`}
                      >
                        <option value="">Select Time Slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                    {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1">Important Information</h4>
                      <p className="text-sm text-amber-700">
                        Please arrive 15 minutes before your scheduled appointment time.
                        There will be a consultation fee of ${doctor.fee} payable at the clinic.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex items-center space-x-4">
                  <motion.button
                    type="button"
                    onClick={handlePrevStep}
                    className="button-secondary flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    className="button-primary flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm Booking
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
