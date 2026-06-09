import React from 'react';
import { Linkedin, Twitter, Mail, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: "Alexander Vance",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop",
    bio: "Former luxury hotelier turned travel entrepreneur. Alexander founded TripSoul with a vision to redefine bespoke global exploration.",
    favoriteDestination: "Kyoto, Japan"
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop",
    bio: "With 15 years in global logistics, Sophia ensures that every transfer, flight, and hotel check-in happens flawlessly.",
    favoriteDestination: "Amalfi Coast, Italy"
  },
  {
    id: 3,
    name: "David Chen",
    role: "Chief Experience Officer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop",
    bio: "David travels the world to personally vet our boutique hotel partners and local guides to ensure the highest standards.",
    favoriteDestination: "Patagonia, Chile"
  },
  {
    id: 4,
    name: "Aisha Rahman",
    role: "Senior Travel Architect",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
    bio: "A master of custom itineraries. Aisha specializes in crafting deeply immersive cultural experiences for our clients.",
    favoriteDestination: "Marrakech, Morocco"
  },
  {
    id: 5,
    name: "Marcus Thorne",
    role: "Lead Expedition Guide",
    image: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?w=600&h=800&fit=crop",
    bio: "An expert mountaineer and survivalist, Marcus leads our most exclusive adventure packages across the globe.",
    favoriteDestination: "Swiss Alps"
  },
  {
    id: 6,
    name: "Elena Rostova",
    role: "Client Relations Director",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?w=600&h=800&fit=crop",
    bio: "Elena's dedicated team provides 24/7 concierge support to all TripSoul travelers, ensuring peace of mind anywhere.",
    favoriteDestination: "Maldives"
  }
];

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-[#FDFCFB] font-poppins pt-24 pb-24">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-blue-50 text-soul-blue px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-blue-100"
        >
          <Globe className="w-4 h-4" />
          The Faces Behind The Magic
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-[#2D2D2D] mb-6 tracking-tight"
        >
          Meet the <span className="text-[#2B4A8C]">TripSoul</span> Team
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          We are a collective of passionate travelers, logistics experts, and luxury connoisseurs dedicated to crafting the world's most extraordinary journeys.
        </motion.p>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 relative"
            >
              {/* Image Section with Overlay */}
              <div className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-[#2B4A8C]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                />
                
                {/* Hover Social Links */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 z-20">
                  <a href="#" className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#2B4A8C] hover:bg-[#2B4A8C] hover:text-white transition-colors shadow-lg">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#2B4A8C] hover:bg-[#2B4A8C] hover:text-white transition-colors shadow-lg">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 relative bg-white">
                {/* Favorite Destination Badge floating between image and content */}
                <div className="absolute -top-5 left-8 bg-luxury-gold text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 border border-white/20">
                  <MapPin className="w-3.5 h-3.5" /> 
                  Fav: {member.favoriteDestination}
                </div>

                <div className="mt-2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-soul-blue font-semibold text-sm mb-4">{member.role}</p>
                  
                  <div className="w-12 h-1 bg-blue-50 rounded-full mb-4"></div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center gap-2">
                  <button className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#2B4A8C] transition-colors">
                    <Mail className="w-4 h-4" /> Get in touch
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Presence Section */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-[#2B4A8C] rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] border border-white/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] border border-white/10 rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
          
          <div className="relative z-10 md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">A Global Network of Experts</h2>
            <p className="text-blue-100 font-medium leading-relaxed mb-8">
              While our core team is headquartered in London, we have on-the-ground travel directors in over 40 countries ensuring your experience is authentic, seamless, and extraordinary.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <h4 className="text-4xl font-black text-luxury-gold mb-1">40+</h4>
                <p className="text-sm text-blue-100 font-medium">Local Guides</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div>
                <h4 className="text-4xl font-black text-luxury-gold mb-1">24/7</h4>
                <p className="text-sm text-blue-100 font-medium">Global Support</p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Abstract Map/Globe representation using simple CSS shapes */}
              <div className="absolute inset-0 bg-white/5 rounded-full backdrop-blur-3xl border border-white/20 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                <Globe className="w-32 h-32 text-white/20" />
              </div>
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-luxury-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse delay-75"></div>
              <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-blue-300 rounded-full shadow-[0_0_10px_rgba(147,197,253,0.8)] animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OurTeam;
