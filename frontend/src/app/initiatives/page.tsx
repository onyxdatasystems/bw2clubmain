<<<<<<< HEAD
// components/InitiativesPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/page";
import Sidebar from "../SideBar/page";
import { InitiativeDetails } from "./InitiativeDetails";
import { Advertisement } from "./Advertisement";

const InitiativesPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Top navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar (mobile + desktop handled internally) */}
        <Sidebar />

        {/* Main content: offset by sidebar's width on md+ */}
        <main className="flex-1 p-4 md:ml-64 overflow-y-auto">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
            {/* Initiative details (takes full width on mobile, 60% on large screens) */}
            <section className="w-full lg:w-3/5 p-4 bg-white rounded-lg shadow">
              <InitiativeDetails />
            </section>

            {/* Advertisement sidebar (hidden on mobile, 20% on large screens) */}
            {!isMobile && (
              <aside className="lg:w-1/5 p-4">
                <Advertisement />
              </aside>
            )}
          </div>

          {/* Mobile-only advertisement at the bottom */}
          {isMobile && (
            <div className="mt-6 p-4">
              <Advertisement />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InitiativesPage;
=======
'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import {InitiativeDetails} from './InitiativeDetails';
import {Advertisement} from './Advertisement';
import { AppConfig, Animations } from '../../config/AppConfig';

interface InitiativesPageState {
  isSideNavVisible: boolean;
}

export class InitiativesPage extends React.Component<{}, InitiativesPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isSideNavVisible: false,
    };
  }

  toggleSideNav = () => {
    this.setState({ isSideNavVisible: !this.state.isSideNavVisible });
  };

  render() {
    const { isSideNavVisible } = this.state;

    return (
      <motion.div
        className="flex flex-col min-h-screen bg-gray-200"
        initial="hidden"
        animate="visible"
        variants={Animations.fadeIn}
      >
        <Navbar />

        {/* Toggle button for small devices */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
          onClick={this.toggleSideNav}
        >
          <img
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

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSideNavVisible && (
            <motion.div
              className="fixed inset-0 z-40 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={this.toggleSideNav}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSideNavVisible && (
            <motion.div
              className="fixed top-0 left-0 z-50"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <SideBar size="sm" className="w-64 h-full" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex flex-grow"
          variants={Animations.slideUp}
        >
          {/* Permanent Sidebar for Medium and Larger Devices */}
          <div className="hidden md:block w-1/5">
            <SideBar size="md" />
          </div>

          <div className="flex flex-col md:flex-row flex-grow">
            <div className="w-full md:w-3/5 p-4">
              <InitiativeDetails />
            </div>

            <motion.div
              className="hidden md:block w-1/5 p-4"
              variants={Animations.scaleIn}
            >
              <Advertisement />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
}

export default InitiativesPage;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
