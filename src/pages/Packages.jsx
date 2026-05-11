import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { destinations } from '../data/trips';
import PackagesSection from '../components/PackagesSection';
import { 
  ArrowRight, Check, Play, Compass,
  Map, Palmtree, Building2, Ship, Waves, Landmark, Castle 
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const IconMap = {
  Map, Palmtree, Building2, Ship, Waves, Landmark, Castle
};

const Packages = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

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
      <section className="py-4 border-b border-slate-100 bg-white sticky top-[56px] z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto no-scrollbar py-2 px-2 md:px-0">
            <div 
              onClick={() => setSelectedCountry(null)}
              className={`flex flex-col items-center gap-2 cursor-pointer min-w-fit transition-all ${!selectedCountry ? 'text-soul-blue' : 'text-soul-blue/60 hover:text-soul-blue'}`}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-blue-50/50 ${!selectedCountry ? 'bg-blue-50 text-soul-blue' : 'text-soul-blue/40'}`}>
                <Compass className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">All</span>
              {!selectedCountry && <motion.div layoutId="active-p" className="h-0.5 w-full bg-soul-blue" />}
            </div>

            {destinations.map((country, i) => {
              const IconComponent = IconMap[country.icon] || Map;
              return (
                <div 
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className={`flex flex-col items-center gap-2 cursor-pointer min-w-fit relative group transition-all ${selectedCountry?.id === country.id ? 'text-soul-blue' : 'text-soul-blue/60 hover:text-soul-blue'}`}
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all ${selectedCountry?.id === country.id ? 'border-soul-blue bg-blue-50 text-soul-blue scale-110 shadow-lg' : 'border-blue-100 bg-blue-50/30 text-soul-blue/40'}`}>
                    <IconComponent className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tight">{country.name}</span>
                  {selectedCountry?.id === country.id && <motion.div layoutId="active-p" className="h-0.5 w-full bg-soul-blue" />}
                </div>
              );
            })}
          </div>
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
