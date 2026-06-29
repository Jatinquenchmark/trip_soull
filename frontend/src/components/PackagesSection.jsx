import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Clock, MapPin, Compass, Heart } from 'lucide-react';
import { destinations } from '../data/trips';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PackagesSection = ({ selectedCountryId, searchQuery, limit = 6, showViewAll = true, excludePackageId = null, title = null, hideHeader = false, className = "py-20 px-6 bg-[#F8F9FA]", headerColor = "text-slate-800" }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated, fetchWithAuth } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/user/wishlist`);
      if (res.ok) {
        const data = await res.json();
        setWishlist(data.map(item => item._id || item));
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    }
  };

  const handleWishlistToggle = async (e, packageId) => {
    e.preventDefault(); // Prevent navigating to package details
    e.stopPropagation(); // Stop event bubbling
    
    if (!isAuthenticated) {
      toast.error('Please login to save packages to wishlist');
      return;
    }
    
    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/api/user/wishlist/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId })
      });
      if (res.ok) {
        if (wishlist.includes(packageId)) {
          setWishlist(wishlist.filter(id => id !== packageId));
          toast.success('Removed from wishlist');
        } else {
          setWishlist([...wishlist, packageId]);
          toast.success('Added to wishlist');
        }
      } else {
        const errData = await res.json();
        console.error('Wishlist toggle error:', errData);
        toast.error(errData.message || 'Failed to update wishlist');
      }
    } catch (err) {
      console.error('Network error during wishlist toggle:', err);
      toast.error('Network error while updating wishlist');
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching packages:', err);
        setLoading(false);
      });
  }, []);

  const getCountryName = (cid) => {
    const dest = destinations.find(d => d.id === cid);
    return dest ? dest.name : cid;
  };

  let filteredPackages = packages;

  if (excludePackageId) {
    filteredPackages = filteredPackages.filter(pkg => (pkg._id || pkg.id) !== excludePackageId);
  }

  if (selectedCountryId) {
    const countryPackages = filteredPackages.filter(pkg => pkg.countryId === selectedCountryId);
    if (countryPackages.length > 0) {
      filteredPackages = countryPackages;
    }
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPackages = filteredPackages.filter(pkg => 
      pkg.name.toLowerCase().includes(query) || 
      pkg.countryId.toLowerCase().includes(query)
    );
  } else {
    filteredPackages = filteredPackages.slice(0, limit);
  }

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading packages...</div>;
  }

  return (
    <section id="packages" className={className}>
      <div className="max-w-7xl mx-auto">
        {!hideHeader && (
          <div className="flex items-center justify-between mb-12">
            <h2 className={`text-3xl font-bold capitalize ${headerColor}`}>
              {title || (searchQuery ? `Search Results for "${searchQuery}"` : selectedCountryId ? `${selectedCountryId} Packages` : 'Top Collections')}
            </h2>
            {showViewAll && !selectedCountryId && (
              <Link to="/packages" className="text-soul-blue font-bold flex items-center gap-2 hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => {
              const packageId = pkg._id || pkg.id;
              const displayDuration = pkg.days ? `${pkg.nights} Nights / ${pkg.days} Days` : (pkg.duration || 'Flexible');
              const displayLocation = pkg.location || getCountryName(pkg.countryId);

              return (
                <div 
                  key={packageId} 
                  className="bg-white rounded-[40px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-shadow flex flex-col group relative"
                >
                  {/* Image Container */}
                  <div className="relative h-[280px] w-full rounded-[32px] overflow-hidden">
                    <img 
                      src={pkg.images && pkg.images.length > 0 ? pkg.images[0] : 'https://placehold.co/600x400/png'} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    
                    {/* Dark Gradient at bottom for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

                    {/* Top Right Badges */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center shadow-sm">
                        Best Seller
                      </div>
                      <button 
                        onClick={(e) => handleWishlistToggle(e, packageId)}
                        className="bg-white/90 backdrop-blur-md p-1.5 rounded-full hover:bg-white transition-colors shadow-sm"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(packageId) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                      </button>
                    </div>

                    {/* Bottom Content (Inside Image) */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end gap-2">
                      <div className="flex-1">
                        <h3 className="text-white text-lg font-bold leading-tight mb-1.5 line-clamp-2">{pkg.name}</h3>
                        <p className="text-gray-300 text-xs flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5" /> {displayLocation}
                        </p>
                      </div>
                      <Link 
                        to={`/package/${packageId}`} 
                        className="bg-white/95 backdrop-blur-sm hover:bg-white text-slate-900 text-[11px] font-bold py-2.5 px-4 rounded-full flex items-center gap-1.5 transition-colors shrink-0 shadow-lg active:scale-95"
                      >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Stats Section Below Image */}
                  <div className="px-4 pt-6 pb-4 flex flex-col flex-1 justify-between">
                    {/* Top row of stats: Pricing Tiers */}
                    {pkg.pricingTiers && (pkg.pricingTiers.essential || pkg.pricingTiers.comfort || pkg.pricingTiers.luxury) && (
                      <div className="flex gap-6 mb-5">
                        {pkg.pricingTiers.essential && (
                          <div className="flex flex-col">
                            <span className="text-[13px] font-extrabold text-slate-800">₹{pkg.pricingTiers.essential.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Essential</span>
                          </div>
                        )}
                        {pkg.pricingTiers.comfort && (
                          <div className="flex flex-col">
                            <span className="text-[13px] font-extrabold text-slate-800">₹{pkg.pricingTiers.comfort.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Comfort</span>
                          </div>
                        )}
                        {pkg.pricingTiers.luxury && (
                          <div className="flex flex-col">
                            <span className="text-[13px] font-extrabold text-slate-800">₹{pkg.pricingTiers.luxury.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Luxury</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bottom row of stats */}
                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex gap-8">
                        <div className="flex flex-col">
                          <div className="w-10 h-1.5 rounded-full bg-blue-400 mb-2"></div>
                          <span className="text-[10px] text-slate-400 font-semibold">{displayDuration}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-extrabold text-slate-800 flex items-center gap-1">
                            {(pkg.rating || 5).toFixed(1)} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 -mt-0.5" />
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Rating</span>
                        </div>
                      </div>

                      {/* Decorative Map Box placeholder */}
                      <div className="w-20 h-14 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center justify-center opacity-80">
                        <svg viewBox="0 0 40 30" className="w-12 h-8 stroke-slate-300" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5,25 L10,20 L12,22 L16,14 L22,16 L28,8 L35,5" />
                          <circle cx="5" cy="25" r="2" fill="#cbd5e1" stroke="none" />
                          <circle cx="35" cy="5" r="2" fill="#cbd5e1" stroke="none" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-100">
            <p className="text-slate-400 font-medium">Coming soon for this destination...</p>
          </div>
        )}

        {showViewAll && (
          <div className="mt-16 text-center">
            <Link 
              to="/packages"
              className="inline-block border-2 border-[#2B4A8C] text-[#2B4A8C] font-black px-10 py-4 rounded-full hover:bg-[#2B4A8C] hover:text-white transition-all shadow-sm hover:shadow-lg active:scale-95 text-sm uppercase tracking-wider"
            >
              See All Packages
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesSection;

