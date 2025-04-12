'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar/page';
import SideNav from '../SideBar/page';
import ContentCards from './ContentCards';
import AdsSection from './AdsSection';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  const [isSideNavVisible, setSideNavVisible] = useState(false);

  const toggleSideNav = () => setSideNavVisible(!isSideNavVisible);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200 relative">
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
              <SideNav className="w-64 h-full" size="sm" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-grow">
        {/* Permanent Sidebar for Medium and Larger Devices */}
        <div className="hidden md:block flex-none w-64">
          <SideNav className="w-64" size="md" />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between">
            <div className="flex flex-col flex-grow">
              <div className="flex justify-center mt-4">
                <button className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-md mx-2">
                  People
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-md mx-2">
                  Companies
                </button>
              </div>
              <ContentCards className="flex-grow" />
            </div>
            <div className="hidden md:block flex-none w-56">
              <AdsSection className="w-56" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
