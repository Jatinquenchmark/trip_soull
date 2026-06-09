import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Plane, Bed, Building2, Home, TrainFront, Car, UserCircle, LogOut, FileText, ChevronDown, Heart } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/download (2).png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, isAdmin, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If scrolled down more than 100px and scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/packages' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Our Team', href: '/team' },
    { name: 'Philosophy', href: '#faq' },
    { name: 'Contact Us', href: '/contact' },
  ];


  const handleScroll = (e, href) => {
    if (href.startsWith('/')) {
      setIsOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      setIsOpen(false);
      return;
    }
    
    e.preventDefault();
    const target = href === '#' ? document.body : document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };


  return (
    <nav className={`fixed top-0 w-full z-[1000] transition-transform duration-300 bg-white border-b border-slate-100 py-1 px-6 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="TripSoul" className="h-16 w-auto object-contain" />
          </Link>
 

        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href.startsWith('/') ? link.href : `/${link.href}`} 
              onClick={(e) => {
                if (link.href.startsWith('#')) {
                  handleScroll(e, link.href);
                }
              }}
              className="text-sm font-medium text-soul-blue/80 hover:text-soul-blue transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {loading ? (
            <div className="w-20 h-10 bg-slate-100 animate-pulse rounded-full"></div>
          ) : isAuthenticated && user && !isAdmin ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-sm font-bold text-soul-blue bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-all border border-blue-100"
              >
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-white" />
                ) : (
                  <UserCircle className="w-5 h-5" />
                )}
                <span>{user.name.split(' ')[0]}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500 font-medium truncate">{user.email}</p>
                  </div>
                  <Link to="/dashboard" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-soul-blue hover:bg-blue-50/50 transition-colors">
                    <UserCircle className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link to="/bookings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-soul-blue hover:bg-blue-50/50 transition-colors">
                    <FileText className="w-4 h-4" /> My Bookings
                  </Link>
                  <Link to="/wishlist" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-soul-blue hover:bg-blue-50/50 transition-colors">
                    <Heart className="w-4 h-4" /> Wishlist
                  </Link>
                  <div className="h-[1px] bg-slate-50 my-1"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left">
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full transition-colors shadow-md">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-800">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl p-6 flex flex-col gap-4 border-t border-slate-100">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href.startsWith('/') ? link.href : `/${link.href}`} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50"
            >
              {link.name}
            </Link>
          ))}
          
          {isAuthenticated && user && !isAdmin ? (
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-50">
              <div className="flex items-center gap-3 px-2 py-2">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-soul-blue flex items-center justify-center">
                    <UserCircle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              <Link 
                to="/dashboard" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-lg font-medium text-slate-600 py-2 px-2 hover:bg-slate-50 rounded-xl"
              >
                <UserCircle className="w-5 h-5 text-soul-blue" /> Dashboard
              </Link>
              <Link 
                to="/bookings" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-lg font-medium text-slate-600 py-2 px-2 hover:bg-slate-50 rounded-xl"
              >
                <FileText className="w-5 h-5 text-soul-blue" /> My Bookings
              </Link>
              <Link 
                to="/wishlist" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-lg font-medium text-slate-600 py-2 px-2 hover:bg-slate-50 rounded-xl"
              >
                <Heart className="w-5 h-5 text-soul-blue" /> Wishlist
              </Link>
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="flex items-center gap-3 text-lg font-medium text-red-500 py-2 px-2 hover:bg-red-50 rounded-xl text-left"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setIsOpen(false)}
              className="text-center text-lg font-bold text-white bg-blue-600 py-3 rounded-xl mt-2"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
