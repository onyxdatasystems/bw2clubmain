<<<<<<< HEAD
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CommunityHeaderProps {
  groupId: string;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ groupId }) => {
  const [groupData, setGroupData] = useState({
    name: 'Loading...',
    isPrivate: true,
    backgroundImage: '/default-bg.jpg'
  });

  React.useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups_details/${groupId}`
        );
        const data = await response.json();
        setGroupData({
          name: data.title,
          isPrivate: data.isPrivate,
          backgroundImage: data.coverPhoto || '/default-bg.jpg'
        });
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };
    
    fetchGroupData();
  }, [groupId]);

  return (
    <motion.div 
      whileHover={{ scale: 1.005 }}
      className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md"
    >
      <Image 
        src={groupData.backgroundImage}
        alt="Community Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent to-[58.82%]" />
      
      <div className="absolute bottom-6 left-6 flex flex-col">
        <motion.h1 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-white text-2xl md:text-3xl font-medium tracking-[-0.5px] leading-[140%]"
        >
          {groupData.name}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center mt-2"
        >
          <Image 
            src={groupData.isPrivate ? 
              "https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/lock-pas.png" : 
              "https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/globe-pas.png"}
            alt={groupData.isPrivate ? 'Private' : 'Public'}
            width={14}
            height={14}
            className="mr-2"
          />
          <span className="text-white text-sm tracking-[-0.41px] leading-[140%]">
            {groupData.isPrivate ? 'Private Group' : 'Public Group'}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CommunityHeader;
=======
import React from 'react';
import Image from 'next/image';

interface CommunityHeaderProps {
  groupName?: string;
  isPrivate?: boolean;
  backgroundImage?: string;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({
  groupName = "Planet Savers",
  isPrivate = true,
  backgroundImage = "https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/unsplash.png"
}) => {
  return (
    <div className="relative w-full max-w-[548.84px] h-[313.43px] overflow-hidden">
      <div className="relative w-full h-full">
        <Image 
          src={backgroundImage}
          alt="Community Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent to-[58.82%]" />
      </div>
      
      <div className="absolute bottom-4 left-4 flex flex-col">
        <h1 className="text-white text-xl font-medium tracking-[-0.5px] leading-[140%]">
          {groupName}
        </h1>
        <div className="flex items-center mt-2">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/lock-pas.png"
            alt="Private"
            width={11}
            height={12}
            className="mr-2"
          />
          <span className="text-white text-[10px] tracking-[-0.41px] leading-[140%]">
            {isPrivate ? 'Private Group' : 'Public Group'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
