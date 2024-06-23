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
  },
  {
    id: "gusanosbentonville",
    name: "Gusano's Chicago-Style Pizzeria", // Assuming this based on the Facebook link
    location: "Bentonville", // Assuming this based on the id
    address: "123 Main St, Bentonville, AR 72712", // You need to add the correct address
    phone: "(555) 123-4567", // You need to add the correct phone number
    website: "https://www.gusanospizza.com", // You need to add the correct website
    facebook: "https://www.facebook.com/Gusanos-Chicago-Style-Pizzeria-109101078783045/",
    instagram: "https://www.instagram.com/explore/locations/138576752827437/gusanos-chicago-style-pizzeria-bentonville-ar/",
    googleMap: "https://goo.gl/maps/gE3hRqDaW2rUXf128",
    cuisine: ["Pizza", "Italian"], // You need to add the correct cuisine types
    priceRange: "$$", // You need to add the correct price range
    openHours: {
      monday: {
        open: 1100,
        close: 2000
      },
      tuesday: {
        open: 1100,
        close: 2000
      },
      wednesday: {
        open: 1100,
        close: 2000
      },
      thursday: {
        open: 1100,
        close: 2000
      },
      friday: {
        open: 1100,
        close: 2000
      },
      saturday: {
        open: 1100,
        close: 2000
      },
      sunday: {
        open: 1100,
        close: 2000
      }
    },
    specials: {
      monday: ['$17.99 13" 1-Topping Pizza w/ Bread Stix', '$7.99 Sandwich of the Day - Turkey Club'],
      tuesday: ['$2 Domestic Bottles', '$17.99 13" 1-Topping Pizza w/ Bread Stix', '$7.99 Sandwich of the Day - Dagwood'],
      wednesday: ['$9.99 13" 1-Topping Pizza (dine in / after 4pm)', '$10.99 13" 1-Topping Pizza (to go or delivery / after 4pm)', 'Add Breadstix for $2.99', '$17.99 13" 1-Topping Pizza w/ Bread Stix', '$7.99 Sandwich of the Day - Ham & Cheese'],
      thursday: ['$17.99 13" 1-Topping Pizza w/ Bread Stix', '$7.99 Sandwich of the Day - Hawaiian Turkey'],
      friday: ['Specials on House Wines', '$17.99 13" 1-Topping Pizza w/ Bread Stix', '$7.99 Sandwich of the Day - Italian Sub'],
      saturday: ['$2 Short Domestics', '$6.50 Domestic Pitchers'],
      sunday: ['$12 Bucket of Domestic Bottles', '$2 Mimosas', '$2 Bloody Marys', 'Family Special - $32.99 - 13" 1-Topping Pizza, 13" Specialty Pizza, and Bread Stix']
    },
    happyHours: [
      {
        time: 'All Day Happiest Hour!',
        specials: ['$1 12oz Domestic Drafts', '$2 22oz Domestic Drafts'],
        dow: ['thursday']
      },
      {
        time: '3-7pm',
        specials: ['$1 off Drafts', '$1 off Wells', '$1 off Wines'],
        dow: ['monday', 'tuesday', 'wednesday', 'friday']
      },
      {
        time: '5-6pm: Happiest Hour!',
        specials: ['$1 12oz Domestic Drafts', '$2 22oz Domestic Drafts'],
        dow: ['monday', 'tuesday', 'wednesday', 'friday']
      }
    ]
  },
  {
    id: 'jjsrogers',
    name: "JJ's Grill",
    location: 'Rogers',
    address: '4500 W Walnut St, Rogers, AR 72756', // You may need to verify this address
    phone: '(479) 636-3399', // You may need to verify this phone number
    website: 'http://jjsgrill.com/jjsrogers/',
    facebook: 'https://www.facebook.com/JJsGrillRogers/',
    instagram: 'https://www.instagram.com/jjsgrill/',
    googleMap: 'https://goo.gl/maps/hWm41PP4QhZ3bGWZA',
    cuisine: ['American', 'Bar & Grill'], // You may want to adjust these cuisine types
    priceRange: '$$', // You may want to adjust this price range
    openHours: {
      monday: { open: 1100, close: 2400 },
      tuesday: { open: 1100, close: 2400 },
      wednesday: { open: 1100, close: 2400 },
      thursday: { open: 1100, close: 2400 },
      friday: { open: 1100, close: 2400 },
      saturday: { open: 1100, close: 2400 },
      sunday: { open: 0, close: 0 } // Changed from null to 0 to match the number type
    },
    specials: {
      monday: ['$5 Moscow or Kentucky Mule', "$2.50 JJ's Light Draft", '$1.99 Frozen Margaritas'],
      tuesday: ["$3 JJ's Seasonal Draft", '$3.50 House Wine', '$1.99 Frozen Margaritas'],
      wednesday: ['$3.50 Jack & Coke', '$2.50 Shock Top Draft', '$1.99 Frozen Margaritas'],
      thursday: ['$3 Long Island Tea', "$3 JJ's Red Draft", '$1.99 Frozen Margaritas'],
      friday: ["$5 JJ's Dirty Shirley", "$3 JJ's IPA Draft", '$3 Fireball Shot', '$1.99 Frozen Margaritas'],
      saturday: ['$5 Smithworks Bloody Mary', "$3 JJ's Rasp Wheat", "$3 JJ's McFizzle Shot", '$1.99 Frozen Margaritas'],
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
      },
      {
        time: '3:00-3:20 | 4:20-4:40 | 5:40-6:00',
        specials: ["$1 Select JJ's Brewing Co. Drafts"],
        dow: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      }
    ]
  },
  {
    id: 'boarsnestrogers',
    name: "Boars' Nest",
    location: 'Rogers',
    address: '2323 S 8th St, Rogers, AR 72758', // You may need to verify this address
    phone: '(479) 633-8430', // You may need to verify this phone number
    website: 'https://www.boarsnestnwa.com/',
    facebook: 'https://www.facebook.com/boarsnestrogers/',
    instagram: 'https://www.instagram.com/explore/locations/169354685/boars-nest-rogers/',
    googleMap: 'https://g.page/boarsnestrogers?share',
    cuisine: ['American', 'Bar & Grill'], // You may want to adjust these cuisine types
    priceRange: '$$', // You may want to adjust this price range
    openHours: {
      monday: { open: 1100, close: 2600 },
      tuesday: { open: 1100, close: 2600 },
      wednesday: { open: 1100, close: 2600 },
      thursday: { open: 1100, close: 2600 },
      friday: { open: 1100, close: 2600 },
      saturday: { open: 1100, close: 2600 },
      sunday: { open: 1100, close: 2600 }
    },
    specials: {
      monday: ['$1.25 Wings', '$6 32oz Mug ($3 Domestic / $4 Craft Refills)'],
      tuesday: ['$5.99 Street Taco Basket'],
      wednesday: ['Karaoke Night (8pm - Midnight)', '$1.50 Ribs', '$2.25 Domestic Bottles'],
      thursday: ['$1 Off Burgers', '$10 Domestic Buckets', '$15 Mexican Buckets'],
      friday: ['$1 Off All Craft Beers', '$14 Margarita Pitchers'],
      saturday: ['$1.50 Ribs', '$4 Boys (Jim, Jack, Johnny & Jose)', '$10 Domestic Buckets', '$14 Margarita Pitchers'],
      sunday: ['$3 Bloody Mary', '$3 Mimosa', '$2 Miller Lite Pints']
    },
    happyHours: [
      {
        time: '3-8pm',
        specials: ['$2.25 Domestic bottles', '$2.50 Wine', '$2.50 Wells', '1/2 price Appetizers (Nachos, Chips & Salsa, Fried Pickles, Cheese Fries)'],
        dow: ['monday', 'wednesday', 'thursday', 'friday']
      },
      {
        time: 'All Day',
        specials: ['$2.25 Domestic bottles', '$2.50 Wine', '$2.50 Wells', '1/2 price Appetizers (Nachos, Chips & Salsa, Fried Pickles, Cheese Fries)'],
        dow: ['tuesday']
      },
      {
        time: '11am-3pm',
        specials: ['$2.25 Domestic bottles', '$2.50 Wine', '$2.50 Wells', '1/2 price Appetizers (Nachos, Chips & Salsa, Fried Pickles, Cheese Fries)'],
        dow: ['saturday']
      }
    ]
  },
  {
    id: 'bigwhiskeysbentonville',
    name: "Big Whiskey's",
    location: 'Bentonville',
    address: '3600 SE Metro Pkwy, Bentonville, AR 72712', // You may need to verify this address
    phone: '(479) 326-7243', // You may need to verify this phone number
    website: 'https://bigwhiskeys.com/location/bentonville-ar/',
    facebook: 'https://www.facebook.com/bigwhiskeysbentonville/',
    instagram: 'https://instagram.com/big.whiskeys',
    googleMap: 'https://goo.gl/maps/s3dxyaPJZv2BL4tb8',
    cuisine: ['American', 'Bar & Grill'], // You may want to adjust these cuisine types
    priceRange: '$$', // You may want to adjust this price range
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
      sunday: ['$2.50 Domestics', '$3.50 Craft/Import Drafts']
    },
    happyHours: [
      {
        time: '3-6pm',
        specials: ['$2 Domestic Pints', '$3 Craft Pints', '$5 Select Apps'],
        dow: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      }
    ]
  },
  // Add more restaurants here as needed
];

const getDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

const HappyHourNavigator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>(getDayOfWeek());
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
     restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDay === null || // Add this condition
     restaurant.specials[selectedDay]?.length > 0 ||
     restaurant.happyHours.some(happyHour => happyHour.dow.includes(selectedDay)))
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
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <Button
            key={day}
            variant={selectedDay === day.toLowerCase() ? "default" : "outline"}
            onClick={() => setSelectedDay(day.toLowerCase())}
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
    {selectedDay && (
        <>
          {restaurant.specials[selectedDay]?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold">Today's Specials:</h4>
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

      <Accordion type="single" collapsible className="w-full mb-4">
        <AccordionItem value="item-1">
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