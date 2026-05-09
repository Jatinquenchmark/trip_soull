import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Compass, Heart, Check, X, ArrowLeft, Clock, MapPin } from 'lucide-react';
import { destinations, experiences, pricingTiers, itineraries } from '../data/trips';

const Customize = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showItinerary, setShowItinerary] = useState(false);

  const country = destinations.find(d => d.id === countryId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-black mb-6 text-slate-800">Destination not found</h2>
          <button onClick={() => navigate('/')} className="bg-thrill-orange text-white px-8 py-3 rounded-xl font-bold">Back to Home</button>
        </div>
      </div>
    );
  }

  const handleExperienceSelect = (exp) => {
    setSelectedExperience(exp);
    setStep(2);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowItinerary(true);
  };

  return (
    <div className="min-h-screen pt-32 bg-white">
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <button 
          onClick={() => step === 1 ? navigate('/') : setStep(1)}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-thrill-orange transition-colors mb-8 uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> {step === 1 ? 'Change Destination' : 'Back to Styles'}
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
          <div>
            <span className="text-xs font-black text-thrill-orange mb-3 block uppercase tracking-[0.2em]">
              Personalising Your Journey
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight">
              {country.name} <span className="text-thrill-orange">Soul</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${step >= 1 ? 'bg-thrill-orange text-white shadow-lg shadow-orange-200' : 'bg-slate-100 text-slate-400'}`}>1</div>
              <span className={`text-sm font-bold ${step === 1 ? 'text-slate-800' : 'text-slate-400'}`}>Style</span>
            </div>
            <div className="h-[2px] w-8 bg-slate-100"></div>
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${step >= 2 ? 'bg-thrill-orange text-white shadow-lg shadow-orange-200' : 'bg-slate-100 text-slate-400'}`}>2</div>
              <span className={`text-sm font-bold ${step === 2 ? 'text-slate-800' : 'text-slate-400'}`}>Tier</span>
            </div>
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
            className="py-12 px-6"
          >
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-black mb-16 text-slate-800">Who's <span className="text-thrill-orange text-5xl">Traveling?</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {experiences.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => handleExperienceSelect(exp)}
                    className="relative aspect-[3/4.5] rounded-[32px] overflow-hidden group cursor-pointer border-0 shadow-2xl"
                  >
                    <img 
                      src={exp.image} 
                      alt={exp.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="absolute inset-0 p-10 flex flex-col items-center justify-end text-white">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-thrill-orange transition-all duration-500">
                        {exp.id === 'solo' && <User className="w-8 h-8" />}
                        {exp.id === 'adventure' && <Compass className="w-8 h-8" />}
                        {exp.id === 'couple' && <Heart className="w-8 h-8" />}
                      </div>
                      <span className="text-xs font-black text-thrill-orange mb-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 uppercase tracking-widest">
                        {exp.tagline}
                      </span>
                      <h3 className="text-3xl font-black tracking-tight">{exp.name}</h3>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-12 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black mb-4 text-slate-800">Select your <span className="text-thrill-orange">Tier</span></h2>
                <p className="text-slate-500 text-lg font-medium tracking-tight">Luxury {selectedExperience?.name} trip to {country.name}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingTiers.map((tier) => (
                  <div key={tier.id} className={`p-12 border border-slate-100 rounded-[32px] flex flex-col transition-all duration-500 hover:shadow-2xl relative overflow-hidden ${tier.id === 'medium' ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10' : 'bg-white'}`}>
                    {tier.id === 'medium' && (
                      <div className="absolute top-0 right-0 bg-thrill-orange text-white text-[10px] uppercase font-black px-5 py-2.5 rounded-bl-2xl">
                        Best Seller
                      </div>
                    )}
                    
                    <h3 className="text-3xl font-black mb-6">{tier.name}</h3>
                    <div className="text-5xl font-black text-thrill-orange mb-10">{tier.price} <span className="text-xs font-bold text-slate-400 block mt-2">/ PERSON</span></div>
                    
                    <div className="w-full h-px bg-slate-100/10 mb-10"></div>
                    
                    <ul className="space-y-6 mb-16 flex-grow">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm font-bold opacity-80">
                          <Check className="w-5 h-5 text-green-500 shrink-0" /> {feature}
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={() => handlePackageSelect(tier)}
                      className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${tier.id === 'medium' ? 'bg-thrill-orange text-white shadow-xl shadow-orange-900/20' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'}`}
                    >
                      View Itinerary
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Itinerary Modal */}
      <AnimatePresence>
        {showItinerary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-7xl max-h-[90vh] overflow-hidden bg-white rounded-[40px] shadow-2xl relative flex flex-col"
            >
              <button 
                onClick={() => setShowItinerary(false)}
                className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white hover:text-slate-800 text-white transition-all z-50 shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex-grow overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                  {/* Left Column - Image & Quick Info */}
                  <div className="lg:col-span-2 relative min-h-[400px]">
                    <img src={country.image} alt={country.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                      <span className="text-xs font-black text-thrill-orange mb-4 block uppercase tracking-widest">Selected Journey</span>
                      <h2 className="text-5xl font-black mb-8 leading-tight">{country.name} <br /><span className="text-thrill-orange">{selectedPackage?.name}</span></h2>
                      <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-thrill-orange" />
                          <span className="text-sm font-bold">5 Days / 4 Nights</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-thrill-orange" />
                          <span className="text-sm font-bold capitalize">{selectedExperience?.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Itinerary & Booking */}
                  <div className="lg:col-span-3 p-12 md:p-20 bg-white">
                    <div className="space-y-12">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-10">
                        <div>
                          <h3 className="text-3xl font-black text-slate-800">Trip Itinerary</h3>
                          <p className="text-slate-500 font-medium">Day-by-day plan for your soul journey</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-slate-400 block uppercase">Total Cost</span>
                          <span className="text-4xl font-black text-thrill-orange">{selectedPackage?.price}</span>
                        </div>
                      </div>

                      <div className="space-y-10">
                        {itineraries.default.map((day, i) => (
                          <div key={i} className="flex gap-8 group">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 bg-orange-50 text-thrill-orange rounded-xl flex items-center justify-center font-black group-hover:bg-thrill-orange group-hover:text-white transition-all">
                                {day.day}
                              </div>
                              {i !== itineraries.default.length - 1 && <div className="w-0.5 h-full bg-slate-50 mt-4"></div>}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold mb-3 text-slate-800">{day.title}</h4>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">{day.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-10 flex gap-6">
                        <button className="flex-grow bg-thrill-orange text-white py-6 rounded-[20px] font-black text-xl shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all active:scale-95">
                          Confirm & Book Now
                        </button>
                        <button 
                          onClick={() => setShowItinerary(false)}
                          className="px-10 bg-slate-50 text-slate-800 py-6 rounded-[20px] font-black hover:bg-slate-100 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Customize;
