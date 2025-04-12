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

        {/* Main Content Area */}
        <div className="flex-1 mx-4">
          <JobList_SideNav_Ads_JobDetails />
        </div>

        {/* Ads Section */}
        <div className="w-1/4 hidden lg:block">
          {/* You can add Ads content here */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
