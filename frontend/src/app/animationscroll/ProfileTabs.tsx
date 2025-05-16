"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProfileTabsProps {
  className?: string;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('About');
  const tabs = ['About', 'Board', 'Gallery', 'Support Bonds'];

  return (
    <motion.div 
      className={`bg-white rounded-lg border border-gray-100 p-0 h-12 flex items-center ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex w-full justify-around">
        {tabs.map((tab) => (
          <motion.div 
            key={tab}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
          >
            <span className={`text-sm ${activeTab === tab ? 'text-indigo-400' : 'text-gray-300'}`}>
              {tab}
            </span>
            {activeTab === tab && (
              <motion.div 
                className="h-0.5 w-full bg-indigo-400 mt-1"
                layoutId="underline"
                transition={{ type: 'spring', bounce: 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileTabs;