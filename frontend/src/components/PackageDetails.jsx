import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Users, MapPin, Star, Check, X, ArrowLeft, Phone, 
  MessageCircle, User, Heart, Compass, Info, ChevronRight, ChevronDown, ChevronUp 
} from 'lucide-react';
import { destinations, experiences, pricingTiers } from '../data/trips';
import { API_BASE_URL } from '../config';
import PackagesSection from './PackagesSection';
import { loadRazorpayScript } from '../utils/loadRazorpay';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedExp, setSelectedExp] = useState(null);
  const [pkgTiers, setPkgTiers] = useState(pricingTiers);
  const [selectedTier, setSelectedTier] = useState(pricingTiers[1]);
  const [activeImage, setActiveImage] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);
  const { user, isAuthenticated } = useAuth();

  const availableExperiences = experiences.filter(exp => {
    if (pkg && pkg.experiences) {
      const hasAnyStyleChecked = Object.keys(pkg.experiences).some(k => {
        const item = pkg.experiences[k];
        return typeof item === 'object' ? item.active === true : item === true;
      });
      if (hasAnyStyleChecked) {
        const item = pkg.experiences[exp.id];
        return typeof item === 'object' ? item.active !== false : item !== false;
      }
    }
    return true;
  });

  const activeOverview = (selectedExp && pkg?.experiences?.[selectedExp.id]?.overview)
    ? pkg.experiences[selectedExp.id].overview
    : (pkg?.overview || '');

  const activeItinerary = (selectedExp && pkg?.experiences?.[selectedExp.id]?.itinerary && pkg.experiences[selectedExp.id].itinerary.length > 0)
    ? pkg.experiences[selectedExp.id].itinerary
    : (pkg?.itinerary || []);

  const getCountryName = (cid) => {
    const dest = destinations.find(d => d.id === cid);
    return dest ? dest.name : cid;
  };

  const formatPrice = (price) => {
    if (!price) return '₹0';
    const clean = price.toString().replace(/[^\d]/g, '');
    if (!clean) return price;
    return `₹${parseInt(clean).toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/packages/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found in DB');
        return res.json();
      })
      .then(data => {
        setPkg(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching package details:', err);
        setPkg(null);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (pkg) {
      const activePricingSource = (selectedExp && pkg.experiences?.[selectedExp.id]?.pricingTiers && (pkg.experiences[selectedExp.id].pricingTiers.essential || pkg.experiences[selectedExp.id].pricingTiers.comfort || pkg.experiences[selectedExp.id].pricingTiers.luxury)) 
        ? pkg.experiences[selectedExp.id].pricingTiers 
        : pkg.pricingTiers;

      const dynamicTiers = pricingTiers.map(tier => {
        let price = tier.price;
        if (activePricingSource) {
          if (tier.id === 'basic' && activePricingSource.essential) price = formatPrice(activePricingSource.essential);
          if (tier.id === 'medium' && activePricingSource.comfort) price = formatPrice(activePricingSource.comfort);
          if (tier.id === 'luxury' && activePricingSource.luxury) price = formatPrice(activePricingSource.luxury);
        }
        return { ...tier, price };
      });
      setPkgTiers(dynamicTiers);
      
      // Parse query parameter for initial tier selection
      const params = new URLSearchParams(window.location.search);
      const tierParam = params.get('tier');
      if (tierParam) {
        const foundTier = dynamicTiers.find(t => t.id === tierParam);
        if (foundTier) {
          setSelectedTier(foundTier);
          return;
        }
      }
      setSelectedTier(dynamicTiers[1]); // Default to Comfort Soul
    }
  }, [pkg, selectedExp]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const defaultTravelImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=70',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=70',
  ];

  const displayImages = pkg ? [
    pkg.images?.[0] || defaultTravelImages[0],
    pkg.images?.[1] || pkg.images?.[0] || defaultTravelImages[1],
    pkg.images?.[2] || pkg.images?.[0] || defaultTravelImages[2],
    pkg.images?.[3] || pkg.images?.[0] || defaultTravelImages[3],
  ] : defaultTravelImages;

  const handleExpSelect = (exp) => {
    setSelectedExp(exp);
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) setSelectedExp(null);
    } else {
      navigate(-1);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a package!');
      navigate('/login');
      return;
    }

    if (!pkg) {
      toast.error('Package details missing.');
      return;
    }

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    toast.loading('Initiating payment...', { id: 'payment-toast' });

    const payload = {
      packageId: pkg._id || pkg.id,
      tierId: selectedTier?.id || 'medium',
      experienceId: selectedExp?.id || null
    };

    try {
      const orderRes = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const orderData = await orderRes.json();
      
      if (!orderData.success) {
        toast.error(orderData.message || 'Failed to create order', { id: 'payment-toast' });
        return;
      }

      toast.dismiss('payment-toast');

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_T7O9Ow7E7T4SLi', 
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Trip Soul',
        description: `Booking: ${pkg.name} - ${selectedTier?.name}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          toast.loading('Verifying payment...', { id: 'verify-toast' });
          const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            toast.success('Payment successful! Booking confirmed.', { id: 'verify-toast' });
            // Optionally redirect to bookings page
            navigate('/bookings');
          } else {
            toast.error('Payment verification failed!', { id: 'verify-toast' });
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#2B4A8C'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
      paymentObject.on('payment.failed', function (response) {
        toast.error('Payment Failed or Cancelled');
      });

    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!', { id: 'payment-toast' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-soul-blue/30 border-t-soul-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold">Loading Itinerary...</p>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h2 className="text-3xl font-black text-slate-800 mb-4">Package Not Found</h2>
        <Link to="/" className="text-soul-blue font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] relative pb-12">
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
          <div className="absolute inset-x-0 bottom-4 md:bottom-12 px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto text-white flex flex-col justify-end h-full pb-4 z-10">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="px-3 md:px-3.5 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full">
                {pkg.location || getCountryName(pkg.countryId)}
              </span>
              <span className="px-3 md:px-3.5 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full">
                {selectedExp ? selectedExp.name : 'Premium'}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl text-white">
              {pkg.name} <span className="font-serif italic text-blue-300 font-normal block sm:inline mt-1 sm:mt-0">Soul Journey</span>
            </h2>
          </div>
        </div>
      )}

      {/* Luxury Navigation Bar */}
      <div className="relative z-40 pt-20 md:pt-28 px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center">
        <button 
          onClick={handleBack}
          className="group flex items-center justify-center gap-2 md:gap-4 px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-white/20 shadow-sm transition-all duration-500 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 w-full md:w-auto"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explore Others</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 md:gap-3 p-1.5 rounded-full border border-white/10 shadow-sm transition-all duration-500 bg-white/10 backdrop-blur-md w-full md:w-auto">
          <div className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all duration-500 ${
            step === 1 
              ? 'bg-soul-blue text-white shadow-xl shadow-soul-blue/30' 
              : 'text-white/40'
          }`}>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap">01 Selection</span>
          </div>
          <div className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all duration-500 ${
            step === 2 
              ? 'bg-white text-slate-900 shadow-xl shadow-white/10' 
              : 'text-white/40'
          }`}>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap">02 Itinerary</span>
          </div>
        </div>
      </div>



      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 mt-6 md:mt-0">
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
              <h2 className="text-4xl md:text-7xl font-black mb-4 text-white tracking-tighter">
                {pkg.name.split(' ')[0]} <span className="text-blue-300 italic serif font-normal block sm:inline">{pkg.name.split(' ')[1] || 'Soul'}</span>
              </h2>
              <p className="text-slate-300 font-medium mb-12">Select your travel style for a perfectly personalised experience</p>
              
              <div className={`grid grid-cols-1 ${
                availableExperiences.length === 2 
                  ? 'md:grid-cols-2 max-w-4xl' 
                  : availableExperiences.length === 1 
                    ? 'md:grid-cols-1 max-w-md' 
                    : 'md:grid-cols-3 max-w-7xl'
              } gap-10 mx-auto pb-24`}>
                {availableExperiences.map((exp, idx) => (
                  <button
                    key={exp.id}
                    onClick={() => handleExpSelect(exp)}
                    className="group bg-white rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/60 hover:shadow-soul-blue/15 transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col text-left w-full max-w-sm mx-auto md:max-w-none"
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

              {/* Available Tiers Section */}
              <div className="mt-8 mb-12 border-t border-white/20 pt-16 relative z-20">
                <div className="text-left mb-10">
                  <h3 className="text-3xl font-black text-white tracking-tight">Available Travel Tiers</h3>
                  <p className="text-slate-300 mt-2 text-lg">Explore different premium tier options for <span className="capitalize text-white font-semibold">{pkg.name}</span></p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pkgTiers.map((tier) => {
                    return (
                      <div 
                        key={tier.id} 
                        onClick={() => {
                          setSelectedTier(tier);
                          handleExpSelect(availableExperiences[0]);
                        }}
                        className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group relative cursor-pointer"
                      >
                        <div className="h-48 relative overflow-hidden bg-slate-900">
                          <img 
                            src={pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://placehold.co/600x400/png'} 
                            alt={pkg.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-soul-blue font-black px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider border border-white/20 shadow-md">
                            {tier.name} Soul
                          </div>
                          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] text-white font-black flex items-center gap-1.5 border border-white/10 shadow-md">
                            <Star className="text-yellow-400 w-3 h-3 fill-yellow-400" /> {(pkg.rating || 5).toFixed(1)}
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-2 font-bold">
                            <Clock className="w-3.5 h-3.5 text-soul-blue" />
                            <span>{pkg.days ? `${pkg.nights} Nights / ${pkg.days} Days` : (pkg.duration || 'Flexible')}</span>
                          </div>

                          <h3 className="text-base font-black text-slate-800 mb-1 group-hover:text-soul-blue transition-colors line-clamp-1">
                            {pkg.name} - {tier.name}
                          </h3>

                          <p className="text-slate-500 text-[11px] font-semibold mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-red-500" /> {pkg.location || getCountryName(pkg.countryId)}
                          </p>

                          <div className="mt-2 mb-4 bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{tier.name} Tier Price</span>
                            <span className="block text-lg font-black text-slate-800">{tier.price} <span className="text-[10px] text-slate-400 font-medium lowercase">per person</span></span>
                          </div>

                          <div className="mt-auto pt-3 border-t border-slate-100 flex">
                            <button 
                              onClick={() => {
                                setSelectedTier(tier);
                                handleExpSelect(availableExperiences[0]);
                              }}
                              style={{ backgroundColor: '#2B4A8C' }}
                              className="w-full text-center text-white font-black py-2 rounded-xl hover:opacity-90 transition-all shadow-md active:scale-95 text-xs"
                            >
                              Select & Customize
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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

              <div className="relative z-10 px-4 md:px-8 lg:px-16 pb-20 md:pb-40 max-w-[1600px] mx-auto -mt-16 md:-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">

                  {/* ── LEFT COLUMN ── */}
                  <div className="lg:col-span-8 space-y-8">

                    {/* Section Header */}
                    <div className="mb-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-8 bg-soul-blue/40"></div>
                        <span className="text-[10px] font-black text-soul-blue uppercase tracking-[0.5em]">Step 02 · Customize Journey</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Your Travel <br className="md:hidden" /><span className="font-serif italic text-soul-blue">Blueprint</span></h2>
                    </div>

                    {/* ── OVERVIEW SECTION ── */}
                    <div className="rounded-[24px] md:rounded-[32px] border border-slate-200 bg-white p-6 md:p-10 shadow-xl shadow-slate-200/60">
                      <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Overview</h3>
                      <p className="text-slate-600 text-base leading-relaxed mb-8 font-medium">
                        {activeOverview}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Duration card */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-soul-blue">
                            <Clock className="w-6 h-6 animate-pulse" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</span>
                            <span className="text-base font-black text-slate-800">{pkg.days ? `${pkg.nights} Nights / ${pkg.days} Days` : (pkg.duration || 'Flexible')}</span>
                          </div>
                        </div>
                        {/* Group capacity card */}
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                            <Users className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Group Capacity</span>
                            <span className="text-base font-black text-slate-800">{pkg.groupCapacity || pkg.groupSize || 'Customizable'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── PRICING CARDS ── */}
                    <div className="rounded-[24px] md:rounded-[32px] border border-slate-200 bg-white p-6 md:p-10 shadow-xl shadow-slate-200/60">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Choose Your Travel Tier</h3>
                        </div>
                        <span className="px-4 py-1.5 bg-blue-50 text-soul-blue text-[10px] font-black uppercase tracking-wider rounded-full border border-blue-100 w-fit">
                          Tailored Experiences
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {pkgTiers.map((tier, idx) => {
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

                    {/* ── ITINERARY (Vibrant Highlighted Accordion) ── */}
                    <div className="mb-20 mt-16 max-w-5xl mx-auto bg-white rounded-[40px] shadow-[0_10px_40px_rgb(43,74,140,0.08)] border border-blue-50/50 p-6 md:p-12 relative overflow-hidden">
                      {/* Decorative background elements */}
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100/40 to-orange-50/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 z-0 pointer-events-none"></div>

                      <div className="relative z-10 text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-soul-blue text-xs font-black uppercase tracking-widest border border-blue-100 shadow-sm mb-6">
                          <Compass className="w-4 h-4" /> The Masterplan
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                          Your Exclusive <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-soul-blue to-purple-600">Day-by-Day Journey</span>
                        </h3>
                      </div>

                      <div className="relative z-10">
                        {/* Timeline background line */}
                        <div className="absolute left-6 md:left-[3.25rem] top-8 bottom-12 w-[3px] bg-gradient-to-b from-soul-blue/20 via-soul-blue/10 to-transparent rounded-full"></div>

                        <div className="space-y-10">
                          {activeItinerary?.map((day, i) => {
                            const isExpanded = expandedDay === i;
                            return (
                              <div key={i} className="relative pl-12 md:pl-24">
                                {/* Glowing Timeline Dot */}
                                <div className="absolute left-[13px] md:left-[35px] top-8 w-6 h-6 rounded-full border-[5px] border-white shadow-lg z-10 bg-soul-blue">
                                  <div className="absolute inset-0 rounded-full animate-ping bg-soul-blue/30"></div>
                                </div>

                                {/* Main Card Container (Accordion) */}
                                <div className="rounded-3xl border border-soul-blue/20 bg-white shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 overflow-hidden">
                                  {/* Header */}
                                  <div 
                                    className="p-6 md:p-8 flex items-center justify-between gap-4 cursor-pointer"
                                    onClick={() => setExpandedDay(isExpanded ? null : i)}
                                  >
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 flex-1">
                                      {/* Bright Day Badge */}
                                      <div className="shrink-0 px-5 py-3 rounded-2xl text-center font-black bg-gradient-to-br from-soul-blue to-blue-600 text-white shadow-xl shadow-blue-200">
                                        <span className="block text-[11px] uppercase tracking-widest opacity-90 mb-1">Day</span>
                                        <span className="block text-2xl leading-none">{i + 1}</span>
                                      </div>
                                      
                                      <div className="flex-1">
                                        <h4 className="text-xl md:text-2xl font-bold text-soul-blue">
                                          {day.title}
                                        </h4>
                                        <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-widest">{day.date || 'Scheduled Experience'}</p>
                                      </div>
                                    </div>
                                    <div className="w-10 h-10 shrink-0 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-soul-blue transition-colors">
                                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="p-6 md:p-8 pt-0 md:pt-0">
                                          {/* Divider */}
                                          <div className="h-px w-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 mb-8"></div>
                                          
                                          {/* Pace Tag */}
                                          {day.pace && (
                                            <div className="mb-6 flex gap-2">
                                              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                                {day.pace} Pace
                                              </span>
                                            </div>
                                          )}

                                          {/* Description Points */}
                                          <div className="space-y-4 mb-8">
                                            {day.description.split('\n').filter(line => line.trim()).map((line, idx) => (
                                              <div key={idx} className="flex gap-4 items-start bg-slate-50/50 p-4 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-colors">
                                                <div className="w-7 h-7 rounded-full bg-white border border-blue-100 shadow-sm flex items-center justify-center shrink-0 text-soul-blue mt-0.5">
                                                  <Check className="w-4 h-4" />
                                                </div>
                                                <p className="text-slate-600 text-base leading-relaxed pt-0.5">{line.replace(/^- /, '')}</p>
                                              </div>
                                            ))}
                                          </div>

                                          {/* Highlight Box */}
                                          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 relative overflow-hidden shadow-sm">
                                            {/* Decorative icon background */}
                                            <Star className="absolute -right-6 -bottom-6 w-32 h-32 text-orange-200/40 rotate-12" />
                                            <div className="relative z-10 flex gap-5 items-start">
                                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg shadow-orange-200 flex items-center justify-center shrink-0">
                                                <Star className="w-6 h-6 fill-white" />
                                              </div>
                                              <div>
                                                <span className="block text-xs font-black text-orange-800 uppercase tracking-[0.2em] mb-2">Special Highlight</span>
                                                <p className="text-slate-700 text-[15px] font-medium leading-relaxed">
                                                  {day.whyThisWorks || "Experience the absolute best of the destination with thoughtfully planned moments of magic and comfort."}
                                                </p>
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
                          })}
                        </div>
                      </div>
                    </div>

                    {/* ── VISUAL JOURNEY ── */}
                    <div className="rounded-[24px] md:rounded-[32px] border border-slate-200 bg-white p-6 md:p-10 shadow-xl shadow-slate-200/60">
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
                  <div className="lg:col-span-4 lg:sticky lg:top-40 z-20 self-start space-y-6">
                    {/* Glowing Offer Badge */}
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-[24px] p-4 text-white shadow-lg shadow-orange-500/30 flex items-center justify-between animate-pulse-slow relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                          <Star className="w-5 h-5 fill-white text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-orange-100">Limited Time Offer</p>
                          <p className="text-sm font-bold">Free Premium Photoshoot</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[24px] md:rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-2xl shadow-slate-200/70">
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
                          { label: 'Destination', value: pkg.location || getCountryName(pkg.countryId) },
                          { label: 'Travel Style', value: selectedExp?.name || 'Luxury' },
                          { label: 'Duration', value: pkg.days ? `${pkg.nights} Nights / ${pkg.days} Days` : (pkg.duration || 'Flexible') }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                            <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide">{item.value}</span>
                          </div>
                        ))}

                        <div className="h-[1px] w-full bg-slate-100"></div>

                        <button
                          onClick={handleBooking}
                          className="group w-full relative overflow-hidden bg-soul-blue text-white py-5 rounded-2xl font-black text-sm tracking-wider transition-all hover:bg-slate-900 hover:shadow-2xl hover:shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          <span className="relative z-10">Pay & Book Now</span>
                          <Check className="w-5 h-5 relative z-10" />
                        </button>

                        <div className="flex flex-col gap-4">
                          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 border border-green-100">
                            <Check className="w-4 h-4 shrink-0 text-green-600" />
                            <p className="text-xs font-bold">100% Fully Customizable Itinerary</p>
                          </div>
                          <div className="bg-blue-50 text-soul-blue px-4 py-3 rounded-xl flex items-center gap-3 border border-blue-100">
                            <Phone className="w-4 h-4 shrink-0 text-soul-blue" />
                            <p className="text-xs font-bold">24/7 Dedicated Trip Concierge</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-center gap-3">
                            <div className="flex -space-x-2">
                              {[1,2,3,4].map(n => (
                                <div key={n} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                                  <img src={`https://i.pravatar.cc/100?u=trip${n+10}`} alt="" className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[11px] text-slate-800 font-bold">Highly Popular</span>
                              <span className="text-[10px] text-slate-400 font-medium">120+ booked this month</span>
                            </div>
                          </div>
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

