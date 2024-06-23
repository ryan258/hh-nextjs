'use client';

import React, { useState } from 'react';
import { Search, Phone, Globe, Clock, Facebook, Instagram, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Restaurant } from '@/types/restaurantTypes';

const sampleDeals: Restaurant[] = [
  {
    id: "twinpeaksrogers",
    name: "Twin Peaks",
    location: "Rogers",
    address: "123 Main St, Rogers, AR 72756", // You'll need to add the correct address
    phone: "(555) 123-4567", // You'll need to add the correct phone number
    website: "https://twinpeaksrestaurant.com/locations/rogers-ar",
    facebook: "https://www.facebook.com/TwinPeaksRogers/",
    instagram: "https://www.instagram.com/rogerstwinpeaks/",
    googleMap: "https://www.google.com/maps/place/Twin+Peaks+Rogers/@36.3011917,-94.1738379,15z/data=!4m5!3m4!1s0x0:0xca20801366951863!8m2!3d36.3011917!4d-94.1738379",
    cuisine: ["American", "Bar Food"],
    priceRange: "$$",
    openHours: {
      monday: { open: 1100, close: 2400 },
      tuesday: { open: 1100, close: 2400 },
      wednesday: { open: 1100, close: 2400 },
      thursday: { open: 1100, close: 2500 },
      friday: { open: 1100, close: 2600 },
      saturday: { open: 1100, close: 2600 },
      sunday: { open: 1100, close: 2400 }
    },
    specials: {
      monday: ["$3.99 Man Cans", "$2 Domestic Bottles", "$10.99 22oz Twin Peaks Brew & 6 Boneless Wings w/ Fries"],
      tuesday: ["$3.99 House Ritas", "$2 Domestic Bottles", "$10.99 22oz Mexican Beer & Buffalo Chicken Tacos"],
      wednesday: ["$3.99 All Wines by the Glass", "$2 Domestic Bottles", "$10.99 22oz Domestic Beers & Cheeseburgers"],
      thursday: ["$3.99 All Seltzers", "$2 Domestic Bottles", "$10.99 22oz Samuel Adams Seasonal & Chicken Tenders"],
      friday: ["Bourbon & Brews (5-7pm)", "$3.99 Jim Beam Old Fashioned"],
      saturday: ["$3.99 Miller Lite & Coors Light", "$10 Peaks Sampler"],
      sunday: ["$3.99 Miller Lite & Coors Light", "$10 Peaks Sampler", "$2 Domestic Bottles"]
    },
    happyHours: [
      {
        time: "11-3pm: Lunch Combos",
        specials: ["Lunch Combos Starting at $7.29"],
        dow: ["monday", "tuesday", "wednesday", "thursday", "friday"]
      },
      {
        time: "3-6pm",
        specials: ["1/2 Off Appetizers", "$1.50  10oz Domestic Brews", "$2.50  10oz Twin Peaks Brews", "$3 22oz Domestic Brews", "$3.50  22oz Twin Peaks Brews"],
        dow: ["monday", "tuesday", "wednesday", "thursday", "friday"]
      },
      {
        time: "10pm-Close: Late Night Munchies!",
        specials: ["1/2 Off Appetizers"],
        dow: ["sunday", "monday", "tuesday", "wednesday", "thursday"]
      },
      {
        time: "All Day, Every Day!",
        specials: ["$3.99 Select Shots", "$5 Cocktails"],
        dow: ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"]
      }
    ]
  }
  // Add more restaurants here as needed
];

const HappyHourNavigator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [deals, setDeals] = useState<Restaurant[]>(sampleDeals);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDaySelect = (day: string) => {
    setSelectedDay(prevDay => prevDay === day ? null : day);
  };

  const filteredDeals = deals.filter(restaurant =>
    (searchTerm === '' || 
     restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
     Object.values(restaurant.specials).some(daySpecials => 
       daySpecials.some(special => special.toLowerCase().includes(searchTerm.toLowerCase()))
     ) ||
     restaurant.happyHours.some(happyHour => 
       happyHour.specials.some(special => special.toLowerCase().includes(searchTerm.toLowerCase()))
     )) &&
    (selectedDay === null || 
     restaurant.specials[selectedDay.toLowerCase()] ||
     restaurant.happyHours.some(happyHour => happyHour.dow.includes(selectedDay.toLowerCase())))
  );

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Happy Hour Navigator</h1>
      <div className="flex mb-6">
        <Input
          type="text"
          placeholder="Search for deals, days, or restaurants..."
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow mr-2"
        />
        <Button>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            onClick={() => handleDaySelect(day)}
          >
            {day}
          </Button>
        ))}
      </div>
      {selectedDay && (
        <p className="mb-4 text-sm text-gray-600">
          Showing deals for {selectedDay}. <button onClick={() => setSelectedDay(null)} className="text-blue-600 hover:underline">Clear filter</button>
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map(restaurant => (
          <Card key={restaurant.id}>
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
              <p>{restaurant.location}</p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <a href={restaurant.googleMap} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View on Google Maps
                  </a>
                </p>
                <p className="flex items-center mb-2">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${restaurant.phone}`} className="text-blue-600 hover:underline">{restaurant.phone}</a>
                </p>
                <p className="flex items-center mb-2">
                  <Globe className="h-4 w-4 mr-2" />
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Website
                  </a>
                </p>
                {restaurant.facebook && (
                  <p className="flex items-center mb-2">
                    <Facebook className="h-4 w-4 mr-2" />
                    <a href={restaurant.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Facebook
                    </a>
                  </p>
                )}
                {restaurant.instagram && (
                  <p className="flex items-center mb-2">
                    <Instagram className="h-4 w-4 mr-2" />
                    <a href={restaurant.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Instagram
                    </a>
                  </p>
                )}
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Daily Specials</AccordionTrigger>
                  <AccordionContent>
                    {Object.entries(restaurant.specials).map(([day, specials]) => (
                      <div key={day} className="mb-2">
                        <h4 className="font-semibold capitalize">{day}</h4>
                        <ul className="list-disc list-inside">
                          {specials.map((special, index) => (
                            <li key={index}>{special}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Happy Hours</AccordionTrigger>
                  <AccordionContent>
                    {restaurant.happyHours.map((happyHour, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-semibold">{happyHour.time}</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          {happyHour.dow.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')}
                        </p>
                        <ul className="list-disc list-inside">
                          {happyHour.specials.map((special, specialIndex) => (
                            <li key={specialIndex}>{special}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Opening Hours</AccordionTrigger>
                  <AccordionContent>
                    {Object.entries(restaurant.openHours).map(([day, hours]) => (
                      <p key={day} className="mb-1">
                        <span className="font-semibold capitalize">{day}: </span>
                        {formatTime(hours.open)} - {formatTime(hours.close)}
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HappyHourNavigator;