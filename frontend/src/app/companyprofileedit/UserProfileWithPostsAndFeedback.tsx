// components/UserProfileWithPostsAndFeedback.tsx
"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import BaseProfile from './BaseProfile';

const UserProfileWithPostsAndFeedback: React.FC = () => {
  return (
    <BaseProfile
      name="Better Women Better World"
      role="Social Networking Platform"
      location="Mid, Delaware"
      establishedDate="Established on August 2, 2021"
      website="Visit website"
      avatarUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-5.png"
      backgroundUrl="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/rectangl-3.png"
    >
      {BaseProfile.prototype.renderTabs.call({ props: {} }, "Board")}
      
      <motion.div 
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {/* Post Composer */}
        <motion.div 
          className="border border-[#ebecef] rounded-lg p-4 bg-white shadow-sm"
          whileHover={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="flex gap-3">
            <motion.div 
              className="w-10 h-10 rounded-full bg-[#fa53f7] overflow-hidden"
              whileHover={{ rotate: 5 }}
            >
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/asset.png"
                alt="User"
                width={40}
                height={40}
              />
            </motion.div>
            <div className="flex-1">
              <motion.input 
                type="text" 
                placeholder="What's going on..." 
                className="w-full p-3 border border-[#ebecef] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#7171c1] focus:border-transparent"
                whileFocus={{ scale: 1.01 }}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  {["image", "video", "attachment"].map((type, index) => (
                    <motion.button
                      key={type}
                      className="w-8 h-8 bg-[#ebecef] rounded-full opacity-60 flex items-center justify-center"
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Image 
                        src={`https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/${type}.png`}
                        alt={type}
                        width={24}
                        height={24}
                      />
                    </motion.button>
                  ))}
                </div>
                <motion.button 
                  className="px-3 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post Example */}
        <motion.div 
          className="border border-[#ebecef] rounded-lg bg-white shadow-sm overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ y: -3 }}
        >
          {/* Post content */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex gap-4">
              <motion.div whileHover={{ rotate: 5 }}>
                <Image 
                  src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/avatar-6.png" 
                  alt="Post author" 
                  width={40} 
                  height={40} 
                  className="rounded-full"
                />
              </motion.div>
              <div>
                <h3 className="font-normal text-sm">Jackie Jonnes</h3>
                <span className="text-sm text-[#636878]">30 mins</span>
              </div>
            </div>
            <motion.button whileHover={{ rotate: 90 }}>
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/frame-20.png" 
                alt="More" 
                width={15} 
                height={4} 
              />
            </motion.button>
          </div>
          
          <div className="px-4 pb-4">
            <p className="text-sm text-[#292b32]">
              Consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. 
              Fusce vulputate odio varius, lacinia nisi in,...Read more
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.01 }}>
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-zoFgz4-w8v6R80/1-image.png" 
              alt="Post image" 
              width={512} 
              height={327} 
              className="w-full"
            />
          </motion.div>

          {/* Post interactions */}
          <motion.div 
            className="border-t border-[#e5e5e5] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {/* ... rest of the post interactions ... */}
          </motion.div>
        </motion.div>
      </motion.div>
    </BaseProfile>
  );
};

export default UserProfileWithPostsAndFeedback;