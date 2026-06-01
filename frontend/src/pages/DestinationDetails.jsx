import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, Clock, Phone, Check, MapPin, 
  Compass, Palmtree, Building2, Ship, Waves, Landmark, Castle,
  Info, Sparkles, Calendar, Heart, Map
} from 'lucide-react';
import { destinations } from '../data/trips';
import { API_BASE_URL } from '../config';

const IconMap = {
  Map, Palmtree, Building2, Ship, Waves, Landmark, Castle
};

const DestinationDetails = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const [countryPackages, setCountryPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countryId]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        // Filter packages for this country from DB
        const dbPackages = data.filter(pkg => pkg.countryId === countryId);
        setCountryPackages(dbPackages);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching packages:', err);
        setCountryPackages([]);
        setLoading(false);
      });
  }, [countryId]);

  const destination = destinations.find(d => d.id === countryId);

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

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h2 className="text-3xl font-black text-slate-800 mb-4">Destination Not Found</h2>
        <Link to="/" className="text-soul-blue font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-soul-blue/30 border-t-soul-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-semibold">Loading Bespoke Itineraries...</p>
        </div>
      </div>
    );
  }

  const IconComponent = IconMap[destination.icon] || Compass;

  // Curate some specific highlights based on countryId
  const getHighlights = (id) => {
    switch (id) {
      case 'dubai':
        return {
          duration: '4-5 Days',
          season: 'October to April',
          vibe: 'Modern Luxury & Adventure',
          activities: ['Burj Khalifa Visit', 'Luxury Desert Safari', 'Marina Dinner Cruise', 'Gold Souk Shopping']
        };
      case 'bali':
        return {
          duration: '6-8 Days',
          season: 'April to October',
          vibe: 'Tropical Sanctuary & Spiritual',
          activities: ['Nusa Penida Boat Tour', 'Tegalalang Rice Terraces', 'Ubud Yoga Retreats', 'Uluwatu Sunset Dance']
        };
      case 'maldives':
        return {
          duration: '4-5 Days',
          season: 'November to April',
          vibe: 'Azure Serenity & Romance',
          activities: ['Overwater Villa Stay', 'Coral Reef Snorkeling', 'Sunset Dolphin Cruise', 'Private Island Dinner']
        };
      case 'vietnam':
        return {
          duration: '6-8 Days',
          season: 'September to December',
          vibe: 'Ancient Heritage & Scenic Bays',
          activities: ['Ha Long Bay Cruise', 'Hanoi Heritage Walk', 'Lantern Boat in Hoi An', 'Sapa Rice Terrace Trek']
        };
      case 'singapore':
        return {
          duration: '4-5 Days',
          season: 'All Year Round',
          vibe: 'Future Gardens & Family Fun',
          activities: ['Gardens by the Bay', 'Universal Studios Sentosa', 'Night Safari Wildlife', 'Jewel Changi Canopy']
        };
      case 'thailand':
        return {
          duration: '5-7 Days',
          season: 'November to April',
          vibe: 'Island Hopping & Culture',
          activities: ['Phi Phi Island Speedboat', 'Bangkok Grand Palace', 'Krabi Beach Hopping', 'Phuket Night Market']
        };
      case 'turkey':
        return {
          duration: '7-9 Days',
          season: 'April to October',
          vibe: 'Ottoman Grandeur & Magic',
          activities: ['Cappadocia Cave Stay', 'Hot Air Balloon Ride', 'Blue Mosque Guided Tour', 'Bosphorus Sunset Yacht']
        };
      default:
        return {
          duration: '5-7 Days',
          season: 'Varies',
          vibe: 'Premium Exploration',
          activities: ['Sightseeing Tours', 'Cultural Immersion', 'Local Culinary Walks']
        };
    }
  };

  const highlights = getHighlights(countryId);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cinematic Full-Bleed Hero Header */}
      <section className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden bg-black">
        {/* Background Image - Sharp, Clear, High-Contrast */}
        <div className="absolute inset-0">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover opacity-90 contrast-[1.08] saturate-[1.1]"
          />
          {/* Subtle gradient overlay to ensure text contrast and premium cinematic fade at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-black/30"></div>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-28 left-6 md:left-12 z-20 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-5 py-3 rounded-2xl border border-white/20 transition-all active:scale-95 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        {/* Floating Category Icon at Top Right */}
        <div className="absolute top-28 right-6 md:right-12 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-xl">
          <IconComponent className="w-5 h-5 md:w-7 md:h-7" />
        </div>

        {/* Title & Tagline Content */}
        <div className="absolute bottom-16 left-6 md:left-16 right-6 z-10 max-w-4xl text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 bg-soul-blue/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-soul-blue/40 w-fit mb-4"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-xs font-black uppercase tracking-widest text-blue-100">Exquisite Destination</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight drop-shadow-md"
          >
            {destination.name}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-sm"
          >
            {destination.description}
          </motion.p>
        </div>
      </section>


      {/* Exquisite Curated Packages Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-3">
            Hand-Crafted <span className="text-soul-blue">{destination.name}</span> Packages
          </h2>
          <p className="text-slate-500 font-medium text-base">
            Select one of our signature luxury collections to view the detailed day-wise itinerary.
          </p>
        </div>

        {countryPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countryPackages.map((pkg) => {
              const basePrice = parseInt((pkg.price || '').toString().replace(/[^\d]/g, '')) || 0;
              const packageId = pkg._id || pkg.id;
              const displayDuration = pkg.days ? `${pkg.nights} Nights / ${pkg.days} Days` : (pkg.duration || 'Flexible');
              const displayLocation = pkg.location || getCountryName(pkg.countryId);
              const displayPrice = formatPrice(pkg.price);

              return (
                <div 
                  key={packageId} 
                  className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group relative"
                >
                  {/* Image Swiper/Top area */}
                  <div className="h-48 relative overflow-hidden bg-slate-900">
                    <Link to={`/package/${packageId}`}>
                      <img 
                        src={pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://placehold.co/600x400/png'} 
                        alt={pkg.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </Link>
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-soul-blue font-black px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider border border-white/20 shadow-md">
                      Best Seller
                    </div>

                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] text-white font-black flex items-center gap-1.5 border border-white/10 shadow-md">
                      <Star className="text-yellow-400 w-3 h-3 fill-yellow-400" /> {(pkg.rating || 5).toFixed(1)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-2 font-bold">
                      <Clock className="w-3.5 h-3.5 text-soul-blue" />
                      <span>{displayDuration}</span>
                    </div>

                    <Link to={`/package/${packageId}`}>
                      <h3 className="text-base font-black text-slate-800 mb-1 group-hover:text-soul-blue transition-colors line-clamp-1">
                        {pkg.name}
                      </h3>
                    </Link>

                    <p className="text-slate-500 text-[11px] font-semibold mb-2 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-red-500" /> {displayLocation}
                    </p>

                    <p className="text-slate-500 text-xs font-medium line-clamp-2 mb-3 leading-relaxed">
                      {pkg.overview}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex">
                      <Link 
                        to={`/package/${packageId}`}
                        style={{ backgroundColor: '#2B4A8C' }}
                        className="w-full text-center text-white font-black py-2 rounded-xl hover:opacity-90 transition-all shadow-md active:scale-95 text-xs"
                      >
                        View Details & Book
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-3xl mx-auto">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="text-lg font-black text-slate-700 mb-2">Curating Premium Experiences</h3>
            <p className="text-slate-400 font-medium text-sm max-w-sm mx-auto">
              Our travel artisans are hand-crafting new bespoke luxury itineraries for {destination.name}. Please check back shortly!
            </p>
          </div>
        )}
      </section>

    </div>
  );
};

export default DestinationDetails;
