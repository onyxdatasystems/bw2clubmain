<<<<<<< HEAD
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfileEngagementStatsProps {
  groupId: string;
}

const ProfileEngagementStats: React.FC<ProfileEngagementStatsProps> = ({ groupId }) => {
  const [stats, setStats] = useState({
    posts: 0,
    members: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups_details/${groupId}`
        );
        const data = await response.json();
        setStats({
          posts: data.postsCount || 0,
          members: data.membersCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, [groupId]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex justify-between items-center w-full p-4 bg-white rounded-lg shadow-sm"
    >
      <div className="flex gap-5">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center min-w-[80px]"
        >
          <span className="text-lg font-semibold leading-[24px] text-gray-900">
            {stats.posts}
          </span>
          <span className="text-sm leading-[140%] text-gray-500">
            posts
          </span>
        </motion.div>
        <div className="h-[22px] w-[1px] bg-gray-200 my-auto" />
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center min-w-[80px]"
        >
          <span className="text-lg font-semibold leading-[24px] text-gray-900">
            {stats.members}
          </span>
          <span className="text-sm leading-[140%] text-gray-500">
            members
          </span>
        </motion.div>
      </div>
      <motion.div 
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
      >
=======
import React from 'react';
import Image from 'next/image';

interface ProfileEngagementStatsProps {
  posts?: number;
  members?: number;
}

const ProfileEngagementStats: React.FC<ProfileEngagementStatsProps> = ({
  posts = 0,
  members = 1
}) => {
  return (
    <div className="flex justify-between items-center w-full max-w-[548.84px] p-4 bg-white">
      <div className="flex gap-5">
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-[16px] font-semibold leading-[24px] text-[#292b32]">
            {posts}
          </span>
          <span className="text-[14px] leading-[140%] text-[#898e9e]">
            posts
          </span>
        </div>
        <div className="h-[22px] w-[1px] bg-[#e5e5e5] my-auto" />
        <div className="flex flex-col items-center min-w-[80px]">
          <span className="text-[16px] font-semibold leading-[24px] text-[#292b32]">
            {members}
          </span>
          <span className="text-[14px] leading-[140%] text-[#898e9e]">
            members
          </span>
        </div>
      </div>
      <div className="w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full">
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
        <Image 
          src="https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/frame-20.png"
          alt="More options"
          width={15}
          height={4}
        />
<<<<<<< HEAD
      </motion.div>
    </motion.div>
  );
};

export default ProfileEngagementStats;
=======
      </div>
    </div>
  );
};

export default ProfileEngagementStats;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
