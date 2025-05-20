// UserProfileHeader.tsx
"use client"
import React from 'react';
import Image from 'next/image';
import { UserInfo } from '../types/userProfileTypes';

interface UserProfileHeaderProps {
  user: UserInfo;
  onSupport: () => void;
  onMessage: () => void;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ 
  user, 
  onSupport, 
  onMessage 
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-b from-white to-indigo-50">
      {/* Status Bar - Only shown on mobile */}
      <div className="flex justify-between items-center px-8 h-20 lg:hidden">
        <div className="text-xl md:text-2xl font-semibold text-gray-900"></div>
        <Image 
          src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/levels-6.png" 
          alt="Levels" 
          width={64} 
          height={25} 
        />
      </div>

      {/* Header Bar - Only shown on mobile */}
      <div className="flex justify-between items-center px-3 h-12 bg-black bg-opacity-20 backdrop-blur-md lg:hidden">
        <button className="w-8 h-8 rounded-full border border-white bg-black bg-opacity-20 flex items-center justify-center">
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/arrow-ri-6.png" 
            alt="Back" 
            width={18} 
            height={18} 
          />
        </button>

        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-black bg-opacity-20 flex items-center justify-center">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/search-6.png" 
              alt="Search" 
              width={18} 
              height={18} 
            />
          </button>
          <button className="w-8 h-8 rounded-full bg-black bg-opacity-20 flex items-center justify-center">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/dots-thr-8.png" 
              alt="Menu" 
              width={18} 
              height={18} 
            />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-6 flex flex-col gap-4 md:flex-row md:items-center">
        <Image 
          src={user.avatar || "https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-8.png"} 
          alt="Avatar" 
          width={80} 
          height={80} 
          className="rounded-full"
        />
        <div className="flex-1 flex justify-between items-center">
          <span className="text-xl md:text-2xl font-medium text-gray-900">
            {user.name || "Ksenija Nikolova"}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={onMessage}
              className="w-8 h-8 rounded-full border border-indigo-300 bg-transparent flex items-center justify-center"
            >
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/paper-pl-8.png" 
                alt="Message" 
                width={16} 
                height={16} 
              />
            </button>
            <button 
              onClick={onSupport}
              className="h-8 px-3 rounded-full bg-gradient-to-b from-indigo-200 to-indigo-100 text-white text-sm font-medium"
            >
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;