import React from 'react';
import { Shield, Sparkles, Trophy, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-8 border-slate-50">
              <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80" alt="Travel Experience" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-thrill-orange p-8 rounded-3xl hidden md:flex flex-col justify-center shadow-2xl text-white">
              <span className="text-5xl font-black mb-2 italic">10+</span>
              <p className="text-[10px] uppercase font-black tracking-widest leading-tight">Years of Crafting Perfect Tours</p>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight mb-6">
                Your Tour, <br />
                <span className="text-thrill-orange">Perfectly Personalised!</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                We believe travel should be as unique as you are. TripSoul connects you with expert tour planners who craft multi-day experiences tailored to your dreams, budget, and soul.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Shield className="text-thrill-orange w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">100% Secure</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">Safe payments and verified tour operators for your peace of mind.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Sparkles className="text-thrill-orange w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">Expert Curation</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">Every itinerary is hand-crafted by destination experts.</p>
                </div>
              </div>
            </div>

            <button className="bg-thrill-orange text-white font-bold px-10 py-4 rounded-xl hover:bg-orange-600 transition-all shadow-lg active:scale-95">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default AboutSection;
