import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, MapPin, Star, Check, X, ArrowLeft, Phone, MessageCircle, User, Heart, Compass } from 'lucide-react';
import { detailedPackages, experiences, pricingTiers } from '../data/trips';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = detailedPackages.find(p => p.id === id) || detailedPackages[0];
  
  const [step, setStep] = useState(1);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExpSelect = (exp) => {
    setSelectedExp(exp);
    setStep(2);
  };

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    setStep(3);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) setSelectedExp(null);
      if (step === 3) setSelectedTier(null);
    } else {
      navigate('/');
    }
  };

  const resetSelection = () => {
    setStep(1);
    setSelectedExp(null);
    setSelectedTier(null);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Fixed Back Button */}
      <button 
        onClick={handleBack}
        className="fixed top-24 left-8 z-[100] group flex items-center gap-4 bg-white p-2 pr-6 rounded-full border border-slate-200 hover:border-soul-blue transition-all shadow-xl"
      >
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-soul-blue transition-colors">
          <ArrowLeft className="w-5 h-5 text-soul-blue group-hover:text-white" />
        </div>
        <span className="text-xs font-bold text-soul-blue/80">
          {step > 1 ? 'Go Back' : 'All Packages'}
        </span>
      </button>

      {/* Hero Section */}
      <section className="h-[60vh] relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={pkg.images[0]} 
          alt={pkg.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-20 left-0 right-0 z-10 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <div className="flex items-center gap-3 text-white mb-4">
              <div style={{ backgroundColor: '#2B4A8C' }} className="flex items-center gap-1 px-3 py-1 rounded text-xs font-bold">
                <Star className="w-3 h-3 fill-white" /> {pkg.rating || '4.5'}
              </div>
              <span className="text-sm font-bold opacity-90">{pkg.duration}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
              {pkg.name}
            </h1>
            <p className="text-white/90 text-xl font-medium max-w-3xl">{pkg.tagline}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12 relative z-20">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="exp-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[32px] p-12 shadow-2xl border border-slate-100 text-center"
            >
              <h3 className="text-3xl md:text-4xl font-black mb-4 text-slate-800">Who's <span className="text-soul-blue">Traveling?</span></h3>
              <p className="text-slate-500 text-lg font-medium mb-12">Select your travel style for a perfectly personalised experience</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {experiences.map((exp) => (
                  <motion.div 
                    key={exp.id}
                    whileHover={{ y: -10 }}
                    onClick={() => handleExpSelect(exp)}
                    className="relative h-[400px] rounded-3xl overflow-hidden cursor-pointer group shadow-lg"
                  >
                    <img src={exp.image} alt={exp.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    <div className="absolute inset-0 p-8 flex flex-col items-center justify-end text-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 group-hover:bg-soul-blue transition-all duration-500">
                        {exp.icon === 'User' && <User className="w-7 h-7 text-white" />}
                        {exp.icon === 'Heart' && <Heart className="w-7 h-7 text-white" />}
                        {exp.icon === 'Compass' && <Compass className="w-7 h-7 text-white" />}
                      </div>
                      <h4 className="text-2xl font-black text-white">{exp.name}</h4>
                      <p className="text-white/60 text-xs mt-2 font-bold uppercase tracking-widest">{exp.tagline}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="tier-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[32px] p-12 shadow-2xl border border-slate-100 text-center"
            >
              <h3 className="text-3xl md:text-4xl font-black mb-4 text-slate-800">Choose Your <span className="text-soul-blue">Comfort</span></h3>
              <p className="text-slate-500 text-lg font-medium mb-12">Pick a pricing tier that fits your soul</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingTiers.map((tier) => (
                  <motion.div 
                    key={tier.id}
                    whileHover={{ y: -8 }}
                    onClick={() => handleTierSelect(tier)}
                    className="p-10 rounded-3xl border-2 border-slate-50 hover:border-soul-blue bg-white hover:shadow-xl transition-all duration-500 cursor-pointer group text-left"
                  >
                    <span className="text-xs font-black text-soul-blue mb-4 block uppercase tracking-widest">{tier.name}</span>
                    <h4 className="text-4xl font-black mb-8 text-soul-blue">{tier.price}</h4>
                    <div className="space-y-4 mb-10">
                      {tier.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="w-full bg-slate-50 group-hover:bg-soul-blue group-hover:text-white py-4 rounded-xl text-center font-bold text-slate-500 transition-all">
                      Choose {tier.name}
                    </div>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-12 text-sm font-bold text-slate-400 hover:text-soul-blue transition-all uppercase tracking-widest">← Back to Styles</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="final-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              <div className="lg:col-span-2 space-y-12">
                <div className="bg-slate-900 rounded-[32px] p-8 flex items-center justify-between shadow-xl relative overflow-hidden">
                  <div className="flex gap-12 relative z-10">
                    <div>
                      <span className="text-[10px] uppercase font-black text-slate-500 block mb-1">Experience</span>
                      <span className="text-lg font-bold text-white">{selectedExp?.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-black text-slate-500 block mb-1">Tier</span>
                      <span className="text-lg font-bold text-soul-blue">{selectedTier?.name}</span>
                    </div>
                  </div>
                  <button onClick={resetSelection} className="text-xs font-bold text-white/60 hover:text-white border-b border-white/20 pb-1">Change Choices</button>
                </div>

                <div className="bg-white rounded-[32px] p-12 shadow-lg border border-slate-50">
                  <h3 className="text-3xl font-black mb-8 text-slate-800">Journey Overview</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">{pkg.overview}</p>
                </div>

                <div className="bg-white rounded-[32px] p-12 shadow-lg border border-slate-50">
                  <h3 className="text-3xl font-black mb-12 text-slate-800">Your Itinerary</h3>
                  <div className="space-y-10">
                    {pkg.itinerary.map((day, i) => (
                      <div key={i} className="flex gap-8 group">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-blue-50 text-soul-blue rounded-2xl flex items-center justify-center text-lg font-black shrink-0 group-hover:bg-soul-blue group-hover:text-white transition-all">
                            {day.day}
                          </div>
                          {i !== pkg.itinerary.length - 1 && <div className="w-[2px] h-full bg-slate-50 mt-4"></div>}
                        </div>
                        <div className="pb-8">
                          <h4 className="text-xl font-bold mb-4 text-soul-blue">{day.title}</h4>
                          <p className="text-slate-500 leading-relaxed font-medium">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[32px] p-12 shadow-lg border border-slate-50">
                  <h3 className="text-3xl font-black mb-10 text-slate-800">Trip Gallery</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {pkg.images.map((img, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 0.98 }}
                        className={`overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 h-[450px]' : 'h-64'}`}
                      >
                        <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-white rounded-[32px] p-10 shadow-2xl border border-slate-50 text-center relative overflow-hidden">
                    <div style={{ backgroundColor: '#2B4A8C' }} className="absolute top-0 left-0 w-full h-2"></div>
                    <span className="text-xs font-black text-slate-400 mb-2 block uppercase tracking-widest">Total Investment</span>
                    <h4 className="text-5xl font-black text-slate-800 mb-2">{selectedTier?.price}</h4>
                    <span className="text-xs font-bold text-soul-blue block mb-10">/ Person All Inclusive</span>
                    
                    <button 
                      style={{ backgroundColor: '#2B4A8C' }}
                      className="w-full text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:opacity-90 transition-all mb-6 active:scale-95"
                    >
                      Reserve My Spot
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-50">
                      <div className="flex flex-col items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase">GST Included</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase">Free Cancel</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-[32px] p-8 border border-green-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg mb-4">
                      <MessageCircle className="w-8 h-8 text-green-500 fill-green-500/10" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-1">Expert Advice?</h4>
                    <p className="text-sm text-slate-500 font-medium mb-6">Chat with our destination expert on WhatsApp</p>
                    <button className="w-full bg-[#25D366] text-white py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-green-600 transition-all">
                      Chat on WhatsApp
                    </button>
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
