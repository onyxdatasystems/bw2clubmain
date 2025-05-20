<<<<<<< HEAD
"use client";
import { motion } from "framer-motion";
import React from "react";
import Navbar from "../Navbar/page";
import Sidebar from "../SideBar/page";
import UserProfileWithPosts from "./UserProfileWithPosts";
import UserProfileWithGallery from "./UserProfileWithGallery";
import UserProfileWithEmptyBoard from "./UserProfileWithEmptyBoard";
import UserProfileWithPostsAndFeedback from "./UserProfileWithPostsAndFeedback";
import UserProfileWithAbout from "./UserProfileWithAbout";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Layout: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="flex">
          <Sidebar joinedGroups={[{id: '1', name: 'Group A'}]} />
      <main className="flex-1 p-6 md:ml-64">

        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item}>
              <UserProfileWithPosts />
            </motion.div>

            <motion.div variants={item}>
              <UserProfileWithGallery />
            </motion.div>

            <motion.div variants={item}>
              <UserProfileWithEmptyBoard />
            </motion.div>

            <motion.div variants={item}>
              <UserProfileWithPostsAndFeedback />
            </motion.div>

            <motion.div variants={item}>
              <UserProfileWithAbout />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  </div>
);

export default Layout;
=======
// components/Layout.tsx
"use client";
import { motion } from 'framer-motion';
import React from 'react';
import BaseProfile from './BaseProfile';
import UserProfileWithPosts from './UserProfileWithPosts';
import UserProfileWithGallery from './UserProfileWithGallery';
import UserProfileWithEmptyBoard from './UserProfileWithEmptyBoard';
import UserProfileWithPostsAndFeedback from './UserProfileWithPostsAndFeedback';
import UserProfileWithAbout from './UserProfileWithAbout';

const Layout: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-[#f7f7ff] to-[#e6e6f9] p-4 md:p-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
        >
          <motion.div variants={item}>
            <BaseProfile />
          </motion.div>
          
          <motion.div variants={item}>
            <UserProfileWithPosts />
          </motion.div>
          
          <motion.div variants={item}>
            <UserProfileWithGallery />
          </motion.div>
          
          <motion.div variants={item}>
            <UserProfileWithEmptyBoard />
          </motion.div>
          
          <motion.div variants={item}>
            <UserProfileWithPostsAndFeedback />
          </motion.div>
          
          <motion.div variants={item}>
            <UserProfileWithAbout />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Layout;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
