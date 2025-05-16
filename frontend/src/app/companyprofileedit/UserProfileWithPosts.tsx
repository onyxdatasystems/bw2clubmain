"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import BaseProfile from './BaseProfile';

const UserProfileWithPosts: React.FC = () => {
  const postOptions = [
    { icon: "image-3.png", label: "Image" },
    { icon: "play-circ-3.png", label: "Video" },
    { icon: "papercli-3.png", label: "Attachment" }
  ];

  return (
    <BaseProfile
      avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-9.png"
      backgroundUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/rectangl-9.png"
    >
      {BaseProfile.prototype.renderTabs.call({ props: {} }, "Gallery")}
      
      {/* Post Composer */}
      <motion.div 
        className="bg-white rounded-lg border border-[#ebecef] p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex gap-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-[#fa53f7] overflow-hidden"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/asset-3.png"
              alt="User"
              width={40}
              height={40}
              className="object-cover"
            />
          </motion.div>
          
          <div className="flex-1">
            <div 
              className="border border-[#ebecef] rounded p-3.5 mb-3 focus-within:border-[#7171c1] focus-within:shadow-[0_0_0_1px_#7171c1]"
            >
              <motion.input
                type="text"
                placeholder="What's going on..."
                className="w-full text-sm text-[#898e9e] outline-none bg-transparent"
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {postOptions.map((option, index) => (
                  <motion.button
                    key={option.label}
                    className="w-8 h-8 rounded-full bg-[#ebecef]/60 flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(113, 113, 193, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Image
                      src={`https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/${option.icon}`}
                      alt={option.label}
                      width={20}
                      height={20}
                    />
                  </motion.button>
                ))}
              </div>
              <motion.button 
                className="px-3 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full text-sm shadow-md"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 4px 15px rgba(103, 103, 183, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Post
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Empty Gallery State */}
      <motion.div 
        className="bg-white rounded-lg border border-[#ebecef] p-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/image-1.png"
            alt="No photos"
            width={95}
            height={95}
            className="opacity-70"
          />
        </motion.div>
        <motion.p 
          className="text-[14px] font-semibold text-[#a5a9b5] mt-2"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          No photos yet
        </motion.p>
        <motion.button
          className="mt-4 px-4 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full text-sm shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Upload First Photo
        </motion.button>
      </motion.div>

      {/* Floating action button for mobile */}
      <motion.div
        className="fixed bottom-6 right-6 md:hidden z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 1,
          type: "spring",
          stiffness: 500,
          damping: 15
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-br from-[#fa53f7] to-[#8585d5] text-white rounded-full shadow-xl flex items-center justify-center"
        >
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/image-3.png" 
            alt="Add photo" 
            width={24} 
            height={24} 
          />
        </motion.button>
      </motion.div>
    </BaseProfile>
  );
};

export default UserProfileWithPosts;