import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Clock, Phone, MapPin, Check } from 'lucide-react';

import { detailedPackages } from '../data/trips';

const PackagesSection = ({ selectedCountryId, searchQuery, limit = 6, showViewAll = true }) => {
  let filteredPackages = detailedPackages;

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

  return (
    <section id="packages" className="py-20 px-6 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-slate-800 capitalize">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCountryId ? `${selectedCountryId} Packages` : 'Top Collections'}
          </h2>
          {showViewAll && !selectedCountryId && (
            <Link to="/packages" className="text-thrill-orange font-bold flex items-center gap-2 hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col h-full">
                {/* Image Section */}
                <div className="h-64 relative overflow-hidden">
                  <Link to={`/package/${pkg.id}`}>
                    <img 
                      src={pkg.images[0]} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
                    />
                  </Link>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] text-white font-bold flex items-center gap-2">
                    <Star className="text-yellow-400 w-3 h-3 fill-yellow-400" /> {pkg.rating || '4.5'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-3 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </div>
                  
                  <Link to={`/package/${pkg.id}`}>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 hover:text-thrill-orange transition-colors line-clamp-1">
                      {pkg.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold">
                      <Check className="w-3 h-3" /> Best Seller
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-50">
                    <div className="flex flex-col mb-4">
                      <span className="text-[10px] text-slate-400 line-through font-medium">₹{(parseInt(pkg.price.replace(/[^\d]/g, '')) * 1.25).toLocaleString()}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-slate-900">{pkg.price}</span>
                        <span className="text-[10px] text-slate-500 font-medium">/Adult</span>
                        <div className="ml-auto bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-black">
                          SAVE ₹{(parseInt(pkg.price.replace(/[^\d]/g, '')) * 0.25).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-3 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-thrill-orange">
                        <Phone className="w-5 h-5 fill-thrill-orange/10" />
                      </button>
                      <button className="flex-1 bg-thrill-orange text-white font-bold py-3 rounded-md hover:bg-orange-600 transition-all shadow-md active:scale-95">
                        Request Callback
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

