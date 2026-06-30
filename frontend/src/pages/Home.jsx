import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  ChevronLeft, ChevronRight, Palmtree, Building2, Castle, Mountain, Ship, Map, Landmark, Waves
} from 'lucide-react';

import {
  DubaiIcon, JapanIcon, MaldivesIcon, ThailandIcon, VietnamIcon, SingaporeIcon, EuropeIcon, TurkeyIcon
} from '../components/CustomDestinationIcons';

const IconMap = {
  FaSailboat: VietnamIcon,
  GiPalmTree: Palmtree, // Default fallback
  TbBuildingSkyscraper: DubaiIcon,
  FaCity: SingaporeIcon,
  FaUmbrellaBeach: MaldivesIcon,
  FaVihara: ThailandIcon,
  FaMosque: TurkeyIcon,
  Map: EuropeIcon,
  Palmtree: Palmtree,
  Landmark: Landmark,
  Castle: JapanIcon,
  Waves: MaldivesIcon,
  Building2: DubaiIcon,
  // Let's directly map by country ID for precision
  dubai: DubaiIcon,
  japan: JapanIcon,
  maldives: MaldivesIcon,
  thailand: ThailandIcon,
  vietnam: VietnamIcon,
  singapore: SingaporeIcon,
  europe: EuropeIcon,
  turkey: TurkeyIcon,
  bali: Palmtree // Bali keeps Palmtree
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
  const location = useLocation();
  const [currentBg, setCurrentBg] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

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
      {/* Hero Section - Premium Modern Style */}
      <section className="relative pt-32 lg:pt-48 pb-12 px-4 md:px-6 overflow-hidden bg-slate-50">
        
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-blue-300 to-purple-300 blur-[100px] mix-blend-multiply opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-gradient-to-bl from-orange-200 to-pink-200 blur-[100px] mix-blend-multiply opacity-70 animate-pulse" style={{ animationDuration: '10s' }}></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-gradient-to-tr from-teal-100 to-blue-200 blur-[100px] mix-blend-multiply opacity-70 animate-pulse" style={{ animationDuration: '12s' }}></div>
        </div>

        {/* Patterned Static Thumbnails Background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Left Side Horizontal Rows (Tapering) - Hidden on Mobile */}
          <div className="absolute left-[2%] top-[12%] hidden lg:flex flex-col gap-8 pointer-events-none">
            {/* Row 1 */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="flex gap-4 items-center -ml-20"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform -rotate-3 translate-y-2">
                <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform rotate-2 translate-y-6">
                <img src={HomeHero2} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform -rotate-2 translate-y-10">
                <img src={HomeHero3} className="w-full h-full object-cover" alt="" />
              </div>
            </motion.div>
            {/* Row 2 */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="flex gap-4 items-center -ml-10"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform rotate-2 -translate-y-2">
                <img src={HomeHero4} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform -rotate-3 translate-y-4">
                <img src={HomeHero5} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform rotate-6 translate-y-8">
                <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
              </div>
            </motion.div>
          </div>

          {/* Right Side Horizontal Rows (Tapering) - Hidden on Mobile */}
          <div className="absolute right-[2%] top-[12%] hidden lg:flex flex-col gap-8 items-end pointer-events-none">
            {/* Row 1 */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="flex gap-4 items-center -mr-20"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform rotate-2 translate-y-10">
                <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform -rotate-3 translate-y-6">
                <img src={HomeHero2} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform rotate-3 translate-y-2">
                <img src={HomeHero3} className="w-full h-full object-cover" alt="" />
              </div>
            </motion.div>
            {/* Row 2 */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="flex gap-4 items-center -mr-10"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform -rotate-6 translate-y-8">
                <img src={HomeHero4} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform rotate-3 translate-y-4">
                <img src={HomeHero5} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden shadow-2xl border-[3px] border-white/80 backdrop-blur-sm transform -rotate-2 -translate-y-2">
                <img src={HomeHero1} className="w-full h-full object-cover" alt="" />
              </div>
            </motion.div>
          </div>

          {/* New Herocomp Images - Moved Inwards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[1%] top-[65%] -translate-y-1/2 z-0 hidden lg:block max-w-[280px] pointer-events-none opacity-100"
          >
            <img src={HerocompLeft} className="w-full h-auto object-contain transform -rotate-6" alt="" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[1%] top-[65%] -translate-y-1/2 z-0 hidden lg:block max-w-[280px] pointer-events-none opacity-100"
          >
            <img src={HerocompRight} className="w-full h-auto object-contain transform rotate-6" alt="" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 px-4">


          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-[80px] font-extrabold text-[#1A1A1A] mb-6 md:mb-8 leading-[1.1] tracking-tight font-poppins drop-shadow-sm"
          >
            Your Tour, <br />
            Perfectly <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B4A8C] via-[#6366F1] to-[#F97316]">Personalised!</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg lg:text-xl text-[#4A4A4A] font-medium mb-8 md:mb-12 font-poppins max-w-2xl bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-white/50"
          >
            Explore expertly curated multi-day tours
          </motion.p>

        </div>
      </section>


      {/* Layer 1: Destination Selection (Thrillophilia Style) */}
      <section className={`py-3 md:py-4 border-b border-slate-100 bg-white sticky z-40 shadow-sm transition-all duration-300 ${isScrollingDown ? 'top-0' : 'top-[72px]'}`}>
        <div className="max-w-7xl mx-auto px-10 relative">
          <button 
            className="dest-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.dest-prev',
              nextEl: '.dest-next',
            }}
            spaceBetween={15}
            slidesPerView={5}
            breakpoints={{
              640: { slidesPerView: 6, spaceBetween: 20 },
              768: { slidesPerView: 8, spaceBetween: 25 },
              1024: { slidesPerView: 10, spaceBetween: 30 },
            }}
            className="w-full"
          >
            <SwiperSlide>
              <div 
                onClick={() => navigate('/packages')}
                className="flex flex-col items-center gap-2 cursor-pointer group pt-2 pb-1"
              >
                <div className="transition-all duration-300 text-slate-500 group-hover:text-orange-500">
                  <Compass className="w-8 h-8 md:w-9 md:h-9 stroke-[1.5]" />
                </div>
                <span className="text-[11px] md:text-[12px] font-semibold transition-colors duration-300 text-slate-600 group-hover:text-orange-500">Explore</span>
              </div>
            </SwiperSlide>

            {destinations.map((country, i) => {
              const IconComponent = IconMap[country.id] || IconMap[country.icon] || Map;
              const isActive = selectedCountry?.id === country.id;
              // Hardcode trending for a few popular ones to match the screenshot
              const isTrending = ['maldives', 'japan', 'dubai', 'bali'].includes(country.id);
              
              return (
                <SwiperSlide key={country.id}>
                  <div 
                    onClick={() => handleCountrySelect(country)}
                    className="flex flex-col items-center gap-2 cursor-pointer relative group pt-2 pb-1"
                  >
                    <div className={`transition-all duration-300 ${
                      isActive ? 'text-orange-500 scale-110' : 'text-slate-500 group-hover:text-orange-500'
                    }`}>
                      <IconComponent className="w-8 h-8 md:w-9 md:h-9 stroke-[1.5]" />
                    </div>
                    <span className={`text-[11px] md:text-[12px] font-semibold transition-colors duration-300 text-center w-full truncate px-1 ${
                      isActive ? 'text-orange-500' : 'text-slate-600 group-hover:text-orange-500'
                    }`}>{country.name}</span>
                    
                    {isTrending && (
                      <span className="absolute top-0 right-0 md:right-2 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        Trending
                      </span>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <button 
            className="dest-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Search Bar - Moved below filter */}
      <section className="py-8 bg-[#FDFDFD] flex justify-center px-4 mt-8 relative z-30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
