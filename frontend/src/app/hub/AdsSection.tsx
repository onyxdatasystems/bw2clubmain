// src/components/AdsSection.tsx
'use client';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Animations } from '../../config/Config';
import { AdService } from './services/ApiService';

interface AdData {
  id: number;
  imageUrl: string;
  altText: string;
  link?: string;
}
=======
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Animations } from '../../config/Config';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

interface AdsSectionProps {
  className?: string;
}

const AdsSection: React.FC<AdsSectionProps> = ({ className = '' }) => {
<<<<<<< HEAD
  const [ads, setAds] = useState<AdData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adService = new AdService();
        const response = await adService.getAds();
        setAds(response.data || []);
      } catch (err) {
        setError('Failed to load ads');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <div className={`min-w-[225px] ${className}`}>Loading ads...</div>;
  if (error) return <div className={`min-w-[225px] ${className}`}>{error}</div>;

=======
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  return (
    <motion.div 
      className={`flex flex-col min-w-[225px] ${className}`}
      initial="hidden"
      animate="visible"
      variants={Animations.fadeIn}
    >
<<<<<<< HEAD
      {ads.map((ad) => (
        <motion.div 
          key={ad.id}
          className="bg-white rounded-lg p-4 shadow mb-4"
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
            className="relative w-full h-[241px] mx-auto rounded-[14px] overflow-hidden"
            variants={Animations.scaleIn}
          >
            <Image 
              src={ad.imageUrl}
              alt={ad.altText}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </motion.div>
        </motion.div>
      ))}
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </motion.div>
  );
};

export default AdsSection;