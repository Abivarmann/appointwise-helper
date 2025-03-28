
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Header from '@/components/layout/Header';
import AppointmentConfirmation from '@/components/booking/AppointmentConfirmation';
import PageTransition from '@/components/ui/PageTransition';
import type { Doctor, LocationType } from '@/data/mockData';

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  reason: string;
  appointmentNumber: number;
  waitTime: number;
  fee: number;
}

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, locationData, appointment } = location.state || {};
  
  // Redirect if data is not available
  useEffect(() => {
    if (!doctor || !locationData || !appointment) {
      navigate('/');
    }
  }, [doctor, locationData, appointment, navigate]);
  
  if (!doctor || !locationData || !appointment) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container-custom py-12">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-2">Appointment Confirmed!</h1>
            <p className="text-muted-foreground">
              Your appointment details and e-ticket are provided below
            </p>
          </div>
          
          <AppointmentConfirmation 
            doctor={doctor} 
            locationData={locationData} 
            appointment={appointment as AppointmentData} 
          />
          
          <div className="mt-10 text-center">
            <button 
              onClick={() => navigate('/')}
              className="button-secondary inline-flex items-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </button>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default ConfirmationPage;
