import React from 'react';
import { Linkedin, Twitter, Mail, MapPin, Globe, Target, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

// Temporary placeholder, the user can replace with Tarundeep's actual photo
const founderImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop";

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] font-poppins pt-32 pb-24">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-blue-50 text-soul-blue px-5 py-2.5 rounded-full text-sm font-bold mb-6 border border-blue-100 uppercase tracking-widest shadow-sm"
        >
          <Globe className="w-4 h-4" />
          Meet Our Founder
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-[#2D2D2D] mb-6 tracking-tight"
        >
          The Visionary Behind <span className="text-[#2B4A8C]">TripSoul</span>
        </motion.h1>
      </div>

      {/* Founder Profile Section */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
          
          {/* Decorative Background blob */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-60"></div>

          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-2/5"
          >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={founderImage} 
                alt="Tarundeep Kamboj" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B4A8C]/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl font-black text-white mb-1">Tarundeep Kamboj</h3>
                <p className="text-blue-100 font-medium text-sm">Founder & Director, TripSoul</p>
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-center">
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2B4A8C] hover:bg-[#2B4A8C] hover:text-white transition-all shadow-md border border-slate-100">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2B4A8C] hover:bg-[#2B4A8C] hover:text-white transition-all shadow-md border border-slate-100">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2B4A8C] hover:bg-[#2B4A8C] hover:text-white transition-all shadow-md border border-slate-100">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Right: Bio Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-3/5"
          >
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Tarundeep Kamboj</h2>
            <p className="text-[#2B4A8C] font-bold text-sm md:text-base mb-8 uppercase tracking-wide leading-relaxed">
              Founder & Director, TripSoul <br className="hidden md:block" /> 
              <span className="text-slate-400">|</span> Co-Founder, Quench Mark <br className="hidden md:block" />
              <span className="text-slate-400">|</span> Founder, Nawa Media Collection
            </p>

            <div className="space-y-5 text-slate-600 font-medium leading-relaxed text-justify">
              <p>
                Tarundeep Kamboj is a passionate entrepreneur, digital marketer, and travel enthusiast who leads TripSoul with a vision to make travel more personalized, accessible, and memorable. As the Founder and Director of TripSoul, she is responsible for overseeing the company's operations, marketing strategies, customer experience, partnerships, and overall business growth.
              </p>
              <p>
                TripSoul is a venture of Quench Mark, a company co-founded by Tarundeep Kamboj and Prince. As an equal partner and Co-Founder of Quench Mark, Tarundeep has played a significant role in building and expanding the company's vision of creating customer-focused and innovative businesses.
              </p>
              <p>
                She holds a Bachelor of Business Administration (BBA) with a specialization in Digital Marketing, equipping her with strong expertise in branding, digital strategy, consumer behavior, and business development. Her educational background, combined with her entrepreneurial mindset, has helped shape TripSoul into a growing travel brand.
              </p>
              <p>
                Alongside her work in the travel industry, Tarundeep is also the Founder of Nawa Media Collection, a marketing and creative agency that helps businesses grow their digital presence through social media marketing, branding, content creation, influencer collaborations, and strategic marketing solutions. Through Nawa Media Collection, she works with brands across various industries to help them build meaningful connections with their audiences and achieve sustainable growth.
              </p>
              <p>
                With a strong passion for entrepreneurship, innovation, and customer satisfaction, Tarundeep continues to lead multiple ventures while inspiring travelers and businesses alike. Her goal is to create exceptional experiences—whether through unforgettable journeys with TripSoul or impactful marketing solutions through Nawa Media Collection.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#2B4A8C] to-[#1A3366] rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
            <Eye className="w-12 h-12 text-luxury-gold mb-6" />
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-blue-50 text-lg leading-relaxed font-medium">
              To create meaningful travel experiences and innovative business solutions that inspire growth, exploration, and lasting connections.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white border-2 border-[#2B4A8C] rounded-[2.5rem] p-10 text-slate-800 shadow-xl relative overflow-hidden group hover:bg-[#2B4A8C] hover:text-white transition-all duration-500"
          >
            <Target className="w-12 h-12 text-[#2B4A8C] group-hover:text-luxury-gold mb-6 transition-colors duration-500" />
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-slate-600 group-hover:text-blue-50 text-lg leading-relaxed font-medium transition-colors duration-500">
              To deliver personalized travel services, outstanding customer experiences, and creative marketing solutions that help individuals and businesses achieve their goals.
            </p>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default OurTeam;
