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

import HerocompLeft from '../assets/HerocompLeft.avif';
import HerocompRight from '../assets/HerocompRight.avif';

import { 
  User, Compass, Heart, Check, ArrowRight, X, Clock, MapPin, Play, Plane,
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { GiPalmTree } from 'react-icons/gi';
import { FaUmbrellaBeach, FaVihara, FaCity, FaMosque, FaSailboat } from 'react-icons/fa6';
import { TbBuildingSkyscraper } from 'react-icons/tb';

import gsap from 'gsap';

const IconMap = {
  GiPalmTree, FaUmbrellaBeach, FaVihara, FaCity, TbBuildingSkyscraper, FaMosque, FaSailboat
};

import PackagesSection from '../components/PackagesSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { destinations, experiences, pricingTiers, itineraries } from '../data/trips';

const Home = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
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
    navigate(`/destination/${country.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Thrillophilia Style Perfected */}
      <section className="relative pt-32 lg:pt-48 pb-12 px-4 md:px-6 overflow-hidden bg-[#FDFDFD]">
        {/* Patterned Static Thumbnails Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Left Side Horizontal Rows (Tapering) - Hidden on Mobile */}
          <div className="absolute left-[2%] top-[12%] hidden lg:flex flex-col gap-8 pointer-events-none">
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

          {/* Right Side Horizontal Rows (Tapering) - Hidden on Mobile */}
          <div className="absolute right-[2%] top-[12%] hidden lg:flex flex-col gap-8 items-end pointer-events-none">
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

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 px-4">


          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-[#2D2D2D] mb-6 md:mb-8 leading-[1.1] tracking-tight font-poppins"
          >
            Your Tour, <br />
            Perfectly <span className="text-[#2B4A8C]">Personalised!</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-[#666666] font-medium mb-8 md:mb-12 font-poppins max-w-2xl"
          >
            Explore expertly curated multi-day tours
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 md:gap-4 bg-white shadow-2xl rounded-full p-1 md:p-2 pl-4 md:pl-6 border border-slate-100 max-w-2xl w-full"
          >
            <MapPin className="text-slate-400 w-4 h-4 md:w-5 md:h-5 hidden sm:block" />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent border-none outline-none text-slate-700 py-2 md:py-3 text-sm md:text-base font-poppins"
            />
            <button 
              onClick={handleSearch}
              style={{ backgroundColor: '#2B4A8C' }}
              className="text-white px-5 md:px-10 py-2.5 md:py-4 rounded-full font-bold text-sm md:text-base hover:opacity-90 transition-all shadow-lg whitespace-nowrap"
            >
              Search
            </button>
          </motion.div>
        </div>
      </section>


      {/* Layer 1: Destination Selection (Thrillophilia Style) */}
      <section className="py-8 border-b border-slate-100 bg-white sticky top-[56px] z-40">
        <div className="max-w-7xl mx-auto px-10 relative">
          <button 
            className="dest-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.dest-prev',
              nextEl: '.dest-next',
            }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              640: { slidesPerView: 5, spaceBetween: 30 },
              768: { slidesPerView: 7, spaceBetween: 40 },
              1024: { slidesPerView: 8, spaceBetween: 50 },
            }}
            className="w-full"
          >
            <SwiperSlide>
              <div 
                onClick={() => navigate('/packages')}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center icon-3d-button-active">
                  <Compass className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-500 text-soul-blue">All</span>
              </div>
            </SwiperSlide>

            {destinations.map((country, i) => {
              const IconComponent = IconMap[country.icon] || Compass;
              const isActive = selectedCountry?.id === country.id;
              return (
                <SwiperSlide key={country.id}>
                  <div 
                    onClick={() => handleCountrySelect(country)}
                    className="flex flex-col items-center gap-3 cursor-pointer relative group"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center p-0.5 ${
                      isActive ? 'icon-3d-button-active' : 'icon-3d-button'
                    }`}>
                      <img src={country.image} alt={country.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-500 text-center w-full truncate px-1 ${
                      isActive ? 'text-soul-blue' : 'text-slate-500 group-hover:text-soul-blue'
                    }`}>{country.name}</span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button 
            className="dest-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full shadow-lg flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>



      <PackagesSection 
        selectedCountryId={selectedCountry?.id} 
        searchQuery={searchQuery}
      />
      <AboutSection />
      <FAQSection />
    </div>
  );
};


export default Home;
