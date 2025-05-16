"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Advertisement Component with OOP and animations
class Advertisement {
  constructor(
    public imageUrl: string,
    public className: string = ''
  ) {}

  render() {
    return (
      <motion.div
        className={`flex flex-col bg-white rounded-lg p-4 min-w-[225px] h-[300px] shadow-lg ${this.className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.h2 
          className="font-raleway font-bold text-sm text-black mb-4 ml-[22px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Advertising
        </motion.h2>
        
        <motion.div 
          className="border-t border-slate-300"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div 
          className="relative flex-grow mt-4 overflow-hidden rounded-[14px]"
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src={this.imageUrl}
            alt="Advertisement"
            fill
            className="object-cover"
            sizes="(max-width: 225px) 100vw, 225px"
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </motion.div>
    );
  }
}

interface AdsProps {
  className?: string;
}

const Ads: React.FC<AdsProps> = ({ className = '' }) => {
  const ad = new Advertisement(
    "https://dashboard.codeparrot.ai/api/image/Z-vEdHn5m-GBkPRe/rectangl.png",
    className
  );
  return ad.render();
};

export default Ads;