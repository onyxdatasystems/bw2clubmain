"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AdsProps {
  className?: string;
}

const Ads: React.FC<AdsProps> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`hidden lg:flex flex-col min-w-[225px] h-[300px] bg-white rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-2 border-t border-slate-300" />
      
      <motion.div 
        className="px-5 py-4 text-sm text-black font-inter"
        whileHover={{ scale: 1.02 }}
      >
        Advertising
      </motion.div>
      
      <div className="mx-2 border-t border-slate-300" />
      
      <motion.div 
        className="mx-2 mt-2 flex-grow"
        whileHover={{ scale: 1.01 }}
      >
        <div className="relative w-full h-[241px] rounded-[14px] overflow-hidden">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-qYrAz4-w8v6RuC/rectangl-13.png"
            alt="Advertisement"
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Ads;