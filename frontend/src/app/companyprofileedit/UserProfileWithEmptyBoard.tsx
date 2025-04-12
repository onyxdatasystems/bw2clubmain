"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import BaseProfile from './BaseProfile';

const UserProfileWithEmptyBoard: React.FC = () => {
  const postOptions = [
    { icon: "image-2.png", label: "Image" },
    { icon: "play-circ-2.png", label: "Video" },
    { icon: "papercli-2.png", label: "Attachment" }
  ];

  return (
    <BaseProfile
      avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-7.png"
      backgroundUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/rectangl-5.png"
    >
      {BaseProfile.prototype.renderTabs.call({ props: {} }, "Board")}
      
      {/* Post Composer */}
      <motion.div 
        className="mt-4 w-full p-4 border border-[#ebecef] rounded-lg bg-white shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex gap-4">
          <motion.div
            className="w-10 h-10 rounded-full bg-[#fa53f7] overflow-hidden"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/asset-2.png"
              alt="User"
              width={40}
              height={40}
              className="object-cover"
            />
          </motion.div>
          <div className="flex-1">
            <div
              className="border border-[#ebecef] rounded p-3.5 mb-4 focus-within:border-[#7171c1] focus-within:shadow-[0_0_0_1px_#7171c1]"
            >
              <input 
                type="text"
                placeholder="What's going on..."
                className="w-full text-sm text-[#898e9e] outline-none bg-transparent"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {postOptions.map((option, index) => (
                  <motion.button
                    key={option.label}
                    className="w-8 h-8 bg-[#ebecef] bg-opacity-60 rounded-full flex items-center justify-center"
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

      {/* Empty Board State */}
      <motion.div 
        className="mt-4 w-full py-14 border border-[#ebecef] rounded-lg bg-white flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/feed-ico.png"
            alt="Empty"
            width={80}
            height={80}
            className="opacity-70"
          />
        </motion.div>
        <motion.p 
          className="text-base font-semibold text-[#a5a9b5] mt-4"
          animate={{
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Your board is empty
        </motion.p>
        <motion.button
          className="mt-6 px-4 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full text-sm shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create First Post
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
            src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/edit-3.png" 
            alt="Create post" 
            width={24} 
            height={24} 
          />
        </motion.button>
      </motion.div>
    </BaseProfile>
  );
};

export default UserProfileWithEmptyBoard;