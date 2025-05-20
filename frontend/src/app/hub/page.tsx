<<<<<<< HEAD
// components/HomePage.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/page";
import SideNav from "../SideBar/page";
import ContentCards from "./ContentCards";
import AdsSection from "./AdsSection";
import Image from "next/image";


const HomePage: React.FC = () => {
  const [isSideNavVisible, setSideNavVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'people' | 'companies'>('people');
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
    
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleSideNav = () => setSideNavVisible((v) => !v);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Top navbar */}
      <Navbar />

      {/* Mobile toggle button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
          onClick={toggleSideNav}
          aria-label="Toggle sidebar"
        >
          <Image
            src={
              isSideNavVisible
                ? "/icons/close-icon.png"
                : "/icons/menu-icon.png"
            }
            alt=""
            width={24}
            height={24}
          />
        </button>
      )}

      {/* Mobile drawer */}
      <AnimatePresence>
        {isSideNavVisible && isMobile && (
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSideNav}
            />
<<<<<<< HEAD
            <motion.aside
              className="fixed top-0 left-0 z-50 w-64 h-full bg-white p-4"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <SideNav />
            </motion.aside>
=======
            <motion.div
              className="fixed top-0 left-0 z-50"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <SideNav className="w-64 h-full" size="sm" />
            </motion.div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
          </>
        )}
      </AnimatePresence>

<<<<<<< HEAD
      <div className="flex flex-1 pt-0">
        {/* Permanent sidebar on md+ */}
        <aside className="hidden md:block w-64 bg-white p-4">
          <SideNav  />
        </aside>

        {/* Main + Ads */}
        <main className="flex-1 flex flex-col lg:flex-row">
          {/* Content area */}
          <section className="flex-1 p-4 lg:ml-0">
            <div className="flex justify-center mt-4 space-x-2">
              <button 
                className={`px-4 py-2 rounded-full shadow-md ${activeTab === 'people' ? 'bg-[#6767B7] text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab('people')}
              >
                People
              </button>
              <button 
                className={`px-4 py-2 rounded-full shadow-md ${activeTab === 'companies' ? 'bg-[#6767B7] text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab('companies')}
              >
                Companies
              </button>
            </div>

            <ContentCards className="mt-6" activeTab={activeTab} />
          </section>

          {/* Ads on lg+ */}
          <aside className="hidden lg:block w-56 p-4">
            <AdsSection />
          </aside>
        </main>
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default HomePage;
=======
export default HomePage;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
