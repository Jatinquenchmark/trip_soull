import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { blogs } from '../data/blogsData';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Blog not found</h2>
        <button onClick={() => navigate('/blogs')} className="text-soul-blue hover:underline font-semibold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-poppins pt-24 pb-24">
      
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 w-full">
          <div className="max-w-4xl mx-auto px-6 pb-12">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blogs
            </Link>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black text-white leading-tight mb-6"
            >
              {blog.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-6 text-white/90 text-sm font-medium"
            >
              <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                <User className="w-4 h-4" /> {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {blog.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {blog.readTime}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-white">
          <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-[#2B4A8C]">
            {blog.content}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-800">Share this post:</span>
            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#2B4A8C] hover:text-white transition-all shadow-sm border border-slate-200">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
