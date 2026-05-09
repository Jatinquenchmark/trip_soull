import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import HomeHero1 from '../assets/Arkamara-Dijiwa-Ubud-.jpg';
import HomeHero2 from '../assets/My Son sanctuary.jpg';
import HomeHero3 from '../assets/dubai-cityscape.avif';
import HomeHero4 from '../assets/pexels-jess-vide-4612307.jpg';
import HomeHero5 from '../assets/verdant-mountain-valley-stockcake.webp';
import UnionBg from '../assets/Union.png';
import DecoreBg from '../assets/Decore.png';
import PlaneImg from '../assets/plane.png';
import { 
  User, Compass, Heart, Check, ArrowRight, X, Clock, MapPin, Play,
  Map, Palmtree, Building2, Ship, Waves, Landmark, Castle 
} from 'lucide-react';
import gsap from 'gsap';

const IconMap = {
  Map, Palmtree, Building2, Ship, Waves, Landmark, Castle
};

import PackagesSection from '../components/PackagesSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { destinations, experiences, pricingTiers, itineraries } from '../data/trips';

const Home = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroBgs = [
    HomeHero1,
    HomeHero2,
    HomeHero3,
    HomeHero4,
    HomeHero5
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleCountrySelect = (country) => {
    if (selectedCountry?.id === country.id) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
      document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Thrillophilia Style */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#FDFDFD] border-b border-slate-50">
        {/* Floating Thumbnails Background */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-40 pointer-events-none">
          <div className="relative w-full h-full">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-[5%] w-32 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[-6deg]"
            >
              <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
            </motion.div>

            <motion.div 
              animate={{ 
                y: [0, 25, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-40 left-[15%] w-28 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[8deg]"
            >
              <img src={HomeHero2} className="w-full h-full object-cover" alt="" />
            </motion.div>

            <motion.div 
              animate={{ 
                y: [0, -30, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-[10%] w-36 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[5deg]"
            >
              <img src={HomeHero3} className="w-full h-full object-cover" alt="" />
            </motion.div>

            <motion.div 
              animate={{ 
                x: [0, 20, 0],
                rotate: [0, 4, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 right-[15%] w-32 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-[-12deg]"
            >
              <img src={HomeHero4} className="w-full h-full object-cover" alt="" />
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight font-poppins"
          >
            Your Tour, <br />
            Perfectly <span className="text-[#F1A501]">Personalised!</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 font-medium mb-12 font-poppins"
          >
            Explore expertly curated multi-day tours
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 bg-white shadow-2xl rounded-full p-2 pl-6 border border-slate-100 max-w-2xl w-full"
          >
            <MapPin className="text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for destinations, tours..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent border-none outline-none text-slate-700 py-3 font-poppins"
            />
            <button 
              onClick={handleSearch}
              className="bg-[#F1A501] text-white px-10 py-4 rounded-full font-bold hover:bg-[#e09901] transition-all shadow-lg shadow-orange-100"
            >
              Search
            </button>
          </motion.div>
        </div>
      </section>


      {/* Layer 1: Destination Selection (Thrillophilia Style) */}
      <section className="py-4 border-b border-slate-100 bg-white sticky top-[56px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-16 overflow-x-auto no-scrollbar py-2">
            <div 
              onClick={() => setSelectedCountry(null)}
              className={`flex flex-col items-center gap-2 cursor-pointer min-w-fit transition-all ${!selectedCountry ? 'text-thrill-orange' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-slate-50 ${!selectedCountry ? 'bg-orange-50 text-thrill-orange' : ''}`}>
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">All</span>
              {!selectedCountry && <motion.div layoutId="active" className="h-0.5 w-full bg-thrill-orange" />}
            </div>

            {destinations.map((country, i) => {
              const IconComponent = IconMap[country.icon] || Map;
              return (
                <div 
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className={`flex flex-col items-center gap-2 cursor-pointer min-w-fit relative group transition-all ${selectedCountry?.id === country.id ? 'text-thrill-orange' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${selectedCountry?.id === country.id ? 'border-thrill-orange bg-orange-50 text-thrill-orange scale-110 shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tight">{country.name}</span>
                  {selectedCountry?.id === country.id && <motion.div layoutId="active" className="h-0.5 w-full bg-thrill-orange" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>



      <PackagesSection 
        selectedCountryId={selectedCountry?.id} 
        searchQuery={searchQuery}
      />
      <AboutSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};


export default Home;
