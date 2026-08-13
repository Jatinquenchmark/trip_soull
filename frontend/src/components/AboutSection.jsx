import React from 'react';
import { Shield, Sparkles, Map, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 md:px-8 bg-[#F8FAFC] overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute -bottom-32 left-[20%] w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Side: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] lg:aspect-square w-full lg:w-[85%]">
              <img 
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80" 
                alt="Travel Experience" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Secondary Image (Overlapping) */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
               className="absolute -bottom-10 -right-4 lg:-right-10 z-20 w-3/5 lg:w-[55%] aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white hidden md:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80" 
                alt="Premium Travel" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.4 }}
               className="absolute top-10 -left-6 lg:-left-12 z-30 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2B4A8C] to-[#1E3A8A] flex items-center justify-center text-white font-bold text-xl">
                10+
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 leading-tight">Years of</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2B4A8C] animate-pulse"></span>
                <span className="text-xs font-bold text-[#2B4A8C] uppercase tracking-widest">Discover TripSoul</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A0F1D] leading-[1.1] font-serif">
                Crafting Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B4A8C] to-[#4F46E5]">Perfect Journey</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                We don't just book trips; we design experiences that resonate with your soul. TripSoul connects you with local experts to craft multi-day itineraries tailored specifically to your dreams, pace, and budget.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 mb-4">
                  <Shield className="text-[#2B4A8C] w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-2">100% Secure</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Safe payments and strictly verified operators for complete peace of mind</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 mb-4">
                  <Sparkles className="text-orange-500 w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-2">Expert Curation</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Every single itinerary is hand-crafted by seasoned destination experts.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: '#2B4A8C' }}
                className="text-white font-bold px-8 py-4 rounded-full hover:opacity-95 transition-all shadow-[0_10px_30px_rgba(43,74,140,0.3)] flex items-center gap-3"
              >
                Learn More About Us
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
