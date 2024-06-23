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
    "id": "twinpeaksrogers",
    "name": "Twin Peaks",
    "location": "Rogers",
    "address": "2400 S PROMENADE BLVD, ROGERS, AR",
    "phone": "", // Not provided in the PDF
    "website": "https://twinpeaksrestaurant.com/locations/rogers-ar",
    "facebook": "https://www.facebook.com/TwinPeaksRogers/",
    "instagram": "https://www.instagram.com/rogerstwinpeaks/",
    "googleMap": "https://www.google.com/maps/place/Twin+Peaks+Rogers/@36.3011917,-94.1738379,15z/data=!4m5!3m4!1s0x0:0xca20801366951863!8m2!3d36.3011917!4d-94.1738379",
    "cuisine": ["American", "Bar Food"],
    "priceRange": "$$",
    openHours: {
      monday: { open: 1100, close: 2400 },
      tuesday: { open: 1100, close: 2400 },
      wednesday: { open: 1100, close: 2400 },
      thursday: { open: 1100, close: 2400 },
      friday: { open: 1100, close: 2500 },
      saturday: { open: 1100, close: 2500 },
      sunday: { open: 1100, close: 2400 }
    },
    "specials": {
    "monday": ["$5.99 YUENGLING 22 oz.", "$5 HOUSE LONG ISLAND ICED TEA"],
    "tuesday": ["$8.99 STREET TACOS", "$5.99 MEXICAN DRAFTS 22 oz.", "$5 HOUSE MARGARITA"],
    "wednesday": ["$8 SAZERAC RYE OLD FASHIONED", "$5.99 SHINER BOCK 22 oz.", "BUY 6 WINGS GET 6 FREE"],
    "thursday": ["$5 SANGRIA", "$5 WINE BY THE GLASS & BOTTLE PRICED 1/2", "$5.99 SHINER BOCK 22 oz."],
    "friday": ["$3.99 FIREBALL SHOTS"],
    "saturday": ["$5 MIMOSA, SANGRIA, HOUSE BLOODY MARY", "$1 OFF BUD LIGHT 22 oz.", "KIDS EAT FREE (11AM-4PM)"],
    "sunday": ["$5 MIMOSA, SANGRIA, HOUSE BLOODY MARY", "$1 OFF MILLER LITE & COORS LIGHT 22 oz.", "KIDS EAT FREE (11AM-4PM)"]
  },
  "happyHours": [
    {
      "time": "3PM-6PM",
      "specials": [
        "$2 CRISPY MINI BEEF TACOS",
        "$3 CHIPS & SALSA",
        "$1 OFF 22 oz. DOMESTIC DRAFTS",
        "$2 OFF 22 oz. TWIN PEAKS DRAFTS",
        "$5 FRIED PICKLES, CHIPS & QUESO, MOZZARELLA BITES",
        "$7 TRIPLE PLAYS, QUESADILLAS, LOADED FRIES"
      ],
      "dow": ["monday", "tuesday", "wednesday", "thursday", "friday"]
    },
    {
      "time": "10PM-CLOSE: Late Night Happy Hour",
      "specials": ["$5.49 TWIN PEAKS & DOMESTICS 22 oz.", "$8.99 FLATBREADS"],
      "dow": ["sunday", "monday", "tuesday", "wednesday", "thursday"]
    },
    {
      "time": "All Day, Every Day!",
      "specials": ["$3.99 CHEAP SHOTS", "$5 CLASSICS"],
      "dow": ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"]
    }
  ]
  },
  {
    id: "gusanosbentonville",
    name: "Gusano's Chicago-Style Pizzeria", 
    location: "Bentonville", 
    address: "2905 S Walton Blvd #9, Bentonville, AR 72712", 
    phone: "(479) 271-8242", 
    website: "https://gusanos.pizza/",
    facebook: "https://www.facebook.com/Gusanos-Chicago-Style-Pizzeria-109101078783045/",
    instagram: "https://www.instagram.com/explore/locations/138576752827437/gusanos-chicago-style-pizzeria-bentonville-ar/",
    googleMap: "https://goo.gl/maps/gE3hRqDaW2rUXf128",
    cuisine: ["Pizza", "Italian"], 
    priceRange: "$$", 
    openHours: {
      monday: {
        open: 1100,
        close: 2200
      },
      tuesday: {
        open: 1100,
        close: 2200
      },
      wednesday: {
        open: 1100,
        close: 2200
      },
      thursday: {
        open: 1100,
        close: 2200
      },
      friday: {
        open: 1100,
        close: 2300
      },
      saturday: {
        open: 1100,
        close: 2300
      },
      sunday: {
        open: 1100,
        close: 2200
      }
    },
    specials: {
        "monday": ["AFTER 4PM: $8 Domestic Pitchers", "$3 Kid's Cheese or Pepperoni", "$2 off Calzones"],
        "tuesday": ["AFTER 4PM: $3 Domestic Bottles", "$3 Kid's Cheese or Pepperoni", "25% off Chicago Dogs"],
        "wednesday": ["AFTER 4PM: $5 Signature Drinks", "$3.99 Cheese Stix", "$10.99 - 13\" One Topping (Dine-In)", "$11.99 - 13\" One Topping (To-Go)"],
        "thursday": ["AFTER 4PM: 50¢ off Tall Boy Cans", "25% off Wings"],
        "friday": ["AFTER 4PM: $4 House Wine"],
        "saturday": ["$8 Domestic Pitchers", "$3 Fireball Shots", "$21.99 - 16\" 3 Topping"],
        "sunday": ["Family Special: 13\" One Topping, 13\" Chicago Specialty & Cheese Sticks - $34.99", "$3 Mimosas", "$3 Screwdrivers", "$3 Bloody Marys", "$1 off 22oz \"Draft of the Week\""]
    },
    happyHours: [
      {
        time: 'All Day Specials!',
        specials: ["$15 Domestic Bottle Buckets", "$22.50 High Noon Buckets","$17.50 White Claw or Scarlett Letter Buckets"],
        dow: ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"]
      },
      {
        time: '3-7pm',
        specials: ['$1 off Drafts', '$1 off Wells', '$1 off Wines'],
        dow: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      },
      {
        time: '5-6pm: Happiest Hour!',
        specials: ['$1 12oz Domestic Drafts', '$2 22oz Domestic Drafts'],
        dow: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      }
    ]
  },
  {
    id: 'jjsrogers',
    name: "JJ's Grill",
    location: 'Rogers',
    address: '4500 W Walnut St, Rogers, AR 72756',
    phone: '(479) 372-4460',
    website: 'http://jjsgrill.com/jjsrogers/',
    facebook: 'https://www.facebook.com/JJsGrillRogers/',
    instagram: 'https://www.instagram.com/jjsgrill/',
    googleMap: 'https://goo.gl/maps/hWm41PP4QhZ3bGWZA',
    cuisine: ['American', 'Bar & Grill'], 
    priceRange: '$$',
    openHours: {
      monday: { open: 1100, close: 2400 },
      tuesday: { open: 1100, close: 2400 },
      wednesday: { open: 1100, close: 2400 },
      thursday: { open: 1100, close: 2400 },
      friday: { open: 1100, close: 2400 },
      saturday: { open: 1100, close: 2400 },
      sunday: { open: 0, close: 0 }
    },
    specials: {
      monday: ['$5 Moscow or Kentucky Mule',  '$1.99 Frozen Margaritas'],
      tuesday: ["$3 JJ's Seasonal Draft", '$3.50 House Wine', '$1.99 Frozen Margaritas'],
      wednesday: ['$3.50 Jack & Coke', '$2.50 Shock Top Draft', '$1.99 Frozen Margaritas'],
      thursday: ['$3 Long Island Tea', "$3 JJ's Red Draft", '$1.99 Frozen Margaritas'],
      friday: ["$5 JJ's Dirty Shirley", "$3 JJ's IPA Draft", '$3 Fireball Shot', '$1.99 Frozen Margaritas'],
      saturday: [],
      sunday: []
    },
    happyHours: [
      {
        time: 'During NFL Primetime Games',
        specials: ['Flip for Your Burger!', '$10 Domestic Buckets'],
        dow: ['monday', 'thursday']
      },
      {
        time: '3-6pm',
        specials: ['$2 Domestic Pints', '$3 Other Pints', '$.50 off All Bottled Beer', '$2 All Well Drinks', '$2.50 All House Wine (Glasses)', '$5 3 Cheeseburger Sliders', "$5 5 Strips 'n 5 Wings", "$25 25 Strips 'n 25 Wings"],
        dow: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      }
    ]
  },
  {
    id: 'boarsnestrogers',
    name: "Boars' Nest",
    location: 'Rogers',
    address: '4404 W Walnut St, Rogers, AR 72756', 
    phone: '(479) 685-2742',
    website: 'https://www.boarsnestnwa.com/',
    facebook: 'https://www.facebook.com/boarsnestrogers/',
    instagram: 'https://www.instagram.com/explore/locations/169354685/boars-nest-rogers/',
    googleMap: 'https://g.page/boarsnestrogers?share',
    cuisine: ['American', 'Bar & Grill'], 
    priceRange: '$$',
    openHours: {
      monday: { open: 1100, close: 2600 },
      tuesday: { open: 1100, close: 2600 },
      wednesday: { open: 1100, close: 2600 },
      thursday: { open: 1100, close: 2600 },
      friday: { open: 1100, close: 2600 },
      saturday: { open: 1100, close: 2600 },
      sunday: { open: 1100, close: 2400 }
    },
    specials: {
      monday: ['$1.75 Wings', '$6 32oz Mug ($4 Domestic / $5 Craft Refills)'],
      tuesday: ['$2.25 Domestic Bottles', '$5 Wine', '$2.50 Wells'],
      wednesday: ['$2.25 Domestic Bottles'],
      thursday: ['$10 Domestic Buckets', '$15 Import Buckets'],
      friday: ['$1 Off All Local Craft Beers'],
      saturday: ['$10 Domestic Buckets', '$15 Import Buckets', '$4 Boys (Jim, Jack, Johnny & Jose)'],
      sunday: ['$3 Bloody Mary', '$3 Mimosa', '$3 Wells', '$2 Pints', '$4 Mugs']
    },
    happyHours: [
      {
        time: '3-8pm',
        specials: ['$2.25 Domestic bottles', '$2.50 Wells', '$5.00 Wine', '$1 0ff All Drafts', '1/2 price Appetizers (Nachos, Chips & Salsa, Fried Pickles, Cheese Fries)'],
        dow: ['monday', 'wednesday', 'thursday', 'friday']
      },
      {
        time: '11am-3pm',
        specials: ['$2.25 Domestic bottles', '$2.50 Wells', '$5.00 Wine', '$1 0ff All Drafts', '1/2 price Appetizers (Nachos, Chips & Salsa, Fried Pickles, Cheese Fries)'],
        dow: ['saturday']
      }
    ]
  },
  {
    id: 'bigwhiskeysbentonville',
    name: "Big Whiskey's",
    location: 'Bentonville',
    address: '3600 SE Guess Who Dr Ste. 2 Ste. 2, Bentonville, AR 72712',
    phone: '(479) 250-9244',
    website: 'https://bigwhiskeys.com/location/bentonville-ar/',
    facebook: 'https://www.facebook.com/bigwhiskeysbentonville/',
    instagram: 'https://instagram.com/big.whiskeys',
    googleMap: 'https://goo.gl/maps/s3dxyaPJZv2BL4tb8',
    cuisine: ['American', 'Bar & Grill'], 
    priceRange: '$$', 
    openHours: {
      monday: { open: 1100, close: 2400 },
      tuesday: { open: 1100, close: 2400 },
      wednesday: { open: 1100, close: 2400 },
      thursday: { open: 1100, close: 2400 },
      friday: { open: 1100, close: 2500 },
      saturday: { open: 1100, close: 2500 },
      sunday: { open: 1100, close: 2400 }
    },
    specials: {
      monday: ['After 6pm: $12 Domestic Buckets'],
      tuesday: ['After 6pm: $5 Stir Crazy', 'Free Kids Meal with the Purchase of an Adult Entree'],
      wednesday: ['After 6pm: $6 Fishbowl'],
      thursday: ["After 6pm: $5 Martini's"],
      friday: ['After 6pm: $6 Old Fashioned'],
      saturday: ['$2 off All Whiskey Flights'],
      sunday: ['$2.75 Domestics', '$3.75 Craft/Import Drafts']
    },
    happyHours: [
      {
        time: '3-6pm',
        specials: ['$2 Domestic Pints', '$3 Craft Pints', '$6 Select Apps'],
        dow: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      }
    ]
  },
  // Add more restaurants here as needed
];
const HappyHourNavigator: React.FC = () => {
    const getDayOfWeek = () => {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      return days[new Date().getDay()];
    };
  
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDay, setSelectedDay] = useState<string | null>(getDayOfWeek());
    const [deals, setDeals] = useState<Restaurant[]>(sampleDeals);
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    const handleDaySelect = (day: string) => {
      setSelectedDay(prevDay => prevDay === day ? null : day);
    };
  
    const formatTime = (time: number) => {
      const hours = Math.floor(time / 100);
      const minutes = time % 100;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
  
    const searchFiltered = deals.filter(restaurant =>
      searchTerm === '' || 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(restaurant.specials).flat().some(special => 
        special.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      restaurant.happyHours.some(happyHour => 
        happyHour.specials.some(special => 
          special.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  
    const filteredDeals = selectedDay
      ? searchFiltered.filter(restaurant =>
          restaurant.specials[selectedDay]?.length > 0 ||
          restaurant.happyHours.some(happyHour => happyHour.dow.includes(selectedDay))
        )
      : searchFiltered;
  
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
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <Button
              key={day}
              variant={selectedDay === day.toLowerCase() ? "default" : "outline"}
              onClick={() => handleDaySelect(day.toLowerCase())}
            >
              {day}
            </Button>
          ))}
          {selectedDay && (
            <Button variant="outline" onClick={() => setSelectedDay(null)}>
              Clear Day Filter
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map(restaurant => (
            <Card key={restaurant.id}>
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <p>{restaurant.location}</p>
              </CardHeader>
              <CardContent>
                {selectedDay ? (
                  <>
                    {restaurant.specials[selectedDay]?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold">{selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} Specials:</h4>
                        <ul className="list-disc list-inside">
                          {restaurant.specials[selectedDay].map((special, index) => (
                            <li key={index}>{special}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {restaurant.happyHours.filter(happyHour => happyHour.dow.includes(selectedDay)).map((happyHour, index) => (
                      <div key={index} className="mb-4">
                        <h4 className="font-semibold">Happy Hour: {happyHour.time}</h4>
                        <ul className="list-disc list-inside">
                          {happyHour.specials.map((special, specialIndex) => (
                            <li key={specialIndex}>{special}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <Accordion type="single" collapsible className="w-full mb-4">
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
                    </Accordion>
                  </>
                )}
  
                <Accordion type="single" collapsible className="w-full mb-4">
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
  
                <div className="mb-4">
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
                  <p className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <a href={restaurant.googleMap} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View on Google Maps
                    </a>
                  </p>
                </div>
  
                <div className="flex justify-center space-x-4">
                  {restaurant.facebook && (
                    <a href={restaurant.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <Facebook className="h-6 w-6" />
                    </a>
                  )}
                  {restaurant.instagram && (
                    <a href={restaurant.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  export default HappyHourNavigator;
  