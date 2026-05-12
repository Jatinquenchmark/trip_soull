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
    <div className="bg-[#F8FAFC] min-h-screen relative">
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white"></div>
        <img 
          src={pkg.image} 
          className="w-full h-full object-cover opacity-[0.03] scale-150 blur-3xl rotate-12" 
          alt="" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
      </div>

      {/* Sticky Premium Header (Appears on Scroll) */}


      {/* Luxury Navigation Bar */}
      <div className="relative z-40 pt-28 px-8 max-w-[1600px] mx-auto flex justify-between items-center">
        <button 
          onClick={handleBack}
          className="group flex items-center gap-4 bg-white/50 backdrop-blur-xl px-6 py-3 rounded-full border border-white shadow-sm hover:bg-soul-blue hover:text-white transition-all duration-500"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore Others</span>
        </button>

        <div className="flex items-center gap-3 bg-white/50 backdrop-blur-xl p-1.5 rounded-full border border-white shadow-sm">
          <div className={`px-6 py-2.5 rounded-full flex items-center gap-3 transition-all duration-500 ${step === 1 ? 'bg-soul-blue text-white shadow-xl shadow-blue-200' : 'text-slate-400'}`}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">01 Selection</span>
          </div>
          <div className={`px-6 py-2.5 rounded-full flex items-center gap-3 transition-all duration-500 ${step === 2 ? 'bg-soul-blue text-white shadow-xl shadow-blue-200' : 'text-slate-400'}`}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">02 Itinerary</span>
          </div>
        </div>
      </div>

      {/* Cinematic Hero Section */}
      <div className="relative z-10 pt-24 pb-20 px-8 text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-soul-blue/30"></span>
            <span className="text-soul-blue font-black text-[10px] uppercase tracking-[0.6em]">Curated Luxury Experience</span>
            <span className="w-12 h-[1px] bg-soul-blue/30"></span>
          </div>
          
          <h1 className="text-[10vw] lg:text-[120px] font-black text-slate-900 tracking-tighter leading-[0.85] mb-12 relative inline-block">
            {pkg.name}
            <span className="text-soul-blue italic serif font-normal text-[6vw] lg:text-[70px] absolute -bottom-4 -right-12 lg:-right-20 drop-shadow-2xl">
              Soul
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <div className="bg-white/80 backdrop-blur-xl px-10 py-5 rounded-[32px] border border-white shadow-2xl shadow-blue-900/5 flex items-center gap-6 group hover:bg-white transition-all duration-500">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-soul-blue group-hover:rotate-12 transition-all">
                <MapPin className="w-6 h-6 text-soul-blue group-hover:text-white" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination</span>
                <span className="text-base font-black text-slate-800">{pkg.location}</span>
              </div>
            </div>
            {selectedExp && (
              <div className="bg-white/80 backdrop-blur-xl px-10 py-5 rounded-[32px] border border-white shadow-2xl shadow-blue-900/5 flex items-center gap-6 group hover:bg-white transition-all duration-500">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 group-hover:rotate-12 transition-all">
                  <Star className="w-6 h-6 text-amber-500 group-hover:text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Travel Style</span>
                  <span className="text-base font-black text-slate-800">{selectedExp.name}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 relative z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="text-center"
            >
              <div className="inline-block mb-6">
                <span className="text-xs font-black text-soul-blue uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full">Select Style</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">Who's <span className="text-soul-blue">Traveling?</span></h2>
              <p className="text-slate-500 font-medium mb-16">Select your travel style for a perfectly personalised experience</p>
              
              <div className="flex flex-col md:flex-row h-[500px] md:h-[700px] gap-5 max-w-7xl mx-auto pb-24 group/gallery">
                {experiences.map((exp, idx) => (
                  <button
                    key={exp.id}
                    onClick={() => handleExpSelect(exp)}
                    className="relative flex-1 hover:flex-[2.5] transition-all duration-700 rounded-[60px] overflow-hidden group/card cursor-pointer border-0 shadow-3xl"
                  >
                    <img 
                      src={exp.image} 
                      alt={exp.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover/card:scale-110" 
                    />
                    
                    {/* Deep Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover/card:from-black/95 transition-all duration-700"></div>

                    {/* Minimal Side Number (Visible when collapsed) */}
                    <div className="absolute top-12 left-12 opacity-40 group-hover/card:opacity-100 transition-opacity duration-700">
                      <span className="text-white text-7xl font-black tracking-tighter opacity-10">0{idx + 1}</span>
                    </div>

                    {/* Vertical Text (Visible when collapsed) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover/card:opacity-0 transition-opacity duration-500">
                      <span className="text-white/40 font-black text-2xl uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
                        {exp.name}
                      </span>
                    </div>

                    {/* Full Content (Reveals on Hover) */}
                    <div className="absolute inset-0 p-12 flex flex-col justify-end opacity-0 group-hover/card:opacity-100 transition-all duration-700 delay-100 translate-y-10 group-hover/card:translate-y-0">
                      <div className="w-20 h-20 rounded-[32px] bg-soul-blue flex items-center justify-center mb-8 shadow-2xl shadow-soul-blue/40 rotate-12 group-hover/card:rotate-0 transition-transform duration-700">
                        {exp.id === 'solo' && <User className="w-10 h-10 text-white" />}
                        {exp.id === 'adventure' && <Compass className="w-10 h-10 text-white" />}
                        {exp.id === 'couple' && <Heart className="w-10 h-10 text-white" />}
                      </div>

                      <span className="text-xs font-black text-soul-blue uppercase tracking-[0.4em] mb-4 bg-blue-50/10 backdrop-blur-md w-fit px-5 py-2 rounded-full border border-white/10">
                        {exp.tagline}
                      </span>
                      
                      <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                        {exp.name.split(' ')[0]} <br/>
                        <span className="text-soul-blue italic serif text-4xl md:text-5xl">
                          {exp.name.split(' ')[1] || 'Travel'}
                        </span>
                      </h3>

                      <div className="flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest bg-white/20 backdrop-blur-md w-fit px-8 py-4 rounded-[24px] border border-white/20 hover:bg-white hover:text-soul-blue transition-all">
                        Experience This <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <div key="step2" className="relative animate-in fade-in duration-700">

              {/* Light premium background strip */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 z-0 rounded-t-[48px]"></div>
              <div className="absolute inset-0 z-0 rounded-t-[48px] overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-blue-100/60 rounded-full blur-[160px]"></div>
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-slate-100/80 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-50/80 rounded-full blur-[120px]"></div>
              </div>

              <div className="relative z-10 px-8 lg:px-16 pt-16 pb-40 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                  {/* ── LEFT COLUMN ── */}
                  <div className="lg:col-span-8 space-y-8">

                    {/* Section Header */}
                    <div className="mb-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-8 bg-soul-blue/40"></div>
                        <span className="text-[10px] font-black text-soul-blue uppercase tracking-[0.5em]">Step 02 · Choose Your Experience</span>
                      </div>
                      <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Craft Your <span className="font-serif italic text-soul-blue">Journey</span></h2>
                    </div>

                    {/* ── PRICING CARDS ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {pricingTiers.map((tier, idx) => {
                        const isSelected = selectedTier?.id === tier.id;
                        const configs = [
                          { bg: 'bg-white hover:bg-slate-50 border-slate-200', tag: 'text-slate-400', price: 'text-slate-900', glow: 'shadow-slate-200/80' },
                          { bg: 'bg-white hover:bg-blue-50/50 border-soul-blue/20', tag: 'text-soul-blue', price: 'text-slate-900', glow: 'shadow-soul-blue/10' },
                          { bg: 'bg-gradient-to-br from-soul-blue/5 to-blue-100/60 border-soul-blue/30', tag: 'text-soul-blue', price: 'text-slate-900', glow: 'shadow-soul-blue/15' },
                        ];
                        const c = configs[idx];
                        return (
                          <button
                            key={tier.id}
                            onClick={() => setSelectedTier(tier)}
                            className={`relative p-7 rounded-[24px] border text-left transition-all duration-500 ${c.bg} ${
                              isSelected
                                ? `shadow-2xl ${c.glow} scale-[1.04] ring-2 ring-soul-blue/30`
                                : 'opacity-70 hover:opacity-100 shadow-sm'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-5 h-5 bg-soul-blue rounded-full flex items-center justify-center shadow-lg shadow-soul-blue/30">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                            <span className={`text-[9px] font-black uppercase tracking-[0.35em] ${c.tag}`}>{tier.name}</span>
                            <h3 className={`text-4xl font-black tracking-tighter mt-3 mb-1 ${c.price}`}>{tier.price}</h3>
                            <p className="text-slate-400 text-[11px] font-medium">per person</p>
                            {isSelected && (
                              <div className="mt-4 pt-4 border-t border-soul-blue/10 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-soul-blue animate-pulse"></div>
                                <span className="text-[9px] font-black text-soul-blue uppercase tracking-widest">Active Selection</span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* ── ITINERARY ── */}
                    <div className="rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-xl shadow-slate-200/60">
                      {/* Itinerary header */}
                      <div className="px-10 py-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-soul-blue/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-soul-blue"></div>
                          </div>
                          <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] block">Your Journey</span>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Day-by-Day Itinerary</h3>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pkg.itinerary?.length} Days</span>
                      </div>

                      {/* Day rows */}
                      <div>
                        {pkg.itinerary?.map((day, i) => (
                          <div
                            key={i}
                            className="group flex gap-6 px-10 py-7 border-b border-slate-100 last:border-0 hover:bg-blue-50/30 transition-all duration-300 cursor-default"
                          >
                            {/* Day pill */}
                            <div className="flex-shrink-0 flex flex-col items-center gap-2">
                              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-soul-blue/20 flex items-center justify-center group-hover:bg-soul-blue group-hover:border-soul-blue transition-all duration-500">
                                <span className="text-[11px] font-black text-soul-blue group-hover:text-white transition-colors duration-300">{String(i + 1).padStart(2, '0')}</span>
                              </div>
                              {i < (pkg.itinerary?.length ?? 0) - 1 && (
                                <div className="w-[1px] h-full bg-slate-200 flex-1 min-h-[20px]"></div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="space-y-2 flex-1 pb-2">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Day {i + 1}</span>
                              <h4 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors duration-300">{day.title}</h4>
                              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{day.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── STICKY SIDEBAR ── */}
                  <div className="lg:col-span-4 lg:sticky lg:top-40 z-20 self-start">
                    <div className="rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-2xl shadow-slate-200/70">

                      {/* Price header */}
                      <div className="relative p-8 border-b border-slate-100 bg-gradient-to-br from-blue-50/80 to-white">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-soul-blue/5 rounded-full blur-2xl"></div>
                        <div className="relative">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">Your Reservation</span>
                          <h3 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">{selectedTier?.price}</h3>
                          <p className="text-[10px] font-bold text-soul-blue uppercase tracking-widest mt-2">{selectedTier?.name} Soul</p>
                        </div>
                      </div>

                      {/* Trip details */}
                      <div className="p-8 space-y-7">
                        {[
                          { label: 'Destination', value: pkg.location },
                          { label: 'Travel Style', value: selectedExp?.name || 'Luxury' },
                          { label: 'Duration', value: pkg.duration }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                            <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide">{item.value}</span>
                          </div>
                        ))}

                        <div className="h-[1px] w-full bg-slate-100"></div>

                        <button
                          onClick={handleBooking}
                          className="w-full relative overflow-hidden bg-soul-blue text-white py-5 rounded-2xl font-black text-sm tracking-wider transition-all hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                          <span className="relative z-10">Start Your Journey</span>
                          <ChevronRight className="w-4 h-4 relative z-10" />
                        </button>

                        <p className="text-center text-[10px] text-slate-400 font-medium">
                          Free cancellation · 24/7 concierge support
                        </p>

                        <div className="flex items-center justify-center gap-3">
                          <div className="flex -space-x-2">
                            {[1,2,3].map(n => (
                              <div key={n} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                <img src={`https://i.pravatar.cc/100?u=trip${n}`} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">+120 booked this month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PackageDetails;

