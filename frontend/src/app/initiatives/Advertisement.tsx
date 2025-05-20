// src/components/Advertisement.tsx
'use client';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React from 'react';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AppConfig, Animations } from '../../config/AppConfig';

<<<<<<< HEAD
interface AdvertisementData {
  id: string;
  imageUrl: string;
  altText: string;
  link?: string;
}

export const Advertisement: React.FC<{ className?: string }> = ({ className }) => {
  const [adData, setAdData] = useState<AdvertisementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/advertisements`);
        if (!response.ok) throw new Error('Failed to fetch advertisement');
        const data = await response.json();
        setAdData(data[0]); // Assuming we get an array and take the first ad
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, []);

  if (loading) return (
    <motion.div 
      className={`flex flex-col p-4 ${className}`}
      initial="hidden"
      animate="visible"
      variants={Animations.fadeIn}
    >
      <div className="rounded-lg bg-white p-4 h-[300px] shadow-md flex items-center justify-center">
        <div className="animate-pulse">Loading advertisement...</div>
      </div>
    </motion.div>
  );

  if (error) return (
    <motion.div 
      className={`flex flex-col p-4 ${className}`}
      initial="hidden"
      animate="visible"
      variants={Animations.fadeIn}
    >
      <div className="rounded-lg bg-white p-4 h-[300px] shadow-md flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    </motion.div>
  );

  return (
    <motion.div 
      className={`flex flex-col p-4 ${className}`}
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
          {adData && (
            <Image 
              src={adData.imageUrl}
              alt={adData.altText}
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
<<<<<<< HEAD
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
=======
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
