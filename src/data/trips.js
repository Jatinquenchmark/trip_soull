import vietnamLogo from '../assets/vietnam_logo.webp';
import baliLogo from '../assets/bali_logo.avif';
import dubaiLogo from '../assets/dubai_logo.webp';
import singaporeLogo from '../assets/singapore_logo.webp';
import maldivesLogo from '../assets/maldives_logo.jpg';
import thailandLogo from '../assets/thailand_logo.avif';
import turkeyLogo from '../assets/turkey_logo.webp';

// Experience Assets
import soloImg from '../assets/solo-travel.avif';
import adventureImg from '../assets/adventure-seekers-1.jpg';
import coupleImg from '../assets/a-couple-of-1694334_640.webp';

export const destinations = [
  { id: 'vietnam', name: 'Vietnam', image: vietnamLogo, icon: 'Map', description: 'Ancient temples and emerald bays.' },
  { id: 'bali', name: 'Bali', image: baliLogo, icon: 'Palmtree', description: 'Tropical paradise and spiritual heart.' },
  { id: 'dubai', name: 'Dubai', image: dubaiLogo, icon: 'Building2', description: 'Modern luxury and golden sands.' },
  { id: 'singapore', name: 'Singapore', image: singaporeLogo, icon: 'Ship', description: 'The garden city of the future.' },
  { id: 'maldives', name: 'Maldives', image: maldivesLogo, icon: 'Waves', description: 'Azure waters and private villas.' },
  { id: 'thailand', name: 'Thailand', image: thailandLogo, icon: 'Landmark', description: 'Land of smiles and vibrant culture.' },
  { id: 'turkey', name: 'Turkey', image: turkeyLogo, icon: 'Castle', description: 'Where East meets West in grandeur.' },
];

export const experiences = [
  { 
    id: 'solo', 
    name: 'Solo Traveler', 
    image: soloImg,
    tagline: 'Self Discovery',
    icon: 'User' 
  },
  { 
    id: 'adventure', 
    name: 'Adventure Seeker', 
    image: adventureImg,
    tagline: 'Push Boundaries',
    icon: 'Compass' 
  },
  { 
    id: 'couple', 
    name: 'Romantic Couple', 
    image: coupleImg,
    tagline: 'Pure Connection',
    icon: 'Heart' 
  },
];

export const pricingTiers = [
  { id: 'basic', name: 'Essential Soul', price: '₹20,000', features: ['4-Star Stays', 'Standard Transport', 'Group Tours', 'Selected Meals'] },
  { id: 'medium', name: 'Comfort Soul', price: '₹45,000', features: ['Boutique 5-Star', 'Private Transport', 'Personal Guide', 'All Breakfasts'] },
  { id: 'luxury', name: 'Luxury Soul', price: '₹85,000', features: ['Ultra Luxury Resorts', 'Premium Transfers', 'VIP Access', 'All Meals Included'] },
];

export const itineraries = {
  default: [
    { day: 1, title: 'Arrival & Luxury Transfer', description: 'Welcome to paradise. Private transfer to your ultra-luxury resort.' },
    { day: 2, title: 'Cultural Immersion', description: 'Guided tour of heritage sites followed by a private sunset dinner.' },
    { day: 3, title: 'Soul Connection', description: 'Wellness spa session and meditation in the heart of nature.' },
    { day: 4, title: 'Adventure & Exploration', description: 'Private boat charter or guided nature trek.' },
    { day: 5, title: 'Departure', description: 'Leisurely breakfast and private transfer to airport.' }
  ]
};

export const detailedPackages = [
  {
    id: 'dubai-luxury',
    countryId: 'dubai',
    name: 'Dubai Luxury',
    tagline: 'Modern Oasis',
    duration: '4 Nights / 5 Days',
    groupSize: 'Customizable',
    location: 'Dubai, UAE',
    price: '₹1,25,000',
    rating: 4.8,
    overview: 'Experience the pinnacle of modern luxury in the golden city. From Burj Khalifa views to private desert safaris, Dubai offers an unmatched blend of tradition and future.',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1489514354504-1653aa9d63ad?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1523374228107-6e44bd2b528e?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Marina Cruise', description: 'Private transfer to your 5-star hotel. Evening dinner cruise at Dubai Marina.' },
      { day: 2, title: 'Burj Khalifa & Dubai Mall', description: 'Visit the world\'s tallest building and explore the largest mall with a private guide.' },
      { day: 3, title: 'Premium Desert Safari', description: 'Luxury 4x4 dune bashing followed by a private sunset dinner in the desert.' },
      { day: 4, title: 'Old Dubai & Souks', description: 'Discover the heritage area and traditional gold and spice souks.' },
      { day: 5, title: 'Leisure & Departure', description: 'Relax at the hotel spa before your private transfer to the airport.' }
    ],
    inclusions: ['5-Star Luxury Stay', 'Private Transfers', 'All Major Sightseeing', 'Premium Desert Safari', 'Daily Breakfast'],
    exclusions: ['International Flights', 'Visa Fees', 'Personal Expenses']
  },
  {
    id: 'bali-paradise',
    countryId: 'bali',
    name: 'Bali Paradise',
    tagline: 'Soul Retreat',
    duration: '5 Nights / 6 Days',
    groupSize: 'Couples / Families',
    location: 'Ubud & Seminyak',
    price: '₹75,000',
    rating: 5.0,
    overview: 'Reconnect with nature and yourself in the heart of Bali. Explore lush rice terraces, ancient temples, and pristine beaches.',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1537953391402-196aa6d20677?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Ubud', description: 'Transfer to your private pool villa in Ubud. Evening at leisure.' },
      { day: 2, title: 'Tegalalang Rice Terrace', description: 'Morning visit to rice fields followed by the famous Bali swing.' },
      { day: 3, title: 'Uluwatu Temple Sunset', description: 'Head south for a spectacular sunset and Kecak Fire Dance.' },
      { day: 4, title: 'Nusa Penida Trip', description: 'Full day private boat trip to the iconic Kelingking Beach.' },
      { day: 5, title: 'Seminyak Leisure', description: 'Beach club relaxation and shopping in vibrant Seminyak.' },
      { day: 6, title: 'Departure', description: 'Private transfer to Denpasar Airport.' }
    ],
    inclusions: ['Private Pool Villas', 'All Sightseeing in AC Car', 'Nusa Penida Tour', 'English Speaking Guide', 'Daily Breakfast'],
    exclusions: ['Flight Tickets', 'Lunch & Dinner', 'Personal Tips']
  },
  {
    id: 'maldives-azure',
    countryId: 'maldives',
    name: 'Maldives Azure',
    tagline: 'Pure Serenity',
    duration: '3 Nights / 4 Days',
    groupSize: 'Luxury Couples',
    location: 'Private Island Resort',
    price: '₹1,50,000',
    rating: 5.0,
    overview: 'The ultimate escape. Wake up in an overwater villa surrounded by crystal clear turquoise waters and vibrant coral reefs.',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1506929194291-dd09299139ee?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1573843225234-ad4403fa4f3f?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Speedboat Transfer', description: 'Luxury transfer from Male Airport to your private island resort.' },
      { day: 2, title: 'Snorkeling & Coral Reef', description: 'Guided snorkeling session to explore the underwater beauty.' },
      { day: 3, title: 'Sunset Dolphin Cruise', description: 'A romantic evening cruise with champagne and dolphins.' },
      { day: 4, title: 'Relax & Departure', description: 'Enjoy your last morning on the white sand beaches before return transfer.' }
    ],
    inclusions: ['Overwater Villa Stay', 'Full Board Meals', 'Speedboat Transfers', 'Snorkeling Gear', 'Honeymoon Special Decor'],
    exclusions: ['Seaplane (Optional)', 'Spa Treatments', 'Alcoholic Drinks']
  },
  {
    id: 'vietnam-heritage',
    countryId: 'vietnam',
    name: 'Vietnam Heritage',
    tagline: 'Emerald Bays',
    duration: '6 Nights / 7 Days',
    groupSize: 'Explorers',
    location: 'Hanoi & Ha Long Bay',
    price: '₹65,000',
    rating: 4.7,
    overview: 'Journey through the soul of Vietnam. From the bustling streets of Hanoi to the tranquil emerald waters of Ha Long Bay.',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1555660291-197ce0d65aee?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Hanoi Arrival', description: 'Welcome to Hanoi. Private transfer to your heritage hotel.' },
      { day: 2, title: 'Hanoi City Tour', description: 'Visit Ho Chi Minh Mausoleum and the Temple of Literature.' },
      { day: 3, title: 'Ha Long Bay Cruise', description: 'Board a luxury junk boat for an overnight cruise in the bay.' }
    ],
    inclusions: ['Luxury Junk Boat Stay', 'Hanoi Heritage Hotel', 'Private City Tours', 'English Guide', 'All Breakfasts'],
    exclusions: ['Visa Fees', 'International Flights']
  },
  {
    id: 'singapore-future',
    countryId: 'singapore',
    name: 'Singapore Future',
    tagline: 'Garden City',
    duration: '4 Nights / 5 Days',
    groupSize: 'Families / Couples',
    location: 'Marina Bay & Sentosa',
    price: '₹95,000',
    rating: 4.9,
    overview: 'Discover the city of the future. A perfect blend of nature, technology, and diverse culinary experiences.',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Marina Bay', description: 'Transfer to your hotel with views of the iconic Marina Bay Sands.' },
      { day: 2, title: 'Gardens by the Bay', description: 'Explore the Cloud Forest and Flower Dome.' },
      { day: 3, title: 'Sentosa Island', description: 'Full day of fun at Universal Studios and S.E.A. Aquarium.' }
    ],
    inclusions: ['Luxury Stay at Marina Bay', 'All Entry Tickets', 'Sentosa Island Pass', 'Private Transfers', 'Daily Breakfast'],
    exclusions: ['Meals other than Breakfast', 'Personal Expenses']
  },
  {
    id: 'thailand-escapade',
    countryId: 'thailand',
    name: 'Thailand Escapade',
    tagline: 'Land of Smiles',
    duration: '5 Nights / 6 Days',
    groupSize: 'Adventure / Leisure',
    location: 'Bangkok & Phuket',
    price: '₹55,000',
    rating: 4.6,
    overview: 'Experience the vibrant culture of Bangkok and the stunning beaches of Phuket. A perfect mix of city life and tropical relaxation.',
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Bangkok Arrival', description: 'Transfer to your city center hotel. Evening street food tour.' },
      { day: 2, title: 'Grand Palace & Temples', description: 'Explore the majestic Grand Palace and Wat Pho.' },
      { day: 3, title: 'Flight to Phuket', description: 'Transfer to Phuket. Relax at Patong Beach.' }
    ],
    inclusions: ['Boutique Hotels', 'Internal Flights', 'Private Transfers', 'Daily Breakfast', 'Guided Bangkok Tour'],
    exclusions: ['International Flights', 'Visa Fees']
  },
  {
    id: 'turkey-grandeur',
    countryId: 'turkey',
    name: 'Turkey Grandeur',
    tagline: 'East meets West',
    duration: '7 Nights / 8 Days',
    groupSize: 'Culture Lovers',
    location: 'Istanbul & Cappadocia',
    price: '₹1,10,000',
    rating: 4.8,
    overview: 'Witness the grandeur of the Ottoman Empire in Istanbul and the surreal landscapes of Cappadocia.',
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Istanbul Arrival', description: 'Transfer to your hotel in Sultanahmet.' },
      { day: 2, title: 'Blue Mosque & Hagia Sophia', description: 'Explore the historical heart of Istanbul.' },
      { day: 3, title: 'Cappadocia Flight', description: 'Morning flight to Cappadocia. Sunset cave dinner.' }
    ],
    inclusions: ['Cave Hotel Stay', 'Hot Air Balloon (Optional Add-on)', 'Private Tours', 'Airport Transfers', 'Daily Breakfast'],
    exclusions: ['International Flights', 'Visa Fees']
  },
  {
    id: 'dubai-desert',
    countryId: 'dubai',
    name: 'Dubai Desert Oasis',
    tagline: 'Golden Sands',
    duration: '3 Nights / 4 Days',
    groupSize: 'Adventure',
    location: 'Al Maha Desert',
    price: '₹85,000',
    rating: 4.9,
    overview: 'Escape the city and immerse yourself in the serene beauty of the Arabian desert. Luxury tent stays and starlit dinners await.',
    images: [
      'https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Desert Transfer', description: 'Luxury 4x4 transfer to your desert resort.' },
      { day: 2, title: 'Camel Trek', description: 'Morning camel trek across the dunes.' }
    ],
    inclusions: ['Luxury Tent Stay', 'All Meals', 'Desert Activities'],
    exclusions: ['Flights', 'City Transfers']
  },
  {
    id: 'bali-wellness',
    countryId: 'bali',
    name: 'Bali Wellness Spirit',
    tagline: 'Yoga & Spa',
    duration: '7 Nights / 8 Days',
    groupSize: 'Solos / Couples',
    location: 'Ubud Highlands',
    price: '₹1,10,000',
    rating: 5.0,
    overview: 'A deep dive into Balinese healing traditions. Daily yoga, meditation, and world-class spa treatments in the heart of the jungle.',
    images: [
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1531737212413-667205e1cda7?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Ubud Arrival', description: 'Arrival and blessing ceremony.' },
      { day: 2, title: 'Sunrise Yoga', description: 'Daily yoga session overlooking the valley.' }
    ],
    inclusions: ['Wellness Resort Stay', 'Daily Yoga', 'Healthy Organic Meals', 'Spa Credits'],
    exclusions: ['Flights', 'Alcoholic Drinks']
  },
  {
    id: 'thailand-islands',

    countryId: 'thailand',
    name: 'Thailand Island Hopper',
    tagline: 'Phuket & Krabi',
    duration: '6 Nights / 7 Days',
    groupSize: 'Adventure / Groups',
    location: 'Phuket, Krabi & Phi Phi',
    price: '₹68,000',
    rating: 4.8,
    overview: 'The ultimate island hopping experience. Crystal clear waters, limestone cliffs, and vibrant nightlife across Thailand\'s most famous islands.',
    images: [
      'https://images.unsplash.com/photo-1528181304800-2f140819ad1c?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Phuket Arrival', description: 'Transfer to your beach resort. Evening at Patong Beach.' },
      { day: 2, title: 'Phi Phi Island Tour', description: 'Full day speedboat tour to Phi Phi and Maya Bay.' },
      { day: 3, title: 'Transfer to Krabi', description: 'Private boat transfer to the stunning Railay Beach.' }
    ],
    inclusions: ['Beachfront Resorts', 'Speedboat Transfers', 'Snorkeling Gear', 'All Breakfasts'],
    exclusions: ['Flights', 'National Park Fees']
  },
  {
    id: 'singapore-adventure',
    countryId: 'singapore',
    name: 'Singapore City Adventure',
    tagline: 'Fun for All',
    duration: '3 Nights / 4 Days',
    groupSize: 'Families',
    location: 'Universal Studios & Zoo',
    price: '₹72,000',
    rating: 4.9,
    overview: 'A high-energy city break. Experience world-class theme parks, night safaris, and the incredible Jewel Changi.',
    images: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Night Safari', description: 'Check-in and evening visit to the world\'s first night zoo.' },
      { day: 2, title: 'Universal Studios', description: 'Full day of thrills at USS Sentosa.' }
    ],
    inclusions: ['4-Star Hotels', 'Entry Tickets', 'Private Transfers'],
    exclusions: ['Flights', 'Lunch & Dinner']
  },
  {
    id: 'vietnam-adventure',
    countryId: 'vietnam',
    name: 'Vietnam North to South',
    tagline: 'Epic Journey',
    duration: '9 Nights / 10 Days',
    groupSize: 'Explorers',
    location: 'Hanoi, Hoi An, HCMC',
    price: '₹98,000',
    rating: 4.9,
    overview: 'A comprehensive journey through Vietnam. Experience the history of Hanoi, the lanterns of Hoi An, and the energy of Ho Chi Minh City.',
    images: [
      'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1555660291-197ce0d65aee?auto=format&fit=crop&w=1200&q=70',
    ],
    itinerary: [
      { day: 1, title: 'Hanoi Arrival', description: 'Start your journey in the historic capital.' },
      { day: 2, title: 'Sapa Trekking', description: 'Experience the stunning rice terraces of Sapa.' }
    ],
    inclusions: ['Domestic Flights', 'Boutique Hotels', 'Local Guides', 'Private Car'],
    exclusions: ['International Flights', 'Visa']
  }
];

