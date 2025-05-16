// src/components/AdsSection.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Animations } from '../../config/Config';

interface AdsSectionProps {
  className?: string;
}

const AdsSection: React.FC<AdsSectionProps> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`flex flex-col min-w-[225px] ${className}`}
      initial="hidden"
      animate="visible"
      variants={Animations.fadeIn}
    >
      <motion.div 
        className="bg-white rounded-lg p-4 shadow"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="text-sm mb-4 ml-[22px] font-inter font-normal leading-[20px]"
          variants={Animations.slideUp}
        >
          Advertising
        </motion.div>
        <motion.div 
          className="border-t border-slate-300 my-2" 
          variants={Animations.fadeIn}
        />
        <motion.div 
          className="relative w-[210px] h-[241px] mx-auto rounded-[14px] overflow-hidden"
          variants={Animations.scaleIn}
        >
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-uvA3n5m-GBkPQS/rectangl-2.png"
            alt="Advertisement"
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdsSection;