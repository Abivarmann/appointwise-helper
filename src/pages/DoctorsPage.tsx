
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import DoctorsList from '@/components/doctors/DoctorsList';
import PageTransition from '@/components/ui/PageTransition';
import type { LocationType } from '@/data/mockData';

const DoctorsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationData = location.state?.location as LocationType;
  
  // Redirect to home if location data is not available
  useEffect(() => {
    if (!locationData) {
      navigate('/', { replace: true });
    }
  }, [locationData, navigate]);
  
  if (!locationData) {
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
              Back to Location
            </button>
          </div>
          
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-2">Find Doctors</h1>
            <p className="text-muted-foreground">
              Showing doctors in {locationData.area}, {locationData.district}, {locationData.state}, {locationData.country}
            </p>
          </div>
          
          <DoctorsList locationData={locationData} />
        </main>
      </div>
    </PageTransition>
  );
};

export default DoctorsPage;
