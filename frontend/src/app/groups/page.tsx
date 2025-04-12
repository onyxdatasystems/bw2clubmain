'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '../Navbar/page'; // Adjusted the path to match the correct location
import SideBar from '../SideBar/page';
import CreateThematicGroup from './ThematicGroupList';
import ThematicGroupList from './ThematicGroupList';

const Layout: React.FC = () => {
  const [isSideNavVisible, setSideNavVisible] = useState(false);

  const toggleSideNav = () => setSideNavVisible(!isSideNavVisible);

  return (
    <div className="flex flex-col h-screen w-full bg-[#f8f9fa] relative">
      <Navbar />

      {/* Toggle button for small devices */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={toggleSideNav}
      >
        <Image
          src={
            isSideNavVisible
              ? 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/close-icon.png'
              : 'https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/menu-icon.png'
          }
          alt="Toggle Sidebar"
          width={24}
          height={24}
        />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSideNavVisible && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSideNav}
            />
            <motion.div
              className="fixed top-0 left-0 z-50"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <SideBar size="sm" className="w-64 h-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-row w-full h-full">
        {/* Permanent Sidebar for Medium and Larger Devices */}
        <div className="hidden md:block flex-none w-1/5 bg-[#fff2f9]">
          <SideBar size="md" />
        </div>
        <div className="flex-grow w-4/5 p-6">
          <CreateThematicGroup />
          <ThematicGroupList />
        </div>
      </div>
    </div>
  );
};

export default Layout;
