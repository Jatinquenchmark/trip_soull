import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Users, MapPin, Star, Check, X, ArrowLeft, Phone, 
  MessageCircle, User, Heart, Compass, Info, ChevronRight 
} from 'lucide-react';
import { detailedPackages, experiences, pricingTiers } from '../data/trips';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = detailedPackages.find(p => p.id === id) || detailedPackages[0];
  
  const [step, setStep] = useState(1);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedTier, setSelectedTier] = useState(pricingTiers[1]); // Default to Comfort

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleExpSelect = (exp) => {
    setSelectedExp(exp);
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) setSelectedExp(null);
    } else {
      navigate('/');
    }
  };

  const handleBooking = () => {
    const message = `Hi TripSoul! I'm interested in the ${selectedTier.name} for ${pkg.name} (${selectedExp?.name} style).`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Header with Progress */}
      <div className="pt-24 md:pt-32 px-6 max-w-7xl mx-auto mb-12">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-[10px] md:text-xs font-black text-slate-400 hover:text-soul-blue transition-colors mb-8 uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> {step === 1 ? 'All Packages' : 'Back to Selection'}
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-blue-50 text-soul-blue text-[10px] font-black uppercase tracking-widest rounded-full">
                {pkg.location}
              </span>
              {selectedExp && (
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {selectedExp.name}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {pkg.name} <span className="text-soul-blue">Soul</span>
            </h1>
          </div>
          
          {/* Professional Step Indicator */}
          <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-slate-100 shadow-sm self-start md:self-auto">
            <div className={`px-5 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-500 ${step === 1 ? 'bg-soul-blue text-white shadow-lg shadow-blue-200' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${step === 1 ? 'bg-white/20' : 'bg-slate-100'}`}>01</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Select Style</span>
            </div>
            <div className="w-6 h-[2px] bg-slate-100 rounded-full"></div>
            <div className={`px-5 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-500 ${step === 2 ? 'bg-soul-blue text-white shadow-lg shadow-blue-200' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${step === 2 ? 'bg-white/20' : 'bg-slate-100'}`}>02</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Review Plan</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="inline-block mb-6">
                <span className="text-xs font-black text-soul-blue uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full">Select Style</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">Who's <span className="text-soul-blue">Traveling?</span></h2>
              <p className="text-slate-500 font-medium mb-16">Select your travel style for a perfectly personalised experience</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pb-20">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => handleExpSelect(exp)}
                    className="relative aspect-[3/4] md:aspect-[3/4.5] rounded-[40px] overflow-hidden group cursor-pointer border-0 shadow-2xl hover:shadow-soul-blue/20 transition-all duration-500"
                  >
                    <img src={exp.image} alt={exp.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 p-8 flex flex-col items-center justify-end text-white text-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-soul-blue transition-all duration-500 border border-white/30">
                        {exp.id === 'solo' && <User className="w-7 h-7" />}
                        {exp.id === 'adventure' && <Compass className="w-7 h-7" />}
                        {exp.id === 'couple' && <Heart className="w-7 h-7" />}
                      </div>
                      <span className="text-[10px] font-black text-soul-blue mb-2 uppercase tracking-[0.2em]">{exp.tagline}</span>
                      <h3 className="text-2xl md:text-3xl font-black">{exp.name}</h3>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="pb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Enhanced Content Area (Left) */}
                <div className="lg:col-span-8 space-y-12">
                  <div className="bg-white rounded-[56px] p-12 md:p-20 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-slate-100/50">
                    
                    {/* Integrated Pricing Tiers */}
                    <div className="mb-24">
                      <div className="flex items-center justify-between mb-10">
                        <div>
                          <span className="text-[10px] font-black text-soul-blue uppercase tracking-[0.4em] mb-2 block">Step 01</span>
                          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Select Your <span className="text-soul-blue italic serif">Comfort</span></h2>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {pricingTiers.map((tier) => (
                          <button
                            key={tier.id}
                            onClick={() => setSelectedTier(tier)}
                            className={`relative aspect-square flex flex-col justify-between p-7 rounded-[40px] transition-all duration-500 text-left group border-[2px] ${
                              selectedTier.id === tier.id 
                              ? 'bg-white border-soul-blue shadow-2xl shadow-blue-100/50 z-10 scale-[1.02]' 
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl'
                            }`}
                          >
                            <div className="relative z-10 w-full">
                              <div className="flex justify-between items-start mb-6">
                                <div>
                                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${selectedTier.id === tier.id ? 'text-soul-blue' : 'text-slate-400'}`}>
                                    {tier.id === 'basic' ? 'Standard' : tier.id === 'medium' ? 'Luxury' : 'Ultra Luxury'}
                                  </span>
                                  <h3 className="text-3xl font-black text-slate-800 mt-1 tracking-tighter">{tier.price}</h3>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Per Person</span>
                                </div>
                                <div className={`w-8 h-8 rounded-full border-[2px] flex items-center justify-center transition-all duration-500 ${
                                  selectedTier.id === tier.id ? 'border-soul-blue bg-soul-blue text-white shadow-lg' : 'border-slate-200 text-transparent'
                                }`}>
                                  <Check className={`w-4 h-4 ${selectedTier.id === tier.id ? 'scale-100' : 'scale-0'}`} />
                                </div>
                              </div>
                            </div>

                            <div className="w-full pt-4 border-t border-slate-100">
                              <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${selectedTier.id === tier.id ? 'bg-soul-blue' : 'bg-slate-300'}`}></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">+ 5% GST</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-[1px] w-full bg-slate-100 mb-20"></div>

                    {/* Detailed Plan Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
                      <div>
                        <span className="text-[10px] font-black text-soul-blue uppercase tracking-[0.4em] mb-2 block">Step 02</span>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-2">Detailed <span className="text-soul-blue italic serif">Plan</span></h2>
                        <div className="h-1.5 w-24 bg-soul-blue/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            transition={{ duration: 1 }}
                            className="h-full w-full bg-soul-blue"
                          ></motion.div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="px-8 py-4 bg-blue-50/30 rounded-[28px] border border-blue-100/30">
                          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Timeframe</span>
                          <span className="text-base font-black text-soul-blue">{pkg.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative mb-24">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-soul-blue/5 rounded-full"></div>
                      <p className="text-slate-500 font-medium leading-relaxed text-xl max-w-3xl italic pl-8">
                        "{pkg.overview}"
                      </p>
                    </div>
                    
                    <div className="space-y-20 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                      {pkg.itinerary.map((day, i) => (
                        <div key={i} className="flex gap-12 relative group">
                          <div className={`w-16 h-16 rounded-[28px] flex items-center justify-center font-black text-xl transition-all duration-700 z-10 shrink-0 ${
                            i === 0 
                            ? 'bg-soul-blue text-white shadow-[0_20px_40px_-10px_rgba(43,74,140,0.5)] scale-110' 
                            : 'bg-white border border-slate-100 text-slate-400 group-hover:border-soul-blue group-hover:text-soul-blue group-hover:shadow-xl'
                          }`}>
                            {day.day}
                          </div>
                          <div className="pt-2 flex-1">
                            <h4 className="text-2xl md:text-3xl font-black text-slate-800 mb-6 tracking-tight transition-all duration-500 group-hover:translate-x-2">{day.title}</h4>
                            <div className="bg-slate-50/30 p-8 md:p-10 rounded-[40px] border border-slate-100/30 group-hover:bg-white group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all duration-700 group-hover:border-slate-100">
                              <p className="text-slate-500 font-medium leading-relaxed text-base md:text-lg">
                                {day.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Refined Sticky Sidebar (Right) */}
                <div className="lg:col-span-4">
                  <div className="sticky top-32 space-y-6">
                    <div className="bg-[#0F172A] rounded-[48px] p-8 md:p-10 shadow-3xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-soul-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-transform duration-1000 group-hover:scale-150"></div>
                      
                      <div className="text-center mb-8 pb-8 border-b border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] block mb-4">Summary</span>
                        <h3 className="text-6xl font-black text-white tracking-tighter mb-1">{selectedTier.price}</h3>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-soul-blue"></div>
                          <span className="text-[9px] font-bold text-soul-blue uppercase tracking-[0.2em]">{selectedTier.name} Experience</span>
                        </div>
                      </div>

                      <div className="space-y-6 mb-10">
                        {[
                          { label: 'Location', value: pkg.location, icon: MapPin },
                          { label: 'Style', value: selectedExp.name, icon: Compass },
                          { label: 'Rating', value: '4.95 / 5.0', icon: Star }
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center group/row">
                            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-3 transition-colors group-hover/row:text-slate-400">
                              <item.icon className="w-4 h-4 text-soul-blue/40" /> {item.label}
                            </span>
                            <span className="text-white font-black text-xs">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={handleBooking}
                        className="w-full bg-white text-slate-900 py-6 rounded-[28px] font-black text-lg transition-all hover:bg-soul-blue hover:text-white shadow-2xl active:scale-[0.98] flex items-center justify-center gap-3 group/btn"
                      >
                        <Phone className="w-5 h-5 transition-transform group-hover/btn:-rotate-12" /> Start Journey
                      </button>
                      
                      <div className="mt-6 flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                          Consultants online
                        </p>
                      </div>
                    </div>

                    {/* Premium Support Link */}
                    <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center group cursor-pointer hover:shadow-xl transition-all duration-500" onClick={handleBooking}>
                      <div className="w-16 h-16 rounded-[24px] bg-green-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-700">
                        <MessageCircle className="w-8 h-8 text-green-500 fill-green-500/5" />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Assistance?</h4>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">Design your itinerary on WhatsApp.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PackageDetails;
