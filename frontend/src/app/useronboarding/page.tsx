'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import client components with no SSR
const Navbar = dynamic(() => import('../Navbar/page'), { ssr: false });
const SideBar = dynamic(() => import('../SideBar/page'), { ssr: false });
const Post = dynamic(() => import('./Post'), { ssr: false });
const ComposeBar = dynamic(() => import('./ComposeBar'), { ssr: false });
const OnboardingModal = dynamic(() => import('./OnboardingModal'), { ssr: false });

const Layout = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-screen w-full bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Navbar />
      </motion.div>
      
      <div className="flex flex-row flex-grow overflow-hidden">
        <motion.div 
          className="w-1/5 hidden md:block"
          variants={itemVariants}
        >
          <SideBar />
        </motion.div>
        
        <main className="flex flex-col flex-grow items-center overflow-y-auto p-4">
          <motion.div variants={itemVariants} className="w-full max-w-[546px] mb-4">
            <ComposeBar />
          </motion.div>
          
          <motion.div variants={itemVariants} className="w-full max-w-[546px] mb-4">
            <Post />
          </motion.div>
          
          <motion.div variants={itemVariants} className="w-full max-w-[546px] mb-4">
            <Post />
          </motion.div>
          
          <motion.div variants={itemVariants} className="w-full max-w-[546px] mb-4">
            <OnboardingModal />
          </motion.div>
        </main>
        
        <motion.aside 
          className="w-1/5 hidden lg:flex justify-center items-start p-4"
          variants={itemVariants}
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="rounded-lg overflow-hidden shadow-md"
          >
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-v3lgz4-w8v6R3X/rectangl.png" 
              alt="Advertisement" 
              width={225} 
              height={300}
              priority
            />
          </motion.div>
        </motion.aside>
      </div>
    </motion.div>
  );
};

export default Layout;