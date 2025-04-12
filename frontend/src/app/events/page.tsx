"use client";
import React, { useState } from "react";
import Navbar from "../Navbar/page";
import SideBar from "../SideBar/page";
import EventCard from "./EventCard";
import Advertisement from "./Advertisement";
import { motion, AnimatePresence } from "framer-motion";

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
            <>
              {/* Background Overlay */}
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
              />
              {/* Sidebar */}
              <motion.div
                className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
                initial={{ x: -250 }}
                animate={{ x: 0 }}
                exit={{ x: -250 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <SideBar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-grow w-3/5 p-5">
          <h2 className="text-lg font-semibold text-[#292b32]">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EventCard imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-3.png" />
            <EventCard imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-4.png" />
            <EventCard imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-5.png" />
            <EventCard imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-6.png" />
          </div>

          <h2 className="text-lg font-semibold mt-8 text-[#292b32]">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EventCard imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-7.png" />
            <EventCard imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-8.png" />
            <EventCard imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-9.png" />
            <EventCard imageUrl="https://dashboard.codeparrot.ai/api/image/Z-0BCwz4-w8v6R90/rectangl-10.png" />
          </div>
        </div>

        {/* Ads Section */}
        <div className="w-1/4 hidden lg:block">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Layout;
