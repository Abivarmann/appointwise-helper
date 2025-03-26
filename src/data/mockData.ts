
export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  location: {
    area: string;
    district: string;
    state: string;
    country: string;
  };
  image: string;
  rating: number;
  reviewCount: number;
  experience: number;
  available: boolean;
  nextAvailable?: string;
  education: string;
  fee: number;
};

export type LocationType = {
  area: string;
  district: string;
  state: string;
  country: string;
};

export type Specialty = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const specialties: Specialty[] = [
  {
    id: "neurologist",
    name: "Neurologist",
    description: "Specializes in disorders of the nervous system",
    icon: "🧠",
  },
  {
    id: "cardiologist",
    name: "Cardiologist",
    description: "Specializes in disorders of the heart and blood vessels",
    icon: "❤️",
  },
  {
    id: "dermatologist",
    name: "Dermatologist",
    description: "Specializes in conditions involving the skin, hair, and nails",
    icon: "🧴",
  },
  {
    id: "orthopedist",
    name: "Orthopedist",
    description: "Specializes in conditions involving the musculoskeletal system",
    icon: "🦴",
  },
  {
    id: "ophthalmologist",
    name: "Ophthalmologist",
    description: "Specializes in eye and vision care",
    icon: "👁️",
  },
  {
    id: "pediatrician",
    name: "Pediatrician",
    description: "Specializes in the care of children",
    icon: "👶",
  },
  {
    id: "psychiatrist",
    name: "Psychiatrist",
    description: "Specializes in mental, emotional, and behavioral disorders",
    icon: "🧠",
  },
  {
    id: "gynecologist",
    name: "Gynecologist",
    description: "Specializes in female reproductive health",
    icon: "👩",
  },
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Emma Johnson",
    specialty: "neurologist",
    location: {
      area: "Downtown",
      district: "Central",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    reviewCount: 124,
    experience: 12,
    available: true,
    education: "Stanford University School of Medicine",
    fee: 150,
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    specialty: "cardiologist",
    location: {
      area: "Westside",
      district: "Central",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.7,
    reviewCount: 98,
    experience: 15,
    available: true,
    education: "Harvard Medical School",
    fee: 180,
  },
  {
    id: "3",
    name: "Dr. Sarah Miller",
    specialty: "dermatologist",
    location: {
      area: "Downtown",
      district: "Central",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/women/64.jpg",
    rating: 4.8,
    reviewCount: 112,
    experience: 8,
    available: true,
    education: "UCLA School of Medicine",
    fee: 130,
  },
  {
    id: "4",
    name: "Dr. Robert Chen",
    specialty: "orthopedist",
    location: {
      area: "Eastside",
      district: "Central",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4.6,
    reviewCount: 87,
    experience: 20,
    available: false,
    nextAvailable: "Tomorrow",
    education: "Johns Hopkins School of Medicine",
    fee: 200,
  },
  {
    id: "5",
    name: "Dr. Lisa Wong",
    specialty: "ophthalmologist",
    location: {
      area: "Downtown",
      district: "Central",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4.9,
    reviewCount: 156,
    experience: 14,
    available: true,
    education: "UCSF School of Medicine",
    fee: 160,
  },
  {
    id: "6",
    name: "Dr. Michael Brown",
    specialty: "pediatrician",
    location: {
      area: "Northside",
      district: "Central",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.8,
    reviewCount: 143,
    experience: 10,
    available: true,
    education: "Mayo Clinic School of Medicine",
    fee: 140,
  },
  {
    id: "7",
    name: "Dr. Jessica Park",
    specialty: "psychiatrist",
    location: {
      area: "Westside",
      district: "Central",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 4.7,
    reviewCount: 91,
    experience: 9,
    available: false,
    nextAvailable: "Thursday",
    education: "Yale School of Medicine",
    fee: 190,
  },
  {
    id: "8",
    name: "Dr. David Kim",
    specialty: "gynecologist",
    location: {
      area: "Downtown",
      district: "Central",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 4.8,
    reviewCount: 118,
    experience: 16,
    available: true,
    education: "Columbia University College of Physicians and Surgeons",
    fee: 170,
  },
  {
    id: "9",
    name: "Dr. Thomas Lee",
    specialty: "neurologist",
    location: {
      area: "Southside",
      district: "Eastern",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 4.6,
    reviewCount: 82,
    experience: 11,
    available: true,
    education: "Duke University School of Medicine",
    fee: 155,
  },
  {
    id: "10",
    name: "Dr. Emily Garcia",
    specialty: "cardiologist",
    location: {
      area: "Downtown",
      district: "Western",
      state: "California",
      country: "USA",
    },
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    rating: 4.9,
    reviewCount: 134,
    experience: 13,
    available: false,
    nextAvailable: "Friday",
    education: "University of Pennsylvania School of Medicine",
    fee: 175,
  }
];

export const findDoctorsByLocation = (location: LocationType): Doctor[] => {
  return doctors.filter(
    (doctor) => 
      doctor.location.area === location.area &&
      doctor.location.district === location.district &&
      doctor.location.state === location.state &&
      doctor.location.country === location.country
  );
};

export const findDoctorsBySpecialty = (doctors: Doctor[], specialty: string): Doctor[] => {
  return doctors.filter((doctor) => doctor.specialty === specialty);
};

export const findDoctorsByLocationAndSpecialty = (location: LocationType, specialty: string): Doctor[] => {
  const locationDoctors = findDoctorsByLocation(location);
  return findDoctorsBySpecialty(locationDoctors, specialty);
};

export const findNearbyDoctors = (location: LocationType, specialty: string): Doctor[] => {
  // For this mock data, we're just finding any doctors with the same specialty but possibly different locations
  const specialtyDoctors = doctors.filter((doctor) => 
    doctor.specialty === specialty && 
    (doctor.location.district === location.district || 
    doctor.location.state === location.state)
  );
  
  return specialtyDoctors.filter(
    (doctor) => 
      doctor.location.area !== location.area ||
      doctor.location.district !== location.district
  );
};

export const getAvailableLocations = (): {
  areas: string[],
  districts: string[],
  states: string[],
  countries: string[]
} => {
  const areas = [...new Set(doctors.map(doctor => doctor.location.area))];
  const districts = [...new Set(doctors.map(doctor => doctor.location.district))];
  const states = [...new Set(doctors.map(doctor => doctor.location.state))];
  const countries = [...new Set(doctors.map(doctor => doctor.location.country))];
  
  return { areas, districts, states, countries };
};
