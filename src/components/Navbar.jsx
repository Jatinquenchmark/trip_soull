import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../assets/download (2).png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/packages' },
    { name: 'Our Story', href: '#about' },
    { name: 'Philosophy', href: '#faq' },
    { name: 'Contact', href: '#contact' },
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
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-white border-b border-slate-100 py-1 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="TripSoul" className="h-16 w-auto object-contain" />
          <span className="text-2xl font-bold tracking-tight text-soul-blue hidden">
            TripSoul
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href.startsWith('/') ? link.href : `/${link.href}`} 
              className="text-sm font-medium text-soul-blue/80 hover:text-soul-blue transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button className="text-sm font-bold text-slate-700 hover:text-soul-blue px-4">
            Login
          </button>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
