export type DealType = 'sale' | 'rent' | 'daily';

export type PropertyType = 'apartment' | 'house' | 'cottage' | 'commercial' | 'land';

export interface Property {
  id: string;
  code: string; // e.g. "127841"
  title: string;
  dealType: DealType;
  propertyType: PropertyType;
  priceUZS: number;
  priceUSD: number;
  rooms: number;
  bathrooms: number;
  floor: number;
  totalFloors: number;
  area: number; // m²
  address: string;
  district: string; // e.g., "Nukus shahri, Markaz", "Kosmonavtlar", etc.
  images: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  hasMortgage?: boolean;
  priceDropped?: boolean;
  renovation: 'Evroremont' | "O'rta" | 'Qora suvoq' | 'Toza';
  description: string;
  amenities: string[];
  owner: {
    name: string;
    type: 'Mulkdor' | 'Rieltor' | 'Agentlik';
    phone: string;
    telegram: string;
    verified: boolean;
    avatar: string;
  };
  createdAt: string;
}

export type Currency = 'UZS' | 'USD';
export type Language = 'uz' | 'ru';

export interface FilterState {
  dealType: DealType;
  propertyType: string;
  district: string;
  rooms: string;
  priceMin: string;
  priceMax: string;
  searchQuery: string;
  hasMortgageOnly: boolean;
  verifiedOnly: boolean;
}
