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
  
  const defaultTravelImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=70',
  ];

  const displayImages = [
    pkg.images?.[0] || defaultTravelImages[0],
    pkg.images?.[1] || pkg.images?.[0] || defaultTravelImages[1],
    pkg.images?.[2] || pkg.images?.[0] || defaultTravelImages[2],
    pkg.images?.[3] || pkg.images?.[0] || defaultTravelImages[3],
  ];
  
  const [step, setStep] = useState(1);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedTier, setSelectedTier] = useState(pricingTiers[1]); // Default to Comfort
  const [activeImage, setActiveImage] = useState(null);

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
      {step === 1 && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden animate-in fade-in duration-1000">
          <img 
            src={pkg.images?.[0] || ''} 
            className="w-full h-full object-cover opacity-100 scale-100 transition-all duration-700 ease-out" 
            alt="" 
          />
          {/* Subtle cinematic rich dark overlay - keeping image fully vibrant while protecting readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/30 to-slate-950/60"></div>
        </div>
      )}

      {/* ── STEP 2 PREMIUM HERO COVER SECTION (FULL BLEED EDGE-TO-EDGE) ── */}
      {step === 2 && (
        <div className="absolute top-0 left-0 w-full h-[340px] md:h-[440px] overflow-hidden z-0 animate-in fade-in duration-700">
          <img 
            src={pkg.images?.[0] || ''} 
            className="w-full h-full object-cover object-[center_35%]" 
            alt={pkg.name} 
          />
          {/* Elegant dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/20"></div>
          
          {/* Hero Content aligned bottom inside the max-width boundary */}
          <div className="absolute inset-x-0 bottom-12 px-8 lg:px-16 max-w-[1600px] mx-auto text-white flex flex-col justify-end h-full pb-4 z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3.5 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                {pkg.location}
              </span>
              <span className="px-3.5 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase tracking-widest rounded-full">
                {selectedExp ? selectedExp.name : 'Premium'}
              </span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl text-white">
              {pkg.name} <span className="font-serif italic text-blue-300 font-normal">Soul Journey</span>
            </h2>
            <p className="text-slate-300 font-medium text-xs md:text-sm max-w-2xl mt-4 leading-relaxed">
              {selectedExp ? selectedExp.description || `A perfectly curated ${selectedExp.name.toLowerCase()} experience crafted to give you the most unforgettable memories.` : pkg.overview}
            </p>
          </div>
        </div>
      )}

      {/* Luxury Navigation Bar */}
      <div className="relative z-40 pt-28 px-8 max-w-[1600px] mx-auto flex justify-between items-center">
        <button 
          onClick={handleBack}
          className={`group flex items-center gap-4 px-6 py-3 rounded-full border shadow-sm transition-all duration-500 ${
            step === 1 
              ? 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-slate-900' 
              : 'bg-white/50 backdrop-blur-xl border-white text-slate-800 hover:bg-soul-blue hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore Others</span>
        </button>

        <div className={`flex items-center gap-3 p-1.5 rounded-full border shadow-sm transition-all duration-500 ${
          step === 1 
            ? 'bg-white/10 backdrop-blur-md border-white/10' 
            : 'bg-white/50 backdrop-blur-xl border-white'
        }`}>
          <div className={`px-6 py-2.5 rounded-full flex items-center gap-3 transition-all duration-500 ${
            step === 1 
              ? 'bg-soul-blue text-white shadow-xl shadow-soul-blue/30' 
              : 'text-slate-400'
          }`}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">01 Selection</span>
          </div>
          <div className={`px-6 py-2.5 rounded-full flex items-center gap-3 transition-all duration-500 ${
            step === 2 
              ? 'bg-white text-slate-900 shadow-xl shadow-white/10' 
              : step === 1 
                ? 'text-white/40' 
                : 'text-slate-400'
          }`}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">02 Itinerary</span>
          </div>
        </div>
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
                <span className="text-xs font-black text-blue-300 uppercase tracking-[0.3em] bg-soul-blue/20 px-5 py-2.5 rounded-full border border-soul-blue/30 backdrop-blur-md">Select Style</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-4 text-white tracking-tighter">
                {pkg.name.split(' ')[0]} <span className="text-blue-300 italic serif font-normal">{pkg.name.split(' ')[1] || 'Soul'}</span>
              </h2>
              <p className="text-slate-300 font-medium mb-12">Select your travel style for a perfectly personalised experience</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto pb-24">
                {experiences.map((exp, idx) => (
                  <button
                    key={exp.id}
                    onClick={() => handleExpSelect(exp)}
                    className="group bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/60 hover:shadow-soul-blue/15 transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col text-left"
                  >
                    {/* Top Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={exp.image} 
                        alt={exp.name} 
                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                      <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                        {exp.id === 'solo' && <User className="w-6 h-6 text-white" />}
                        {exp.id === 'adventure' && <Compass className="w-6 h-6 text-white" />}
                        {exp.id === 'couple' && <Heart className="w-6 h-6 text-white" />}
                      </div>
                    </div>

                    {/* Bottom Content Section */}
                    <div className="p-8 flex flex-col flex-1">
                      <span className="text-[10px] font-black text-soul-blue uppercase tracking-[0.4em] mb-3 bg-blue-50 w-fit px-4 py-1.5 rounded-full">
                        {exp.tagline}
                      </span>
                      
                      <h3 className="text-3xl font-black text-slate-900 leading-tight tracking-tighter mb-4">
                        {exp.name.split(' ')[0]} <span className="text-soul-blue italic serif font-normal">{exp.name.split(' ')[1] || 'Traveler'}</span>
                      </h3>

                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-1">
                        {exp.description || "Discover experiences perfectly tailored for your unique travel style and preferences."}
                      </p>

                      <div className="flex items-center justify-between group-hover:text-soul-blue transition-colors">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-soul-blue transition-colors">Experience This</span>
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-soul-blue group-hover:text-white transition-all duration-500">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <div key="step2" className="relative animate-in fade-in duration-700">

              {/* Spacer matching the height of the full-bleed cover banner minus navbar padding */}
              <div className="h-[340px] md:h-[440px] pointer-events-none"></div>

              {/* Light premium background strip for overlapping content */}
              <div className="absolute top-[340px] md:top-[440px] bottom-0 inset-x-0 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 z-0 rounded-t-[48px]"></div>
              <div className="absolute top-[340px] md:top-[440px] bottom-0 inset-x-0 z-0 rounded-t-[48px] overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-blue-100/60 rounded-full blur-[160px]"></div>
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-slate-100/80 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-50/80 rounded-full blur-[120px]"></div>
              </div>

              <div className="relative z-10 px-8 lg:px-16 pb-40 max-w-[1600px] mx-auto -mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                  {/* ── LEFT COLUMN ── */}
                  <div className="lg:col-span-8 space-y-8">

                    {/* Section Header */}
                    <div className="mb-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-8 bg-soul-blue/40"></div>
                        <span className="text-[10px] font-black text-soul-blue uppercase tracking-[0.5em]">Step 02 · Customize Journey</span>
                      </div>
                      <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Your Travel <span className="font-serif italic text-soul-blue">Blueprint</span></h2>
                    </div>

                    {/* ── OVERVIEW SECTION ── */}
                    <div className="rounded-[32px] border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-200/60">
                      <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Overview</h3>
                      <p className="text-slate-600 text-base leading-relaxed mb-8 font-medium">
                        {pkg.overview}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Duration card */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-soul-blue">
                            <Clock className="w-6 h-6 animate-pulse" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</span>
                            <span className="text-base font-black text-slate-800">{pkg.duration}</span>
                          </div>
                        </div>
                        {/* Group capacity card */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                            <Users className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Group Capacity</span>
                            <span className="text-base font-black text-slate-800">{pkg.groupSize || 'Customizable'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── PRICING CARDS ── */}
                    <div className="rounded-[32px] border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-200/60">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                          <h3 className="text-3xl font-black text-slate-900 tracking-tight">Choose Your Travel Tier</h3>
                        </div>
                        <span className="px-4 py-1.5 bg-blue-50 text-soul-blue text-[10px] font-black uppercase tracking-wider rounded-full border border-blue-100 w-fit">
                          Tailored Experiences
                        </span>
                      </div>

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

                    {/* ── VISUAL JOURNEY ── */}
                    <div className="rounded-[32px] border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-200/60">
                      <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Visual Journey</h3>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        {/* Left side: Large vertical image */}
                        <div className="md:col-span-7 h-[450px] rounded-3xl overflow-hidden shadow-md group/img relative cursor-zoom-in" onClick={() => setActiveImage(displayImages[0])}>
                          <img 
                            src={displayImages[0]} 
                            alt={`${pkg.name} view 1`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-300"></div>
                        </div>

                        {/* Right side: 3 smaller horizontal images stacked */}
                        <div className="md:col-span-5 flex flex-col gap-4 h-[450px]">
                          {[1, 2, 3].map((idx) => {
                            const imgSrc = displayImages[idx];
                            return (
                              <div 
                                key={idx} 
                                className="flex-1 rounded-2xl overflow-hidden shadow-sm group/img relative cursor-zoom-in"
                                onClick={() => setActiveImage(imgSrc)}
                              >
                                <img 
                                  src={imgSrc} 
                                  alt={`${pkg.name} view ${idx + 1}`}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-300"></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <p className="text-center text-xs text-slate-400 font-semibold mt-4">
                        Click on any image to view in full size
                      </p>
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

      {/* ── LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img 
                src={activeImage} 
                alt="Zoomed View" 
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PackageDetails;

