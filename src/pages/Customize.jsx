import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Compass, Heart, Check, X, ArrowLeft, Clock, MapPin, 
  ChevronRight, Phone, Share2, Info, Star
} from 'lucide-react';
import { destinations, experiences, pricingTiers, itineraries, detailedPackages } from '../data/trips';

const Customize = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(pricingTiers[1]); // Default to Comfort Soul

  const country = destinations.find(d => d.id === countryId);
  const detailedPackage = detailedPackages.find(p => p.countryId === countryId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-black mb-6 text-slate-800">Destination not found</h2>
          <button onClick={() => navigate('/')} className="bg-soul-blue text-white px-8 py-3 rounded-xl font-bold">Back to Home</button>
        </div>
      </div>
    );
  }

  const handleExperienceSelect = (exp) => {
    setSelectedExperience(exp);
    setStep(2);
  };

  const handleBooking = () => {
    const message = `Hi TripSoul! I'm interested in the ${selectedPackage.name} for ${country.name} (${selectedExperience?.name} style).`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 bg-[#F8FAFC]">
      {/* Dynamic Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
        <button 
          onClick={() => step === 1 ? navigate('/') : setStep(1)}
          className="flex items-center gap-2 text-[10px] md:text-xs font-black text-slate-400 hover:text-soul-blue transition-colors mb-6 md:mb-8 uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> {step === 1 ? 'Change Destination' : 'Back to Selection'}
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-blue-50 text-soul-blue text-[10px] font-black uppercase tracking-widest rounded-full">
                {country.name}
              </span>
              {selectedExperience && (
                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {selectedExperience.name}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {country.name} <span className="text-soul-blue">Soul</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-black transition-all ${step === 1 ? 'bg-soul-blue text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>1</div>
            <div className="h-[2px] w-4 bg-slate-100"></div>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-black transition-all ${step === 2 ? 'bg-soul-blue text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>2</div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.section 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pb-20 px-6"
          >
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-block mb-6">
                <span className="text-xs font-black text-soul-blue uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full">Step 01</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">Who's <span className="text-soul-blue">Traveling?</span></h2>
              <p className="text-slate-500 font-medium mb-16">Select your travel style for a perfectly personalised experience</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => handleExperienceSelect(exp)}
                    className="relative aspect-[3/4] md:aspect-[3/4.5] rounded-[40px] overflow-hidden group cursor-pointer border-0 shadow-2xl hover:shadow-soul-blue/20 transition-all duration-500"
                  >
                    <img 
                      src={exp.image} 
                      alt={exp.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col items-center justify-end text-white">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-soul-blue transition-all duration-500 border border-white/30">
                        {exp.id === 'solo' && <User className="w-6 h-6 md:w-8 md:h-8" />}
                        {exp.id === 'adventure' && <Compass className="w-6 h-6 md:w-8 md:h-8" />}
                        {exp.id === 'couple' && <Heart className="w-6 h-6 md:w-8 md:h-8" />}
                      </div>
                      <span className="text-[10px] font-black text-soul-blue mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 uppercase tracking-[0.2em]">
                        {exp.tagline}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight">{exp.name}</h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {step === 2 && (
          <motion.section 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-20 px-4 md:px-6"
          >
            <div className="max-w-7xl mx-auto">
              {/* Compact Pricing Tiers at Top */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 mb-8 border-b border-slate-100">
                {pricingTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedPackage(tier)}
                    className={`min-w-[200px] md:min-w-[280px] p-6 rounded-[32px] border-2 transition-all duration-300 text-left flex flex-col justify-between ${
                      selectedPackage.id === tier.id 
                      ? 'border-soul-blue bg-white shadow-xl scale-[1.02] ring-4 ring-blue-50' 
                      : 'border-white bg-white/50 opacity-60 hover:opacity-100 hover:border-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${selectedPackage.id === tier.id ? 'text-soul-blue' : 'text-slate-400'}`}>
                          {tier.id === 'basic' ? 'Classic' : tier.id === 'medium' ? 'Comfort' : 'Luxury'}
                        </span>
                        <h3 className="text-3xl font-black text-slate-800 mt-1">{tier.price}</h3>
                        <span className="text-[10px] font-bold text-slate-400">PER PERSON</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPackage.id === tier.id ? 'border-soul-blue bg-soul-blue text-white' : 'border-slate-200'}`}>
                        {selectedPackage.id === tier.id && <Check className="w-3 h-3 font-black" />}
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-soul-blue"></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">+ 5% GST</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Itinerary Column (Left) */}
                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-12">
                      <h2 className="text-4xl font-black text-slate-900">Itinerary</h2>
                      <div className="flex items-center gap-2 text-soul-blue bg-blue-50 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                        <Clock className="w-4 h-4" /> 5 Days / 4 Nights
                      </div>
                    </div>

                    <div className="space-y-12 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                      {(detailedPackage?.itinerary || itineraries.default).map((day, i) => (
                        <div key={i} className="flex gap-8 relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all z-10 shrink-0 ${
                            i === 0 ? 'bg-soul-blue text-white shadow-lg shadow-blue-200' : 'bg-white border-2 border-slate-100 text-slate-400'
                          }`}>
                            {day.day}
                          </div>
                          <div>
                            <h4 className="text-xl md:text-2xl font-black text-slate-800 mb-3 leading-tight">{day.title}</h4>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-2xl text-sm md:text-base">
                              {day.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Column (Right) */}
                <div className="lg:col-span-4">
                  <div className="sticky top-32 space-y-6">
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden text-center">
                      <div className="mb-8 pb-8 border-b border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{selectedPackage.name} Package</span>
                        <h3 className="text-6xl font-black text-soul-blue mb-1">{selectedPackage.price}</h3>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PER PERSON</span>
                      </div>

                      <div className="space-y-6 mb-10">
                        <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                          <div className="flex items-center gap-3 uppercase tracking-tighter text-[10px] text-slate-400">
                            <Clock className="w-4 h-4 text-soul-blue" /> Duration
                          </div>
                          <span className="text-slate-900 text-sm">2 Nights / 3 Days</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                          <div className="flex items-center gap-3 uppercase tracking-tighter text-[10px] text-slate-400">
                            <User className="w-4 h-4 text-soul-blue" /> Group Size
                          </div>
                          <span className="text-slate-900 text-sm">Customizable</span>
                        </div>
                        <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                          <div className="flex items-center gap-3 uppercase tracking-tighter text-[10px] text-slate-400">
                            <Star className="w-4 h-4 text-soul-blue" /> Rating
                          </div>
                          <span className="text-slate-900 text-sm">4.5 / 5.0</span>
                        </div>
                      </div>

                      <div className="p-6 bg-orange-50 rounded-3xl mb-10 border border-orange-100 text-left">
                        <div className="flex gap-4 items-start">
                          <Phone className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                          <div>
                            <h5 className="font-black text-orange-600 text-xs mb-1 uppercase tracking-tight">Contact Our Team</h5>
                            <p className="text-[10px] text-orange-700/70 font-bold leading-relaxed">To book this package, please reach out to us directly.</p>
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={handleBooking}
                        className="w-full bg-[#00D981] hover:bg-[#00c575] text-white py-6 rounded-[24px] font-black text-xl shadow-xl shadow-green-200 transition-all active:scale-[0.98]"
                      >
                        WhatsApp Support
                      </button>
                    </div>

                    <div className="bg-[#121826] rounded-[40px] p-8 text-white relative overflow-hidden group">
                      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                      <h4 className="text-xl font-black mb-4 relative z-10">Need Help?</h4>
                      <p className="text-slate-400 text-sm font-medium mb-6 relative z-10">Chat with our experts on WhatsApp.</p>
                      <button onClick={handleBooking} className="flex items-center gap-2 text-soul-blue font-black text-xs hover:gap-4 transition-all relative z-10 uppercase tracking-widest">
                        Talk to an Expert <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Customize;
