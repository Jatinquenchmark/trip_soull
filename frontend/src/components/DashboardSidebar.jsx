import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Calendar, Heart, LogOut, Camera, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  return (
    <div className="w-full lg:w-1/4">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden sticky top-32">
        
        {/* User Info Header */}
        <div className="p-8 pb-6 flex flex-col items-center text-center border-b border-slate-50">
          <div className="relative mb-4 group cursor-pointer">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-50 text-soul-blue flex items-center justify-center text-3xl font-black border-4 border-white shadow-lg">
                {user.name.charAt(0)}
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">{user.name}</h2>
          <p className="text-sm text-slate-400 font-medium">{user.email}</p>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <Link
            to="/dashboard"
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              location.pathname === '/dashboard'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" /> Overview
          </Link>

          <Link
            to="/profile"
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              location.pathname === '/profile'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-5 h-5" /> Account Settings
          </Link>

          <Link
            to="/bookings"
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              location.pathname === '/bookings'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-5 h-5" /> My Bookings
          </Link>
          
          <Link
            to="/wishlist"
            className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              location.pathname === '/wishlist'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Heart className="w-5 h-5" /> Wishlist
          </Link>
        </div>

        <div className="p-4 border-t border-slate-50">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
