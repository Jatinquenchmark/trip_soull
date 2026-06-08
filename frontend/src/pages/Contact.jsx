import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[45vh] md:h-[55vh] w-full">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80" 
          alt="Travel airplane" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 font-medium max-w-2xl drop-shadow-md"
          >
            We'd love to hear from you. Let's plan your next adventure together.
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100">
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Get in Touch</h2>
              <p className="text-slate-500 leading-relaxed text-lg">
                Whether you're looking for a bespoke itinerary, have questions about our packages, or just want to say hello—our travel experts are here for you. Reach out using the details below.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2B4A8C] flex items-center justify-center shrink-0 group-hover:bg-[#2B4A8C] group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Our Location</h3>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">
                    Suncity sector 54 chowk<br />Gurugram, Haryana
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2B4A8C] flex items-center justify-center shrink-0 group-hover:bg-[#2B4A8C] group-hover:text-white transition-colors duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Phone Number</h3>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">
                    +91 8851484102
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2B4A8C] flex items-center justify-center shrink-0 group-hover:bg-[#2B4A8C] group-hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Email Address</h3>
                  <a href="mailto:official@tripsoul.org" className="text-slate-500 hover:text-[#2B4A8C] font-medium text-lg leading-relaxed transition-colors">
                    official@tripsoul.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2B4A8C] flex items-center justify-center shrink-0 group-hover:bg-[#2B4A8C] group-hover:text-white transition-colors duration-300">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Business Hours</h3>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">
                    Mon - Fri: 9:00 AM - 8:00 PM<br />
                    Sat - Sun: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Map / Image Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full min-h-[500px] w-full rounded-2xl overflow-hidden relative shadow-lg border border-slate-100"
          >
            {/* Embed a generic Google Map centering around Gurugram / Sector 54 */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14033.483863481077!2d77.09848525!3d28.4382598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d22ab1ab74519%3A0xc3910eb7122cf29e!2sSector%2054%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="TripSoul Office Location"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
