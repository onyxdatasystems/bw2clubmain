<<<<<<< HEAD
"use client";

import React from 'react';
import Navbar from '../Navbar/page';
import Sidebar from '../SideBar/Sidebar';
import JobList_SideNav_Ads_JobDetails from './JobList_SideNav_Ads_JobDetails';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f6f6f6]">
      <Navbar />

    <div className="flex">
      <Sidebar joinedGroups={[{id: '1', name: 'Group A'}]} />
      <main className="flex-1 p-6 md:ml-64">
=======
"use client"
import React, { useState } from 'react';
import Navbar from '../Navbar/page';
import SideBar from "../SideBar/page";
import JobList_SideNav_Ads_JobDetails from './JobList_SideNav_Ads_JobDetails';
import { AnimatePresence, motion } from 'framer-motion';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f6f6f6]">
      {/* Navbar - Always Visible */}
      <div className="w-full bg-white shadow-md sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Sidebar Toggle Button (Only for Small Screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "✖" : "☰"}
      </button>

      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Sidebar (Always Visible, but Toggles on Small Screens) */}
        <div className="w-64 min-w-[250px] h-screen bg-white shadow-md hidden md:block">
          <SideBar />
        </div>

        {/* Mobile Sidebar (Toggles on Small Screens) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="md:hidden fixed top-0 left-0 w-64 h-screen bg-white shadow-md z-50"
            >
              <SideBar />
            </motion.div>
          )}
        </AnimatePresence>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

        {/* Main Content Area */}
        <div className="flex-1 mx-4">
          <JobList_SideNav_Ads_JobDetails />
        </div>

        {/* Ads Section */}
<<<<<<< HEAD
        <div className="w-64 hidden xl:block bg-white shadow px-4 py-6">
          <p className="text-gray-500 text-sm">Ads Space</p>
        </div>
        </main>
=======
        <div className="w-1/4 hidden lg:block">
          {/* You can add Ads content here */}
        </div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      </div>
    </div>
  );
};

export default Layout;
