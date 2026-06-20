import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, CreditCard, Shield, Globe2, Star } from 'lucide-react';
import TravelpayoutsHotelWidget from '../components/TravelpayoutsHotelWidget';

const HotelSearch = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Hero Section with Background Image */}
      <div className="relative pt-32 pb-40 px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh] overflow-hidden">
        {/* Stunning Travel Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=2074&auto=format&fit=crop" 
            alt="Luxury hotel view" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-[#F8FAFC]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm mb-8 shadow-lg"
          >
            <Globe2 className="w-4 h-4 text-blue-400" />
            <span>Find Your Perfect Stay with TripSoul</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            Discover Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Hotels</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Experience luxury and comfort. Compare top hotels globally, curated for your ultimate relaxation.
          </motion.p>
        </div>
      </div>

      {/* Widget Section (Overlapping the Hero) */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 -mt-32 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 40 }}
          className="bg-white/80 backdrop-blur-xl p-2 md:p-4 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white"
        >
          <TravelpayoutsHotelWidget />
        </motion.div>
      </div>

      {/* Premium Features Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Book Hotels With Us?</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Star, title: "Premium Properties", desc: "Access top-rated hotels and luxury resorts worldwide." },
            { icon: Calendar, title: "Ultimate Flexibility", desc: "Modify dates and compare rooms effortlessly for the perfect stay." },
            { icon: CreditCard, title: "Unbeatable Value", desc: "We aggregate top providers to guarantee you the most competitive rates." },
            { icon: Shield, title: "Bank-Grade Security", desc: "Your transactions are encrypted and protected by enterprise security." },
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;
