import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Heart, ChevronRight, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';
import DashboardLayout from '../components/DashboardLayout';

const Wishlist = () => {
  const { user, fetchWithAuth } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/api/user/wishlist`);
      if (response.ok) {
        const data = await response.json();
        setWishlist(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout title="Saved Trips">
      <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Your Wishlist</h2>
            <p className="text-slate-500 font-medium mt-1">Trips you've hearted for future adventures.</p>
          </div>
        </div>

        {loadingData ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin mb-4"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center shadow-sm">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-rose-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Your wishlist is empty</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Browse our packages and hit the heart icon to save your favorites for later.</p>
            <Link to="/packages" className="px-8 py-3.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-500/25 transition-all inline-flex items-center gap-2">
              Discover Packages <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(pkg => (
              <Link key={pkg._id} to={`/package/${pkg._id}`} className="group bg-white rounded-3xl overflow-hidden border border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="h-56 relative overflow-hidden bg-slate-900">
                  <img src={pkg.images?.[0] || 'https://placehold.co/600x400/png'} className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-700" alt="" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-rose-500 shadow-lg">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                      {pkg.location || pkg.countryId}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-soul-blue transition-colors line-clamp-1">{pkg.name}</h3>
                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Starting from</span>
                      <p className="text-lg font-black text-soul-blue">₹{pkg.pricingTiers?.essential?.toLocaleString('en-IN') || 'Contact us'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-soul-blue flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Wishlist;
