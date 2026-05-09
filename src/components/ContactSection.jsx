import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-[#1A1A1A] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="luxury-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div>
              <span className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">The Concierge</span>
              <h2 className="text-7xl font-serif leading-tight">Start Your <br /><span className="text-luxury-gold italic">Conversation</span></h2>
              <p className="text-white/40 text-lg mt-8 font-light max-w-md italic">
                "The journey of a thousand miles begins with a single soulful connection."
              </p>
            </div>

            <div className="space-y-8 pt-12 border-t border-white/5">
              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-luxury-gold group-hover:border-luxury-gold transition-all duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-1">Email Us</span>
                  <span className="text-xl font-serif">concierge@tripsoul.com</span>
                </div>
              </div>

              <div className="flex items-center gap-8 group cursor-pointer">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-luxury-gold group-hover:border-luxury-gold transition-all duration-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-1">Global Phone</span>
                  <span className="text-xl font-serif">+1 800 SOUL TRIP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-2xl p-12 md:p-20 rounded-3xl border border-white/10">
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Your Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 pb-4 focus:border-luxury-gold outline-none transition-all text-xl font-serif" placeholder="Signature" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/10 pb-4 focus:border-luxury-gold outline-none transition-all text-xl font-serif" placeholder="Reach" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Inquiry Details</label>
                <textarea rows="4" className="w-full bg-transparent border-b border-white/10 pb-4 focus:border-luxury-gold outline-none transition-all text-xl font-serif resize-none" placeholder="Share your vision..."></textarea>
              </div>
              <button className="w-full py-6 bg-luxury-gold text-white uppercase tracking-[0.3em] text-[10px] font-bold rounded-full hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-4 group">
                Submit Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
