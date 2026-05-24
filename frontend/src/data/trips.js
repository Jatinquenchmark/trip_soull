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

export const detailedPackages = [];
