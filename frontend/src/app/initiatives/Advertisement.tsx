// src/components/Advertisement.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AppConfig, Animations } from '../../config/AppConfig';

interface AdvertisementProps {
  className?: string;
}

export class Advertisement extends React.Component<AdvertisementProps> {
  render() {
    return (
      <motion.div 
        className={`flex flex-col p-4 ${this.props.className}`}
        initial="hidden"
        animate="visible"
        variants={Animations.fadeIn}
      >
        <motion.div 
          className="rounded-lg bg-white p-4 h-[300px] shadow-md"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: AppConfig.transitions.medium }}
        >
          <motion.div 
            className="font-raleway font-bold text-sm mb-4"
            variants={Animations.slideUp}
          >
            Advertising
          </motion.div>
          <motion.div 
            className="border-t border-slate-300 w-full mb-4"
            variants={Animations.fadeIn}
          />
          <motion.div 
            className="relative w-full h-[241px] mx-auto rounded-2xl overflow-hidden"
            variants={Animations.scaleIn}
          >
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/rectangl-9.png"
              alt="Advertisement"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
}