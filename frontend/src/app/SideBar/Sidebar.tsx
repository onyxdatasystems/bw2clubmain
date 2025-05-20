'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import SideNav from './SideNav';

interface Group {
  id: string;
  name: string;
  // Add other group properties as needed
}

interface SideBarProps {
  joinedGroups?: Group[];
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ joinedGroups = [], className = '' }) => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={toggleSideNav}
        aria-label={isSideNavVisible ? "Close sidebar" : "Open sidebar"}
      >
        <Image
          src={
            isSideNavVisible
              ? 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/close-icon.png'
              : 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/menu-icon.png'
          }
          alt={isSideNavVisible ? "Close menu" : "Open menu"}
          width={24}
          height={24}
          priority
        />
      </button>

      {/* Mobile Sidebar with overlay */}
      <AnimatePresence>
        {isSideNavVisible && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSideNav}
            />
            <motion.div
              className="fixed top-0 left-0 z-50 md:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className={`w-64 h-full bg-[#fff2f9] ${className}`}>
                <SideNav />
                {joinedGroups.map(group => (
                  <div key={group.id}>{group.name}</div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (part of document flow) */}
      <div className={`hidden md:block relative h-full w-64 bg-[#fff2f9] ${className}`}>
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SideNav />
          <div className="p-4">
            {joinedGroups.map(group => (
              <div key={group.id}>{group.name}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;