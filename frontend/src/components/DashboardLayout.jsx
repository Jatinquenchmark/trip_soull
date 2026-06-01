import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Heart, Settings, LogOut, Search, Bell, Home, ChevronRight, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/download (2).png';

const NavItem = ({ icon, label, path, active, onClick }) => (
  <Link
    to={path}
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-3.5 transition-all relative ${
      active 
        ? 'text-white bg-white/5 font-bold' 
        : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'
    }`}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-soul-blue rounded-r-full shadow-[0_0_10px_rgba(43,74,140,1)]"></div>}
    {icon}
    <span>{label}</span>
  </Link>
);

const DashboardLayout = ({ children, title, subtitle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <aside className={`fixed md:static inset-y-0 left-0 w-72 bg-[#0A101D] text-slate-300 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#0A101D] z-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-soul-blue/10 to-transparent"></div>
          <Link to="/" className="flex items-center gap-3 relative z-10 group">
            <img 
              src={logo} 
              alt="Trip Soul" 
              className="h-10 w-10 rounded-full object-cover border-2 border-white/10 group-hover:border-white/30 transition-colors"
            />
            <div>
              <h1 className="text-white font-black text-lg tracking-tight">Trip Soul</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Passport</p>
            </div>
          </Link>
          <button className="md:hidden text-slate-400" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-8 border-b border-white/5 relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="w-14 h-14 rounded-full object-cover border-2 border-slate-700" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center text-xl font-black border-2 border-slate-700">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0A101D] rounded-full"></div>
            </div>
            <div>
              <h2 className="text-white font-bold text-sm line-clamp-1">{user.name}</h2>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-soul-blue bg-soul-blue/10 px-2 py-0.5 rounded-full w-fit border border-soul-blue/20">
                <span className="w-1.5 h-1.5 rounded-full bg-soul-blue animate-pulse"></span>
                Explorer Tier
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
          <div className="px-6 mb-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Main Menu</p>
          </div>
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
            path="/dashboard" 
            active={location.pathname === '/dashboard'}
            onClick={() => setMobileMenuOpen(false)}
          />
          <NavItem 
            icon={<CalendarDays size={20} />} 
            label="My Bookings" 
            path="/bookings" 
            active={location.pathname === '/bookings'} 
            onClick={() => setMobileMenuOpen(false)}
          />
          <NavItem 
            icon={<Heart size={20} />} 
            label="Saved Trips" 
            path="/wishlist" 
            active={location.pathname === '/wishlist'} 
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <div className="px-6 mt-8 mb-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Preferences</p>
          </div>
          <NavItem 
            icon={<Settings size={20} />} 
            label="Account Settings" 
            path="/profile" 
            active={location.pathname === '/profile'} 
            onClick={() => setMobileMenuOpen(false)}
          />
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/5">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white rounded-xl w-full transition-colors font-medium mb-1"
          >
            <Home size={18} /> Back to Website
          </Link>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10 rounded-xl w-full transition-colors font-medium"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 md:px-10 z-30 shrink-0 shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600 hover:text-slate-900 transition-colors" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400 font-medium">
              <span className="hover:text-slate-600 cursor-pointer">Dashboard</span>
              <ChevronRight size={14} className="text-slate-300" />
              <span className="text-slate-800 font-bold">{title}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search packages or destinations..."
                className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-md cursor-pointer">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 font-black">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative">
          {/* Top Background Decoration */}
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
          
          <div className="p-6 md:p-10 relative z-10 max-w-7xl mx-auto min-h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
