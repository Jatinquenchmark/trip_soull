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
                  className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group relative"
                >
                  {/* Image/Top area */}
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
                    
                    {/* Wishlist Button */}
                    <button 
                      onClick={(e) => handleWishlistToggle(e, packageId)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
                    >
                      <Heart className={`w-5 h-5 transition-colors ${wishlist.includes(packageId) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                    </button>

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

                    {/* Pricing Tiers Section */}
                    {pkg.pricingTiers && (pkg.pricingTiers.essential || pkg.pricingTiers.comfort || pkg.pricingTiers.luxury) && (
                      <div className="mt-2 mb-3 grid grid-cols-3 gap-2">
                        {pkg.pricingTiers.essential && (
                          <Link to={`/package/${packageId}?tier=basic`} className="bg-white border border-slate-200 rounded-lg py-2 px-1 text-center hover:bg-blue-50 hover:border-soul-blue/30 transition-all cursor-pointer group/tier shadow-sm hover:shadow-md">
                            <span className="block text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/tier:text-soul-blue transition-colors">Essential</span>
                            <span className="block text-[11px] font-black text-slate-800">₹{pkg.pricingTiers.essential.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                          </Link>
                        )}
                        {pkg.pricingTiers.comfort && (
                          <Link to={`/package/${packageId}?tier=medium`} className="bg-white border border-slate-200 rounded-lg py-2 px-1 text-center hover:bg-blue-50 hover:border-soul-blue/30 transition-all cursor-pointer group/tier shadow-sm hover:shadow-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-8 h-8 bg-soul-blue/5 rounded-full blur-md"></div>
                            <span className="block text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/tier:text-soul-blue transition-colors">Comfort</span>
                            <span className="block text-[11px] font-black text-slate-800">₹{pkg.pricingTiers.comfort.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                          </Link>
                        )}
                        {pkg.pricingTiers.luxury && (
                          <Link to={`/package/${packageId}?tier=luxury`} className="bg-white border border-slate-200 rounded-lg py-2 px-1 text-center hover:bg-blue-50 hover:border-soul-blue/30 transition-all cursor-pointer group/tier shadow-sm hover:shadow-md">
                            <span className="block text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover/tier:text-soul-blue transition-colors">Luxury</span>
                            <span className="block text-[11px] font-black text-slate-800">₹{pkg.pricingTiers.luxury.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                          </Link>
                        )}
                      </div>
                    )}

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

