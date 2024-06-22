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

type OpenHours = {
    open: number;
    close: number;
  };
  
  type DaySpecials = string[];
  
  type HappyHour = {
    time: string;
    specials: string[];
    dow: string[];
  };
  
  type Restaurant = {
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

const HappyHourNavigator = () => {
  const sampleDeals = [
    {
      id: 1,
      name: "The Rusty Nail",
      address: "123 Pine St, Downtown, Anytown, USA",
      phone: "(555) 123-4567",
      website: "www.therustynail.com",
      restrictions: "Dine-in only, must be 21+",
      specials: [
        {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          hours: [
            { start: "16:00", end: "19:00", deals: ["$4 Craft Beers", "$6 Signature Cocktails"] },
            { start: "22:00", end: "23:59", deals: ["$3 Domestic Beers", "$5 Well Drinks"] }
          ]
        },
        {
          days: ["Saturday", "Sunday"],
          hours: [
            { start: "12:00", end: "15:00", deals: ["$5 Bloody Marys", "$5 Mimosas"] }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Sushi Paradise",
      address: "456 Cherry Blossom Ave, Midtown, Anytown, USA",
      phone: "(555) 987-6543",
      website: "www.sushiparadise.com",
      restrictions: "Cannot be combined with other offers",
      specials: [
        {
          days: ["Tuesday", "Thursday"],
          hours: [
            { start: "17:00", end: "20:00", deals: ["50% off select rolls", "$5 Sake bombs"] }
          ]
        },
        {
          days: ["Friday"],
          hours: [
            { start: "16:00", end: "18:00", deals: ["Buy one roll, get one 50% off"] },
            { start: "21:00", end: "23:00", deals: ["$3 Beer", "$4 Hot Sake"] }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "El Taco Loco",
      address: "789 Spicy Lane, Westside, Anytown, USA",
      phone: "(555) 246-8135",
      website: "www.eltacoloco.com",
      restrictions: "Limited to 6 tacos per person",
      specials: [
        {
          days: ["Monday", "Wednesday", "Friday"],
          hours: [
            { start: "15:00", end: "18:00", deals: ["$2 Tacos", "$3 Coronas", "$5 Margaritas"] }
          ]
        },
        {
          days: ["Tuesday"],
          hours: [
            { start: "11:00", end: "14:00", deals: ["$1 Taco Tuesday Lunch Special"] },
            { start: "18:00", end: "20:00", deals: ["$10 All-You-Can-Eat Taco Tuesday Dinner"] }
          ]
        },
        {
          days: ["Saturday", "Sunday"],
          hours: [
            { start: "12:00", end: "16:00", deals: ["$15 Bottomless Margaritas with food purchase"] }
          ]
        }
      ]
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [deals, setDeals] = useState(sampleDeals);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredDeals = deals.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.specials.some(special => 
      special.days.some(day => day.toLowerCase().includes(searchTerm.toLowerCase())) ||
      special.hours.some(hour => 
        hour.deals.some(deal => deal.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )
  );

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map(deal => (
          <Card key={deal.id} className="overflow-hidden">
            <CardHeader className="bg-slate-100">
              <CardTitle>{deal.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="mb-2"><strong>Address:</strong> {deal.address}</p>
              <div className="flex items-center mb-2">
                <Phone className="h-4 w-4 mr-2" />
                <a href={`tel:${deal.phone}`} className="text-blue-600 hover:underline">{deal.phone}</a>
              </div>
              <div className="flex items-center mb-2">
                <Globe className="h-4 w-4 mr-2" />
                <a href={`https://${deal.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{deal.website}</a>
              </div>
              <p className="text-sm text-gray-600 italic mb-4">{deal.restrictions}</p>
              <Accordion type="single" collapsible className="w-full">
                {deal.specials.map((special, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{special.days.join(', ')}</AccordionTrigger>
                    <AccordionContent>
                      {special.hours.map((hour, hourIndex) => (
                        <div key={hourIndex} className="mb-2">
                          <p className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {formatTime(hour.start)} - {formatTime(hour.end)}
                          </p>
                          <ul className="list-disc list-inside">
                            {hour.deals.map((deal, dealIndex) => (
                              <li key={dealIndex}>{deal}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HappyHourNavigator;