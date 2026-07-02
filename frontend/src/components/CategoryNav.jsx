import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Using Icons8 3D Fluency images for a premium 3D look
const categories = [
  { id: 'flights', label: 'Flights', iconUrl: 'https://img.icons8.com/fluency/96/airplane-take-off.png' },
  { id: 'hotels', label: 'Hotels', iconUrl: 'https://img.icons8.com/color/96/5-star-hotel.png' },
  { id: 'villas', label: 'Villas & Homestays', iconUrl: 'https://img.icons8.com/color/96/bungalow.png' },
  { id: 'packages', label: 'Holiday Packages', iconUrl: 'https://img.icons8.com/fluency/96/beach-umbrella.png' }
];

const CategoryNav = () => {
  const [activeId, setActiveId] = useState('packages');
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    setActiveId(id);
    if (id === 'flights') {
      navigate('/flights');
    } else if (id === 'packages') {
      navigate('/packages');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 md:px-4 relative z-50 mb-8 md:mb-12">
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-1.5 md:p-3 flex flex-row justify-between w-full">
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative flex flex-col items-center justify-start flex-1 gap-1.5 md:gap-2 pb-2 md:pb-3 transition-all duration-300 outline-none"
            >
              {/* 3D Icon using Icons8 */}
              <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 flex items-center justify-center drop-shadow-md group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-300 mt-1">
                <img src={cat.iconUrl} alt={cat.label} className="w-full h-full object-contain filter drop-shadow-sm" />
              </div>
              
              <span className={`text-[9.5px] sm:text-[11px] md:text-[14px] leading-tight font-bold text-center transition-colors duration-300 px-0.5 ${isActive ? 'text-[#008cff]' : 'text-[#4a4a4a] group-hover:text-[#008cff]'}`}>
                {cat.label}
              </span>
              
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                  <motion.div 
                    layoutId="activeMMTTab"
                    className="w-[60%] sm:w-[70%] md:w-[80%] h-[2.5px] md:h-[3px] bg-[#008cff] rounded-t-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNav;
