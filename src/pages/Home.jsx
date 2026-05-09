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
      {/* Hero Section - Jadoo Style */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden bg-white min-h-[800px] flex items-center">
        {/* Background Decore (Blob behind the girl) */}
        <div className="absolute top-0 right-0 w-[45%] md:w-[50%] pointer-events-none z-0 translate-x-[10%] -translate-y-[10%]">
          <img src={DecoreBg} alt="" className="w-full h-auto opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center relative z-10">
          <div className="space-y-6 md:space-y-8">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#DF6951] font-bold uppercase tracking-[0.2em] text-base md:text-lg font-poppins"
            >
              Best Destinations around the world
            </motion.p>
            
            <div className="relative">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-[84px] font-bold text-[#181E4B] leading-[1.1] font-volkhov tracking-[-0.02em]"
              >
                Travel, <span className="relative inline-block">
                  enjoy
                  <div className="absolute bottom-2 left-0 w-full h-[12px] bg-[#F1A501]/30 -z-10 rounded-full skew-x-[-15deg]"></div>
                </span> <br />
                and live a new <br />
                and full life
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#5E6282] text-lg font-medium max-w-lg leading-[1.8] font-poppins"
            >
              Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 md:gap-10 pt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/packages')}
                className="group relative overflow-hidden bg-gradient-to-r from-[#F1A501] to-[#DF6951] text-white font-bold px-12 py-5 rounded-2xl shadow-[0_20px_40px_rgba(223,105,81,0.3)] transition-all flex items-center gap-3 text-lg font-poppins"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine"></div>
                
                <span>Explore Packages</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

          <div className="relative mt-12 md:mt-0 flex justify-center">
            {/* Main Visual - The Girl (Union.png according to user) */}
            <div className="relative z-20 w-full max-w-[650px]">
              <img src={UnionBg} alt="Traveler" className="w-full h-auto relative z-10" />
              
              {/* Floating Planes (plane.png) */}
              <img 
                src={PlaneImg} 
                className="absolute top-[10%] -left-[15%] w-32 md:w-48 z-20 pointer-events-none" 
                alt="Plane" 
              />
              <img 
                src={PlaneImg} 
                className="absolute top-[35%] -right-[5%] w-32 md:w-48 z-0 pointer-events-none opacity-80" 
                alt="Plane" 
              />
            </div>
          </div>
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
