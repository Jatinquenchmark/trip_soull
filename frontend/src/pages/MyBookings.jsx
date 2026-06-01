import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Plane, Calendar, Clock, Download, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '../config';
import DashboardLayout from '../components/DashboardLayout';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/my-bookings`, { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout title="My Bookings">
      <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Your Journeys</h2>
            <p className="text-slate-500 font-medium mt-1">Manage your upcoming and past travel itineraries.</p>
          </div>
        </div>
        
        {loadingData ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-soul-blue rounded-full animate-spin mb-4"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/60 p-16 text-center shadow-sm">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plane className="w-10 h-10 text-soul-blue" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">No trips booked yet</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">When you book a holiday or package with us, it will appear here along with your itinerary.</p>
            <Link to="/packages" className="px-8 py-3.5 bg-soul-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all inline-flex items-center gap-2">
              Explore Packages <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-full md:w-64 h-48 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 relative shadow-inner">
                  {booking.package?.images?.[0] ? (
                    <img src={booking.package.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="text-slate-300 w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-800 shadow-sm">
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-2xl font-black text-slate-800 line-clamp-2">{booking.package?.name || 'Custom Package'}</h3>
                      <span className="text-xl font-black text-soul-blue bg-blue-50 px-3 py-1 rounded-lg shrink-0">
                        ₹{booking.totalPrice?.toLocaleString('en-IN') || '---'}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-bold mb-6">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> {new Date(booking.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> {booking.package?.days ? `${booking.package.nights}N / ${booking.package.days}D` : 'Flexible'}</span>
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {booking.package?.countryId || 'Destination'}</span>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-black uppercase tracking-wider">{booking.tier}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-soul-blue hover:bg-blue-100 rounded-xl text-sm font-bold transition-colors">
                      <Download className="w-4 h-4" /> Download Itinerary
                    </button>
                    <Link to={`/package/${booking.package?._id}`} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-bold transition-colors">
                      View Package <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyBookings;
