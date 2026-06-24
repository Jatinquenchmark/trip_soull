import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, Globe, Linkedin, Mail, Phone, MapPin, 
  Send, ChevronRight, Facebook, Twitter 
} from 'lucide-react';
import logo from '../assets/download (2).png';

const Footer = () => {
  const handleSubmitNewsletter = (e) => {
    e.preventDefault();
    // Dummy submit logic
  };

  return (
    <footer className="relative z-50 bg-[#080B11] text-white pt-12 pb-6 px-4 md:px-8 border-t border-slate-900 overflow-hidden font-sans">
      {/* Premium Top Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#2B4A8C]/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-[#2B4A8C]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8">
        
        {/* Brand Column (Col Span: 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2.5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] flex-shrink-0">
              <img src={logo} alt="TripSoul Logo" className="h-12 w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tight text-white font-poppins leading-none drop-shadow-md">
                TripSoul
              </span>
              <span className="text-[10px] text-[#4F80FF] font-black uppercase tracking-[0.25em] mt-1.5 drop-shadow-sm">
                Perfectly Personalised
              </span>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed font-medium text-sm pr-4">
            We craft soul-stirring journeys and bespoke travel itineraries across the globe's most breathtaking destinations. Explore the world on your own terms.
          </p>
          
          {/* Social Icons Badge Grid */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://www.instagram.com/trip_.soul?igsh=NTIwanM3Z3dtYzNq" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full border border-slate-700/50 bg-slate-800/30 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#4F80FF] hover:bg-[#4F80FF]/20 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(79,128,255,0.4)] transition-all duration-300"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column (Col Span: 2) */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-black text-white uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm font-semibold">
            <li>
              <Link to="/packages" className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2B4A8C] transition-all duration-300" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Packages</span>
              </Link>
            </li>
            <li>
              <a href="#about" className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2B4A8C] transition-all duration-300" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">About Us</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2B4A8C] transition-all duration-300" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Contact Us</span>
              </a>
            </li>
            <li>
              <a href="#faq" className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2B4A8C] transition-all duration-300" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">FAQs</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Destinations Column (Col Span: 3) */}
        <div className="lg:col-span-3">
          <h4 className="text-sm font-black text-white uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-4">
            Popular Destinations
          </h4>
          <ul className="space-y-2 text-sm font-semibold">
            <li>
              <Link to="/destination/bali" className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2B4A8C] transition-all duration-300" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Bali, Indonesia</span>
              </Link>
            </li>
            <li>
              <Link to="/destination/dubai" className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2B4A8C] transition-all duration-300" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Dubai, UAE</span>
              </Link>
            </li>
            <li>
              <Link to="/destination/maldives" className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2B4A8C] transition-all duration-300" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">The Maldives</span>
              </Link>
            </li>
            <li>
              <Link to="/destination/turkey" className="group flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-[#2B4A8C] transition-all duration-300" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-300">Istanbul & Turkey</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter & Info Column (Col Span: 3) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-black text-white uppercase tracking-widest border-b border-slate-800/60 pb-2 mb-4">
            Contact & Updates
          </h4>
          
          <div className="space-y-2 text-sm font-semibold text-slate-400">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#2B4A8C]" />
              <span className="hover:text-white transition-colors">official@tripsoul.org</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#2B4A8C]" />
              <span className="hover:text-white transition-colors">+91 8851484102</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#2B4A8C] shrink-0 mt-0.5" />
              <span className="hover:text-white transition-colors leading-relaxed">
                Suncity sector 54 chowk
              </span>
            </div>
          </div>

          {/* Newsletter Input Box */}
          <div className="pt-2">
            <p className="text-xs text-slate-500 font-bold mb-3 uppercase tracking-wider">
              Subscribe to news & offers
            </p>
            <form onSubmit={handleSubmitNewsletter} className="relative group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-[#05070B] border border-slate-800/80 rounded-2xl py-3 pl-4 pr-12 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#2B4A8C] focus:ring-1 focus:ring-[#2B4A8C] transition-all duration-300" 
              />
              <button 
                type="submit" 
                className="absolute right-2 top-2 w-8 h-8 rounded-xl bg-[#2B4A8C] hover:bg-opacity-95 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col items-center gap-4 text-slate-500 text-sm font-medium">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
          <p className="text-center md:text-left text-xs">
            © 2026 TripSoul. All rights reserved. Your Tour, Perfectly Personalised!
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-slate-400">
            <Link to="/privacy-policy" className="hover:text-[#2B4A8C] hover:underline underline-offset-4 transition-all duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-[#2B4A8C] hover:underline underline-offset-4 transition-all duration-300">
              Terms & Conditions
            </Link>
            <Link to="/cookie-policy" className="hover:text-[#2B4A8C] hover:underline underline-offset-4 transition-all duration-300">
              Cookie Policy
            </Link>
            <Link to="/refund-policy" className="hover:text-[#2B4A8C] hover:underline underline-offset-4 transition-all duration-300">
              Refund Policy
            </Link>
          </div>
        </div>
        
        {/* Secured By & Powered By text */}
        <div className="w-full flex justify-start gap-4 mt-6 border-t border-slate-900/50 pt-8 pb-4 flex-wrap">
          <a 
            href="https://www.parameterx.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-3 bg-white/5 border border-slate-800 px-4 py-2.5 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-inner">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="transform group-hover:scale-110 transition-transform duration-300">
                <path d="M5 19L19 5" stroke="#0095f6" strokeWidth="3" strokeLinecap="round"/>
                <path d="M5 5L19 19" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight mb-0.5">Secured By</span>
              <span className="text-sm font-black text-white leading-tight tracking-wide">ParameterX</span>
            </div>
          </a>

          <div className="inline-flex items-center gap-3 bg-white/5 border border-slate-800 px-4 py-2.5 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
            <div className="w-10 h-10 bg-[#2B4A8C] rounded-xl flex items-center justify-center shadow-inner">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <div className="text-left flex flex-col justify-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight mb-0.5">Powered By</span>
              <span className="text-sm font-black text-white leading-tight tracking-wide">Qunchmark</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
