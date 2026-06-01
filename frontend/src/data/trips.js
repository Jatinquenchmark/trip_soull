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
  { id: 'malaysia', name: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=500&q=60', icon: 'Map', description: 'Tropical rainforests and modern cities.' },
  { id: 'srilanka', name: 'Sri Lanka', image: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?auto=format&fit=crop&w=500&q=60', icon: 'Palmtree', description: 'Pearl of the Indian Ocean.' },
  { id: 'nepal', name: 'Nepal', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=60', icon: 'Landmark', description: 'The roof of the world.' },
  { id: 'bhutan', name: 'Bhutan', image: 'https://images.unsplash.com/photo-1570535384666-3d2319c5c2d3?auto=format&fit=crop&w=500&q=60', icon: 'Castle', description: 'The land of the thunder dragon.' },
  { id: 'mauritius', name: 'Mauritius', image: 'https://images.unsplash.com/photo-1569429486333-6a978f14f243?auto=format&fit=crop&w=500&q=60', icon: 'Waves', description: 'Sapphire waters and pristine beaches.' },
  { id: 'seychelles', name: 'Seychelles', image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9cb15c4?auto=format&fit=crop&w=500&q=60', icon: 'Waves', description: 'A tropical paradise archipelago.' },
  { id: 'kazakhstan', name: 'Kazakhstan', image: 'https://images.unsplash.com/photo-1558509893-6c845b596d92?auto=format&fit=crop&w=500&q=60', icon: 'Map', description: 'Vast steppes and modern architecture.' },
  { id: 'hongkong', name: 'Hong Kong', image: 'https://images.unsplash.com/photo-1529141065171-460d3fc29ce4?auto=format&fit=crop&w=500&q=60', icon: 'Building2', description: 'Where East meets West.' },
  { id: 'qatar', name: 'Qatar', image: 'https://images.unsplash.com/photo-1582650507316-56a84f5bc938?auto=format&fit=crop&w=500&q=60', icon: 'Building2', description: 'Desert charm and futuristic skyline.' },
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
