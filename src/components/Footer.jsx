import React from 'react';
import { Instagram, Globe, Linkedin, Mail, Phone } from 'lucide-react';
import logo from '../assets/download (2).png';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2 group">
            <img src={logo} alt="TripSoul" className="h-16 w-auto object-contain mb-6 brightness-0 invert" />
            <span className="text-2xl font-bold tracking-tight text-white hidden">
              TripSoul
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed font-medium">
            Your Tour, Perfectly Personalised! We craft soul-stirring journeys across the globe's most breathtaking destinations.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Destinations</h4>
          <ul className="space-y-4 text-soul-blue/70 font-medium">
            <li className="hover:text-soul-blue cursor-pointer transition-colors">Bali, Indonesia</li>
            <li className="hover:text-soul-blue cursor-pointer transition-colors">Dubai, UAE</li>
            <li className="hover:text-soul-blue cursor-pointer transition-colors">Maldives</li>
            <li className="hover:text-soul-blue cursor-pointer transition-colors">Turkey</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
          <ul className="space-y-4 text-soul-blue/70 font-medium">
            <li className="hover:text-soul-blue cursor-pointer transition-colors">Packages</li>
            <li className="hover:text-soul-blue cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-soul-blue cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-soul-blue cursor-pointer transition-colors">FAQ</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Connect</h4>
          <div className="flex gap-4 mb-6">
            <Instagram className="w-5 h-5 cursor-pointer text-soul-blue/60 hover:text-soul-blue transition-colors" />
            <Globe className="w-5 h-5 cursor-pointer text-soul-blue/60 hover:text-soul-blue transition-colors" />
            <Linkedin className="w-5 h-5 cursor-pointer text-soul-blue/60 hover:text-soul-blue transition-colors" />
          </div>
          <div className="space-y-4 text-soul-blue/70 font-medium">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-soul-blue" /> <span>hello@tripsoul.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-soul-blue" /> <span>+1 234 567 890</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-10 text-slate-500 text-sm font-medium">
        © 2026 TripSoul. All rights reserved. Your Tour, Perfectly Personalised!
      </p>
    </footer>
  );
};


export default Footer;
