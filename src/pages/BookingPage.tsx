
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import AppointmentForm from '@/components/booking/AppointmentForm';
import PageTransition from '@/components/ui/PageTransition';
import type { Doctor, LocationType } from '@/data/mockData';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, locationData } = location.state || {};
  
  // Redirect if data is not available
  useEffect(() => {
    if (!doctor || !locationData) {
      navigate('/');
    }
  }, [doctor, locationData, navigate]);
  
  if (!doctor || !locationData) {
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container-custom py-12">
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Doctors
            </button>
          </div>
          
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
            <p className="text-muted-foreground">
              Complete the form below to book your appointment with {doctor.name}
            </p>
          </div>
          
          <AppointmentForm doctor={doctor} locationData={locationData} />
        </main>
      </div>
    </PageTransition>
  );
};

export default BookingPage;
