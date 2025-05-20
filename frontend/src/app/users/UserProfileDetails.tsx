"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { UserInfo } from '../types/userProfileTypes';

interface UserProfileDetailsProps {
  user: UserInfo;
}

const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({ user }) => {
  return (
    <motion.div 
      className="p-4 flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/briefcas-6.png" 
            width={14} 
            height={14} 
            alt="work" 
          />
          <span className="text-sm text-gray-900">
            {user.worksAt || "Works as Founder at Better Women Better World"}
          </span>
        </div>

        <div className="flex items-start gap-2">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/graduati-6.png" 
            width={14} 
            height={14} 
            alt="education" 
          />
          <span className="text-sm text-gray-900 leading-tight">
            {user.education || "Studied Bachelor of Arts in Tourism and Leisure Management at EU Business School Barcelona"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/cake-1-6.png" 
            width={14} 
            height={14} 
            alt="birthday" 
          />
          <span className="text-sm text-gray-900">
            {user.birthDate ? `Born on ${user.birthDate}` : "Born on August 2, 1988"}
          </span>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/leo-svgr-6.png" 
              width={14} 
              height={14} 
              alt="zodiac" 
            />
            <span className="text-sm text-gray-900">
              {user.zodiac || "Leo"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/globe-2-6.png" 
              width={14} 
              height={14} 
              alt="language" 
            />
            <span className="text-sm text-gray-900">
              {user.language || "English"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfileDetails;