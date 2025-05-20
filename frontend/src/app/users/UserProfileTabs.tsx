"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { TabItem } from '../types/userProfileTypes';

interface UserProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs: TabItem[] = [
  { id: 'about', label: 'About' },
  { id: 'board', label: 'Board' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'support-bonds', label: 'Support Bonds' }
];

const UserProfileTabs: React.FC<UserProfileTabsProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <div className="w-full max-w-2xl border-b border-gray-100 px-6">
  <div className="flex gap-6 h-12">
    {tabs.map((tab) => (
      <motion.button
        key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 text-lg ${activeTab === tab.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
      
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`text-sm ${
              activeTab === tab.id ? 'text-indigo-400 font-medium' : 'text-gray-500'
            }`}>
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default UserProfileTabs;