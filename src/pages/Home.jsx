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
import HerocompLeft from '../assets/HerocompLeft.avif';
import HerocompRight from '../assets/HerocompRight.avif';
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
      {/* Hero Section - Thrillophilia Style Perfected */}
      <section className="relative pt-48 pb-12 px-6 overflow-hidden bg-[#FDFDFD]">
        {/* Patterned Static Thumbnails Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Left Side Horizontal Rows (Tapering) - Dynamic Square Pattern */}
          <div className="absolute left-[2%] top-[12%] flex flex-col gap-8 pointer-events-none">
            {/* Row 1 */}
            <div className="flex gap-4 items-center -ml-20">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-3 translate-y-2">
                <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 translate-y-6">
                <img src={HomeHero2} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 translate-y-10">
                <img src={HomeHero3} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex gap-4 items-center -ml-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 -translate-y-2">
                <img src={HomeHero4} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-3 translate-y-4">
                <img src={HomeHero5} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-6 translate-y-8">
                <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
          </div>

          {/* Right Side Horizontal Rows (Tapering) - Dynamic Square Pattern */}
          <div className="absolute right-[2%] top-[12%] flex flex-col gap-8 items-end pointer-events-none">
            {/* Row 1 */}
            <div className="flex gap-4 items-center -mr-20">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 translate-y-10">
                <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-3 translate-y-6">
                <img src={HomeHero2} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 translate-y-2">
                <img src={HomeHero3} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex gap-4 items-center -mr-10">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-6 translate-y-8">
                <img src={HomeHero4} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 translate-y-4">
                <img src={HomeHero5} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 -translate-y-2">
                <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
          </div>

          {/* New Herocomp Images - Moved Inwards */}
          <div className="absolute left-[1%] top-[65%] -translate-y-1/2 z-0 hidden lg:block max-w-[280px] pointer-events-none opacity-100">
            <img src={HerocompLeft} className="w-full h-auto object-contain transform -rotate-6" alt="" />
          </div>
          <div className="absolute right-[1%] top-[65%] -translate-y-1/2 z-0 hidden lg:block max-w-[280px] pointer-events-none opacity-100">
            <img src={HerocompRight} className="w-full h-auto object-contain transform rotate-6" alt="" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[80px] font-extrabold text-[#2D2D2D] mb-8 leading-[1.1] tracking-tight font-poppins"
          >
            Your Tour, <br />
            Perfectly <span className="text-[#2B4A8C]">Personalised!</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#666666] font-medium mb-12 font-poppins"
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
              style={{ backgroundColor: '#2B4A8C' }}
              className="text-white px-10 py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-lg"
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
              className={`flex flex-col items-center gap-2 cursor-pointer min-w-fit transition-all ${!selectedCountry ? 'text-soul-blue' : 'text-soul-blue/60 hover:text-soul-blue'}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-blue-50/50 ${!selectedCountry ? 'bg-blue-50 text-soul-blue' : 'text-soul-blue/40'}`}>
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">All</span>
              {!selectedCountry && <motion.div layoutId="active" className="h-0.5 w-full bg-soul-blue" />}
            </div>

            {destinations.map((country, i) => {
              const IconComponent = IconMap[country.icon] || Map;
              return (
                <div 
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className={`flex flex-col items-center gap-2 cursor-pointer min-w-fit relative group transition-all ${selectedCountry?.id === country.id ? 'text-soul-blue' : 'text-soul-blue/60 hover:text-soul-blue'}`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${selectedCountry?.id === country.id ? 'border-soul-blue bg-blue-50 text-soul-blue scale-110 shadow-lg' : 'border-blue-100 bg-blue-50/30 text-soul-blue/40'}`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tight">{country.name}</span>
                  {selectedCountry?.id === country.id && <motion.div layoutId="active" className="h-0.5 w-full bg-soul-blue" />}
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
