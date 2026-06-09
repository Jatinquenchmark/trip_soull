import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Trigger HMR
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { blogs } from '../data/blogsData';

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-poppins pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative">
        <Link 
          to="/" 
          className="absolute left-6 top-0 md:top-2 inline-flex items-center gap-2 text-slate-500 hover:text-[#2B4A8C] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-blue-50 text-soul-blue px-5 py-2.5 rounded-full text-sm font-bold mb-6 border border-blue-100 uppercase tracking-widest shadow-sm mt-12 md:mt-0"
        >
          Travel Guides & Insights
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-[#2D2D2D] mb-6 tracking-tight"
        >
          TripSoul <span className="text-[#2B4A8C]">Blog</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Discover expert travel tips, detailed budget guides, and inspiration for your next unforgettable adventure.
        </motion.p>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div 
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-[#2B4A8C]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-8 flex flex-col flex-grow relative bg-white">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {blog.readTime}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-[#2B4A8C] transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <User className="w-4 h-4 text-soul-blue" /> {blog.author}
                  </div>
                  <Link 
                    to={`/blog/${blog.id}`} 
                    className="flex items-center gap-2 text-sm font-bold text-[#2B4A8C] group-hover:text-orange-500 transition-colors"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
