export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'studio' | 'penthouse';
  listingType: 'buy' | 'rent';
  price: number;
  size: number; // m²
  bedrooms: number;
  bathrooms: number;
  floor?: number;
  neighborhood: string;
  city: string;
  address: string;
  description: string;
  images: string[];
  features: string[];
  pricePerMeter: number;
  lastUpdated: string;
  coordinates: { lat: number; lng: number };
}

export interface Filters {
  listingType: 'buy' | 'rent';
  location: string;
  priceMin: number | null;
  priceMax: number | null;
  bedrooms: number | null;
  sizeMin: number | null;
  sizeMax: number | null;
  propertyType: Property['type'] | null;
  features: string[];
}

export interface WizardFormData {
  type: Property['type'] | null;
  listingType: 'buy' | 'rent';
  address: string;
  neighborhood: string;
  city: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  description: string;
  features: string[];
  images: string[];
}
