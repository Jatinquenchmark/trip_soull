import React from 'react';
import { Star, Quote, MapPin, CheckCircle2, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';

import HeroBg from '../assets/dubai-cityscape.avif'; // Using existing image for hero

const fakeReviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    type: "Couples",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    date: "May 15, 2026",
    trip: "Bali Explorer",
    tripImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80",
    text: "TripSoul completely exceeded our expectations! Every detail was handled perfectly, from the boutique hotels to the private guided tours. We didn't have to worry about a single thing. Truly the most relaxing vacation we've ever had. The private dinner on the beach was the highlight of our entire year."
  },
  {
    id: 2,
    name: "Rahul Sharma",
    type: "Family",
    location: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    date: "April 22, 2026",
    trip: "Swiss Alps Adventure",
    tripImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=500&q=80",
    text: "The itinerary was perfectly balanced for our family. We had enough planned activities to see the best of Switzerland, but also enough free time to explore on our own. The train passes and hotel bookings were flawless."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    type: "Solo",
    location: "Madrid, Spain",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 4,
    date: "June 02, 2026",
    trip: "Japan Cultural Tour",
    tripImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80",
    text: "An amazing cultural deep dive. Our guide in Kyoto was phenomenal and the tea ceremony was a highlight. The only reason for 4 stars instead of 5 is that the bullet train connection was a bit tight, but everything else was magical. As a solo traveler, I felt completely safe and well taken care of."
  },
  {
    id: 4,
    name: "James Wilson",
    type: "Friends",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    date: "March 10, 2026",
    trip: "Dubai Luxury Getaway",
    tripImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80",
    text: "If you want luxury, book with TripSoul. They got us upgrades at the hotel and a private desert safari that was just unbelievable. Highly recommend their premium packages! The whole experience felt incredibly VIP from touchdown to takeoff."
  },
  {
    id: 5,
    name: "Priya Patel",
    type: "Couples",
    location: "Toronto, Canada",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    rating: 5,
    date: "January 28, 2026",
    trip: "Maldives Honeymoon",
    tripImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80",
    text: "Our honeymoon was absolute perfection. The water villa recommendation was spot on. TripSoul made sure we were treated like royalty from the moment we landed in Male. The sunset cruise they organized as a surprise was the most romantic thing ever."
  },
  {
    id: 6,
    name: "David Chen",
    type: "Solo",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    rating: 5,
    date: "February 14, 2026",
    trip: "Vietnam Highlights",
    tripImage: "https://images.unsplash.com/photo-1528127269322-539801943592?w=500&q=80",
    text: "Cruising through Halong Bay was breathtaking. The local food tours arranged by the TripSoul team were authentic and delicious. Great value for the price and impeccable service. I've recommended them to all my friends."
  }
];

const Reviews = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-poppins pb-24">
      
      {/* Premium Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={HeroBg} alt="Travel Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#FAFAFA]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
            Rated 4.9/5 by 10,000+ Travelers
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Real Stories from <br />Real Travelers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto"
          >
            Discover why thousands of explorers choose TripSoul for their unforgettable journeys across the globe.
          </motion.p>
        </div>
      </section>

      {/* Masonry Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {fakeReviews.map((review, index) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 break-inside-avoid"
            >
              <div className="p-6 pt-8 relative">
                <div className="absolute top-0 right-0 bg-blue-50/50 px-4 py-1 rounded-bl-2xl rounded-tr-3xl text-xs font-semibold text-soul-blue border-b border-l border-blue-100/50">
                  {review.type} • {review.trip}
                </div>
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100 rotate-180" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? 'fill-luxury-gold text-luxury-gold' : 'fill-slate-100 text-slate-100'}`} 
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 font-medium leading-relaxed mb-6 text-[15px]">
                  "{review.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1">
                        {review.name}
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {review.location}
                      </p>
                    </div>
                  </div>
                  <button className="text-slate-300 hover:text-soul-blue transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-24">
        <div className="bg-[#1A2E5E] rounded-[40px] p-10 md:p-16 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 tracking-tight">Experience it for yourself</h2>
          <p className="text-blue-100/80 mb-10 max-w-xl mx-auto relative z-10 font-medium text-lg">
            Stop reading about other people's perfect vacations. Let us craft the journey of a lifetime just for you.
          </p>
          <a href="/packages" className="inline-flex items-center justify-center bg-luxury-gold text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-yellow-500 hover:-translate-y-1 transition-all relative z-10 text-lg">
            Plan Your Trip Now
          </a>
        </div>
      </div>

    </div>
  );
};

export default Reviews;
