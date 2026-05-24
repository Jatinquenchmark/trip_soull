import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Clock, MapPin, Compass } from 'lucide-react';
import { destinations } from '../data/trips';
import { API_BASE_URL } from '../config';

const PackagesSection = ({ selectedCountryId, searchQuery, limit = 6, showViewAll = true }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (selectedCountryId) {
    filteredPackages = filteredPackages.filter(pkg => pkg.countryId === selectedCountryId);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPackages = filteredPackages.filter(pkg => 
      pkg.name.toLowerCase().includes(query) || 
      pkg.countryId.toLowerCase().includes(query)
    );
  } else if (!selectedCountryId) {
    filteredPackages = filteredPackages.slice(0, limit);
  }

  if (loading) {
    return <div className="text-center py-20 text-slate-500">Loading packages...</div>;
  }

  return (
    <section id="packages" className="py-20 px-6 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-slate-800 capitalize">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCountryId ? `${selectedCountryId} Packages` : 'Top Collections'}
          </h2>
          {showViewAll && !selectedCountryId && (
            <Link to="/packages" className="text-soul-blue font-bold flex items-center gap-2 hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

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
                  <div className="h-72 relative overflow-hidden bg-slate-900">
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
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-slate-500 text-xs mb-3 font-bold">
                      <Clock className="w-4 h-4 text-soul-blue" />
                      <span>{displayDuration}</span>
                    </div>

                    <Link to={`/package/${packageId}`}>
                      <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-soul-blue transition-colors line-clamp-1">
                        {pkg.name}
                      </h3>
                    </Link>

                    <p className="text-slate-500 text-xs font-semibold mb-4 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500" /> {displayLocation}
                    </p>

                    <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-6 leading-relaxed">
                      {pkg.overview}
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-auto pt-6 border-t border-slate-100 flex">
                      <Link 
                        to={`/package/${packageId}`}
                        style={{ backgroundColor: '#2B4A8C' }}
                        className="w-full text-center text-white font-black py-3.5 rounded-xl hover:opacity-90 transition-all shadow-md active:scale-95 text-sm"
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
      </div>
    </section>
  );
};

export default PackagesSection;

