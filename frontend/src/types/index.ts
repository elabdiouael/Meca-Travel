export interface Hotel {
    id: number;
    name: string;
    city: string;
    stars: number;
    distanceFromHaram: string;
    mainImageUrl: string;
    imageUrls: string[];
  }
  
  export interface PackageOption {
    id: number;
    roomType: 'QUADRUPLE' | 'TRIPLE' | 'DOUBLE' | 'SINGLE';
    pricePerPerson: number;
  }
  
  export interface PackageItinerary {
    id: number;
    dayNumber: number;
    title: string;
    description: string;
  }
  
  export interface TravelPackage {
    id: number;
    title: string;
    description: string;
    mainImageUrl: string;
    imageUrls: string[];
    airlineName: string;
    airlineLogoUrl: string;
    guideName: string;
    features: string[];
    itinerary: PackageItinerary[];
    options: PackageOption[];
    departureDate: string;
    returnDate: string;
    type: 'HAJJ' | 'OMRA' | 'VOYAGE_ORGANISE';
    hotels: Hotel[];
  }
  
  export interface BookingRequest {
    clientName: string;
    phoneNumber: string;
    email: string;
    numberOfPeople: number;
  }