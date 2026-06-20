import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CustomHotelSearch = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Adults, 1 Room');

  const handleSearch = (e) => {
    e.preventDefault();
    // Temporary redirect for demo. In a real app, this would go to a partner like Booking.com with affiliate tags.
    // For example: window.open(`https://www.booking.com/searchresults.html?ss=${destination}&checkin=${checkIn}&checkout=${checkOut}`, '_blank');
    if (!destination) {
      alert("Please enter a destination!");
      return;
    }
    const searchUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="w-full max-w-5xl mx-auto shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden bg-white p-6 md:p-8 border border-slate-100 relative z-10">
      
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
          <Building2 className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Find Your Perfect Stay</h3>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        {/* Destination */}
        <div className="flex-1 relative">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Destination / Hotel Name</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Where are you going?" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 font-medium"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="flex-[0.8] grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Check-in</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 font-medium text-sm"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Check-out</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 font-medium text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="flex-[0.5] relative">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Guests</label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
            >
              <option>1 Adult, 1 Room</option>
              <option>2 Adults, 1 Room</option>
              <option>2 Adults, 2 Rooms</option>
              <option>4 Adults, 2 Rooms</option>
              <option>Family (2 Adults, 2 Kids)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="h-[58px] px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30 w-full md:w-auto"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default CustomHotelSearch;
