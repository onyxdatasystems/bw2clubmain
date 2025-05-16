'use client';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import Post from './Post';
import ComposeBar from './ComposeBar';
import OnboardingModal  from './OnboardingModal';
import Image from 'next/image';

interface LayoutProps {
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ className = '' }) => {
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
      className={`flex flex-col h-screen w-full bg-gray-50 ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navbar - removed className prop since it's not needed */}
      <motion.div variants={itemVariants}>
        <Navbar />
      </motion.div>
      
      <div className="flex flex-row flex-grow overflow-hidden">
        {/* Sidebar - hidden on mobile */}
        <motion.div 
          className="hidden md:block md:w-1/5"
          variants={itemVariants}
        >
          <SideBar />
        </motion.div>
        
        {/* Main content area */}
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
        
        {/* Right sidebar - hidden on mobile and tablet */}
        <motion.aside 
          className="hidden lg:flex lg:w-1/5 justify-center items-start p-4"
          variants={itemVariants}
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg overflow-hidden shadow-md"
          >
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-v3lgz4-w8v6R3X/rectangl.png" 
              alt="Advertisement" 
              width={225} 
              height={300}
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.aside>
      </div>
    </motion.div>
  );
};

export default Layout;