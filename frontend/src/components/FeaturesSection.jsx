import React from 'react';
import { Headset, Wallet, CalendarCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-orange-500" />,
    title: "Expert Curation",
    description: "Every itinerary is carefully hand-crafted by seasoned destination experts who know the hidden gems.",
    bg: "bg-orange-50"
  },
  {
    icon: <Wallet className="w-8 h-8 text-blue-500" />,
    title: "Best Value",
    description: "We negotiate directly with local partners to ensure you get the most premium experience for your budget.",
    bg: "bg-blue-50"
  },
  {
    icon: <Headset className="w-8 h-8 text-green-500" />,
    title: "24/7 Support",
    description: "Travel with peace of mind. Our local support team is always just a message away, anywhere, anytime.",
    bg: "bg-green-50"
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-purple-500" />,
    title: "Flexible Booking",
    description: "Plans change. Enjoy flexible dates and hassle-free rescheduling options on most of our packages.",
    bg: "bg-purple-50"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#FDFDFD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#2B4A8C] animate-pulse"></span>
            <span className="text-xs font-bold text-[#2B4A8C] uppercase tracking-widest">Why TripSoul</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-[#0A0F1D] mb-6 font-serif"
          >
            Redefining Your <br /> Travel Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg"
          >
            We eliminate the stress of planning and ensure every moment of your trip is magical, secure, and perfectly tailored to you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
