"use client"
import React from 'react';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import PostCompose from './PostCompose';
import Post from './Post';
import Ads from './Ads';
import { motion } from 'framer-motion';

// Layout Manager with responsive design
class LayoutManager {
  static pageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  };

  static contentAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3 }
  };
}

const Layout: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100"
      {...LayoutManager.pageAnimation}
    >
      <Navbar />
      <motion.div 
        className="flex flex-row flex-grow"
        {...LayoutManager.contentAnimation}
      >
        <SideBar className="hidden md:flex flex-none w-1/5" />
        <main className="flex-grow flex flex-col items-center p-4 overflow-y-auto">
          <PostCompose className="flex-none w-full max-w-2xl mb-6" />
          <Post className="flex-grow w-full max-w-2xl" />
        </main>
        <Ads className="hidden lg:flex flex-none w-1/5 ml-4" />
      </motion.div>
    </motion.div>
  );
};

export default Layout;