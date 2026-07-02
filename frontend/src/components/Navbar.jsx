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
    { name: 'Blogs', href: '/blogs' },
    { name: 'Our Team', href: '/team' },
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
    <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-[1000] transition-all duration-500 ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'}`}>
      <div className="bg-white/40 backdrop-blur-md rounded-full p-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50">
        
        {/* Left Logo Pill */}
        <div className="flex-shrink-0">
          <Link to="/" className="bg-white/80 backdrop-blur-sm rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
            <img src={logo} alt="TripSoul" className="h-8 md:h-10 w-auto object-contain" />
          </Link>
        </div>

        {/* Center Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-8 px-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href.startsWith('/') ? link.href : `/${link.href}`} 
              onClick={(e) => {
                if (link.href.startsWith('#')) {
                  handleScroll(e, link.href);
                }
              }}
              className="text-[14px] font-semibold text-slate-700 hover:text-black transition-colors whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Auth Section */}
        <div className="hidden md:flex items-center flex-shrink-0 pl-2">

          {loading ? (
            <div className="w-20 h-10 bg-slate-100 animate-pulse rounded-full"></div>
          ) : isAuthenticated && user && !isAdmin ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-[14px] font-bold text-slate-800 bg-white/60 hover:bg-white backdrop-blur-sm px-5 md:px-6 py-2.5 md:py-3 rounded-full transition-all shadow-sm"
              >
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Profile" className="w-5 h-5 rounded-full object-cover border border-slate-200" />
                ) : (
                  <UserCircle className="w-5 h-5" />
                )}
                <span>{user.name.split(' ')[0]}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
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
            <Link to="/login" className="text-[14px] font-bold text-white bg-slate-900 hover:bg-black px-6 py-3 md:py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden pr-3">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 p-1 focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-[110%] left-0 w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4 border border-white/50 mt-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href.startsWith('/') ? link.href : `/${link.href}`} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-700 hover:text-black py-2 border-b border-slate-200/50"
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
