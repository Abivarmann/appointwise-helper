export interface LocationType {
  area: string;
  district: string;
  state: string;
  country: string;
}

export const getAvailableLocations = () => {
  return {
    areas: ["Bandra", "Andheri", "Colaba", "Borivali", "Ghatkopar"],
    districts: ["Mumbai Suburban", "Mumbai City"],
    states: ["Maharashtra"],
    countries: ["India"],
  };
};

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  clinic: string;
  address: string;
  available: boolean;
  availableDays: string[];
  rating: number;
  reviews: number;
  fee: number;
  experience: number;
  image: string;
  waitTime?: number; // in minutes
}

// Specialty data with icons and descriptions
export const specialties = [
  {
    id: "Cardiologist",
    name: "Cardiologist",
    icon: "❤️",
    description: "Heart specialists treating cardiovascular conditions"
  },
  {
    id: "Dermatologist",
    name: "Dermatologist",
    icon: "🧬",
    description: "Skin, hair and nail specialists"
  },
  {
    id: "Neurologist",
    name: "Neurologist",
    icon: "🧠",
    description: "Brain and nervous system specialists"
  },
  {
    id: "Orthopedic",
    name: "Orthopedic",
    icon: "🦴",
    description: "Bone and joint specialists"
  },
  {
    id: "Pediatrician",
    name: "Pediatrician",
    icon: "👶",
    description: "Child health specialists"
  },
  {
    id: "Psychiatrist",
    name: "Psychiatrist",
    icon: "🧘",
    description: "Mental health specialists"
  },
  {
    id: "Gynecologist",
    name: "Gynecologist",
    icon: "👩",
    description: "Women's health specialists"
  },
  {
    id: "Ophthalmologist",
    name: "Ophthalmologist",
    icon: "👁️",
    description: "Eye specialists"
  },
  {
    id: "General Physician",
    name: "General Physician",
    icon: "🩺",
    description: "Primary healthcare providers"
  }
];

export const getDoctors = (locationData: LocationType, specialty?: string): Doctor[] => {
  // Create a deterministic but seemingly random set of doctors based on the location
  const seed = `${locationData.area}-${locationData.district}-${locationData.state}-${locationData.country}`;
  let seedValue = 0;
  for (let i = 0; i < seed.length; i++) {
    seedValue += seed.charCodeAt(i);
  }
  
  const clinics = [
    "Apollo Hospital",
    "Max Healthcare",
    "Fortis Hospital",
    "Medanta",
    "AIIMS",
    "City Hospital",
    "LifeCare Clinic",
    "MediCenter",
    "Health Point",
    "Care & Cure Clinic"
  ];
  
  const generateDoctor = (id: number): Doctor => {
    const randomValue = (seedValue + id) * 9973; // Use a prime number for better distribution
    const specialtyIndex = randomValue % specialties.length;
    const clinicIndex = (randomValue / 10) % clinics.length;
    const available = (randomValue % 5) !== 0; // 80% availability
    const rating = 3.5 + (randomValue % 20) / 10; // Rating between 3.5 and 5.5
    const fee = 500 + (randomValue % 10) * 200; // Fee between 500 and 2300
    const experience = 2 + (randomValue % 20); // Experience between 2 and 21 years
    const waitTime = 5 + (randomValue % 60); // Wait time between 5 and 64 minutes
    
    // Generate a set of available days (at least 3 days a week)
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const shuffledDays = [...days].sort(() => 0.5 - Math.random());
    const numDays = 3 + (randomValue % 4); // Between 3 and 6 days
    const availableDays = shuffledDays.slice(0, numDays);
    
    return {
      id,
      name: `Dr. ${String.fromCharCode(65 + (randomValue % 26))}${String.fromCharCode(97 + ((randomValue / 100) % 26))}${String.fromCharCode(97 + ((randomValue / 10000) % 26))}${String.fromCharCode(97 + ((randomValue / 1000000) % 26))}`,
      specialty: specialties[specialtyIndex].name,
      clinic: clinics[clinicIndex],
      address: `${locationData.area}, ${locationData.district}`,
      available,
      availableDays,
      rating,
      reviews: 10 + (randomValue % 200),
      fee,
      experience,
      image: `/placeholder.svg`,
      waitTime
    };
  };
  
  // Generate a list of doctors
  const doctorCount = 10 + (seedValue % 15); // Between 10 and 24 doctors
  let doctors: Doctor[] = [];
  
  for (let i = 1; i <= doctorCount; i++) {
    doctors.push(generateDoctor(i));
  }
  
  // Filter by specialty if provided
  if (specialty) {
    doctors = doctors.filter(doctor => doctor.specialty === specialty);
  }
  
  return doctors;
};

// Function to find doctors by location and specialty
export const findDoctorsByLocationAndSpecialty = (
  locationData: LocationType,
  specialty: string
): Doctor[] => {
  return getDoctors(locationData).filter(
    (doctor) => doctor.specialty === specialty
  );
};

// Function to find nearby doctors
export const findNearbyDoctors = (
  locationData: LocationType,
  specialty: string
): Doctor[] => {
  // In a real app, this would use geolocation to find truly nearby doctors
  // For demo purposes, we'll just return doctors with the same specialty from a different area
  
  // Create a "nearby" location by slightly modifying the area
  const nearbyLocation: LocationType = {
    ...locationData,
    area: locationData.area === "Bandra" ? "Andheri" : "Bandra",
  };
  
  return getDoctors(nearbyLocation).filter(
    (doctor) => doctor.specialty === specialty
  ).slice(0, 3); // Limit to 3 nearby doctors
};
