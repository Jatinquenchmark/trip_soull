import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Plane, Heart, CreditCard, ArrowRight, Clock, MapPin, Award, Navigation, Wallet } from 'lucide-react';
import { API_BASE_URL } from '../config';
import DashboardLayout from '../components/DashboardLayout';

const UserDashboard = () => {
  const { user, fetchWithAuth } = useAuth();
  const [stats, setStats] = useState({ totalBookings: 0, savedTrips: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // We can fetch bookings and wishlist to compute stats
      const [bookingsRes, wishlistRes] = await Promise.all([
        fetchWithAuth(`${API_BASE_URL}/api/bookings/my-bookings`),
        fetchWithAuth(`${API_BASE_URL}/api/user/wishlist`)
      ]);

      let bookings = [];
      let wishlist = [];

      if (bookingsRes.ok) bookings = await bookingsRes.json();
      if (wishlistRes.ok) wishlist = await wishlistRes.json();

      setStats({
        totalBookings: bookings.length,
        savedTrips: wishlist.length,
      });
      
      setRecentBookings(bookings.slice(0, 3)); // Only take top 3

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout title="Overview">
      {loading ? (
        <div className="flex justify-center py-32">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-soul-blue rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Welcome Banner */}
          <div className="bg-[#0A101D] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider mb-4">
                  <Award className="w-3.5 h-3.5 text-yellow-400" /> Explorer Tier
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="text-slate-300 font-medium max-w-xl text-sm md:text-base leading-relaxed">
                  Your next great adventure awaits. You have <strong className="text-white">2,450</strong> Trip Points available to redeem on your next booking.
                </p>
              </div>
              <div className="shrink-0 flex gap-4">
                <Link to="/packages" className="px-6 py-3.5 bg-soul-blue hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2 text-sm">
                  <Navigation size={18} /> Explore Trips
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 text-soul-blue rounded-2xl flex items-center justify-center group-hover:bg-soul-blue group-hover:text-white transition-colors">
                  <Plane className="w-6 h-6" />
                </div>
                <div className="text-2xl font-black text-slate-800">{stats.totalBookings}</div>
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Bookings</h3>
              <p className="text-xs text-slate-500 font-medium">+1 since last month</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="text-2xl font-black text-slate-800">{stats.savedTrips}</div>
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Saved to Wishlist</h3>
              <p className="text-xs text-slate-500 font-medium">Packages you're watching</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Wallet className="w-6 h-6" />
                </div>
                <div className="text-2xl font-black text-slate-800">$0.00</div>
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Travel Wallet</h3>
              <p className="text-xs text-slate-500 font-medium">Available credits & refunds</p>
            </div>
          </div>

          {/* Recent Bookings Section */}
          <div className="bg-white border border-slate-200/60 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Recent Bookings</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">Your latest travel itineraries.</p>
              </div>
              {recentBookings.length > 0 && (
                <Link to="/bookings" className="text-sm font-bold text-soul-blue hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors">View All</Link>
              )}
            </div>
            
            {recentBookings.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-8 h-8 text-slate-300" />
                </div>
                <h4 className="text-lg font-bold text-slate-700 mb-2">No bookings yet</h4>
                <p className="text-slate-500 font-medium mb-6">You haven't booked any trips with us yet.</p>
                <Link to="/packages" className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors inline-block">
                  Discover Destinations
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentBookings.map((booking) => (
                  <div key={booking._id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-20 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 shadow-inner">
                        {booking.package?.images?.[0] ? (
                          <img src={booking.package.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <MapPin className="text-slate-300 w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800 mb-1">{booking.package?.name || 'Custom Package'}</h4>
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(booking.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {booking.package?.countryId || 'Multiple'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 md:gap-8 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
                      <div className="text-left md:text-right">
                        <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Status</span>
                        <span className="inline-flex px-2.5 py-1 bg-green-50 text-green-600 rounded-md uppercase text-[10px] font-black tracking-wider border border-green-200">
                          {booking.status}
                        </span>
                      </div>
                      <Link to={`/package/${booking.package?._id}`} className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-soul-blue hover:text-white transition-all hover:shadow-lg hover:shadow-blue-500/30">
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;
