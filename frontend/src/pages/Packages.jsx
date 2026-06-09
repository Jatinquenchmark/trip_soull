import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { destinations } from '../data/trips';
import PackagesSection from '../components/PackagesSection';
import { 
  ArrowRight, Check, Play, Compass, ChevronLeft, ChevronRight,
  Map, Palmtree, Building2, Ship, Waves, Landmark, Castle 
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import {
  DubaiIcon, JapanIcon, MaldivesIcon, ThailandIcon, VietnamIcon, SingaporeIcon, EuropeIcon, TurkeyIcon
} from '../components/CustomDestinationIcons';

const IconMap = {
  FaSailboat: VietnamIcon,
  GiPalmTree: Palmtree,
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
  dubai: DubaiIcon,
  japan: JapanIcon,
  maldives: MaldivesIcon,
  thailand: ThailandIcon,
  vietnam: VietnamIcon,
  singapore: SingaporeIcon,
  europe: EuropeIcon,
  turkey: TurkeyIcon,
  bali: Palmtree
};

const Packages = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 lg:pt-40 pb-12 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-800 mb-6"
          >
            Special <span className="text-soul-blue">Packages</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-2xl mx-auto text-lg font-medium"
          >
            Discover hand-crafted journeys across the world's most breathtaking destinations.
          </motion.p>
        </div>
      </section>

      {/* Filter Section (Sticky like Home) */}
      <section className="py-3 md:py-4 border-b border-slate-100 bg-white sticky top-[72px] z-40 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-10 relative">
          <button 
            className="dest-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                onClick={() => setSelectedCountry(null)}
                className="flex flex-col items-center gap-2 cursor-pointer group pt-2 pb-1"
              >
                <div className={`transition-all duration-300 ${!selectedCountry ? 'text-orange-500 scale-110' : 'text-slate-500 group-hover:text-orange-500'}`}>
                  <Compass className="w-8 h-8 md:w-9 md:h-9 stroke-[1.5]" />
                </div>
                <span className={`text-[11px] md:text-[12px] font-semibold transition-colors duration-300 ${!selectedCountry ? 'text-orange-500' : 'text-slate-600 group-hover:text-orange-500'}`}>All</span>
              </div>
            </SwiperSlide>

            {destinations.map((country, i) => {
              const IconComponent = IconMap[country.id] || IconMap[country.icon] || Map;
              const isActive = selectedCountry?.id === country.id;
              const isTrending = ['maldives', 'japan', 'dubai', 'bali'].includes(country.id);
              
              return (
                <SwiperSlide key={country.id}>
                  <div 
                    onClick={() => setSelectedCountry(country)}
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
            className="dest-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md flex items-center justify-center text-slate-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Packages Grid */}
      <PackagesSection 
        selectedCountryId={selectedCountry?.id} 
        limit={100} 
        showViewAll={false} 
      />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#FDFDFD]">
        <div className="max-w-5xl mx-auto text-center bg-white border border-slate-100 p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div style={{ backgroundColor: '#2B4A8C' }} className="absolute top-0 left-0 w-full h-2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-8">Crafting Memories, <br /><span className="text-[#2B4A8C]">Not Just Trips.</span></h2>
            <p className="text-slate-500 mb-10 max-w-xl mx-auto text-lg font-medium leading-relaxed">Our signature packages are designed for the discerning traveler who seeks more than just a vacation.</p>
            <button 
              style={{ backgroundColor: '#2B4A8C' }}
              className="text-white font-bold px-12 py-5 rounded-2xl hover:opacity-90 transition-all shadow-xl text-lg active:scale-95"
            >
              Plan My Journey Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
