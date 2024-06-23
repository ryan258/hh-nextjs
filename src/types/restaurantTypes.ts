// src/types/restaurantTypes.ts

export type OpenHours = {
    open: number;
    close: number;
  };
  
  export type DaySpecials = string[];
  
  export type HappyHour = {
    time: string;
    specials: string[];
    dow: string[];
  };
  
  export type Restaurant = {
    id: string;
    name: string;
    location: string;
    address: string;
    phone: string;
    website: string;
    facebook?: string;
    instagram?: string;
    googleMap: string;
    cuisine: string[];
    priceRange: string;
    rating?: number;
    reviews?: number;
    description?: string;
    restrictions?: string;
    openHours: {
      [key: string]: OpenHours;
    };
    specials: {
      [key: string]: DaySpecials;
    };
    happyHours: HappyHour[];
  };