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

const IconMap = {
  Map, Palmtree, Building2, Ship, Waves, Landmark, Castle
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
                onClick={() => setSelectedCountry(null)}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${
                  !selectedCountry ? 'icon-3d-button-active' : 'icon-3d-button'
                }`}>
                  <Compass className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-500 ${
                  !selectedCountry ? 'text-soul-blue' : 'text-slate-500 group-hover:text-soul-blue'
                }`}>All</span>
              </div>
            </SwiperSlide>

            {destinations.map((country, i) => {
              const IconComponent = IconMap[country.icon] || Map;
              const isActive = selectedCountry?.id === country.id;
              return (
                <SwiperSlide key={country.id}>
                  <div 
                    onClick={() => navigate(`/destination/${country.id}`)}
                    className="flex flex-col items-center gap-3 cursor-pointer relative group"
                  >
                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center p-0.5 ${
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
