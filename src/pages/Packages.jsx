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
      <section className="pt-40 pb-12 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-800 mb-6"
          >
            Special <span className="text-thrill-orange">Packages</span>
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
          <div className="flex items-center justify-center gap-16 overflow-x-auto no-scrollbar py-2">
            <div 
              onClick={() => setSelectedCountry(null)}
              className={`flex flex-col items-center gap-2 cursor-pointer min-w-fit transition-all ${!selectedCountry ? 'text-thrill-orange' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-slate-50 ${!selectedCountry ? 'bg-orange-50 text-thrill-orange' : ''}`}>
                <Compass className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-tight">All</span>
              {!selectedCountry && <motion.div layoutId="active-p" className="h-0.5 w-full bg-thrill-orange" />}
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
                  {selectedCountry?.id === country.id && <motion.div layoutId="active-p" className="h-0.5 w-full bg-thrill-orange" />}
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
          <div className="absolute top-0 left-0 w-full h-2 bg-thrill-orange"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-8">Crafting Memories, <br /><span className="text-thrill-orange">Not Just Trips.</span></h2>
            <p className="text-slate-500 mb-10 max-w-xl mx-auto text-lg font-medium leading-relaxed">Our signature packages are designed for the discerning traveler who seeks more than just a vacation.</p>
            <button className="bg-thrill-orange text-white font-bold px-12 py-5 rounded-2xl hover:bg-orange-600 transition-all shadow-xl text-lg active:scale-95">
              Plan My Journey Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
