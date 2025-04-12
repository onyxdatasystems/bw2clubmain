// components/UserProfileWithGallery.tsx
"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import BaseProfile from './BaseProfile';

const UserProfileWithGallery: React.FC = () => {
  const galleryItems = [
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai-2.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai-3.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai-4.png",
    "https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/thumbnai-5.png"
  ];

  return (
    <BaseProfile 
      name="Better Women Better World"
      role="Social Networking Platform"
      location="Mid, Delaware"
      establishedDate="Established on August 2, 2021"
      website="Visit website"
      avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-8.png"
      backgroundUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/rectangl-7.png"
    >
      {BaseProfile.prototype.renderTabs.call({ props: {} }, "Gallery")}
      
      <motion.div 
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div 
          className="grid grid-cols-3 gap-2"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.7
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="rounded-lg overflow-hidden shadow-md"
            >
              <Image 
                src={item}
                alt={`Gallery ${index + 1}`}
                width={174}
                height={167}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </BaseProfile>
  );
};

export default UserProfileWithGallery;