<<<<<<< HEAD
'use client';

=======
"use client";
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import { motion } from 'framer-motion';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import UserProfile from './UserProfile';
import ProfileTabs from './ProfileTabs';
import ProfileDetails from './ProfileDetails';
import AdsSection from './AdsSection';

<<<<<<< HEAD
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-col lg:flex-row px-4 md:px-8 py-6 gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/5">
          <SideBar />
        </div>

        {/* Main Content */}
        <motion.div
          className="flex-1 flex flex-col gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <UserProfile />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ProfileTabs />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ProfileDetails />
          </motion.div>
        </motion.div>

        {/* Ads Section - Hidden on mobile */}
        <div className="hidden lg:block lg:w-1/5">
          <AdsSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
=======
const HomePage = () => {
  return (
    <motion.div 
      className="flex flex-col w-full min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <motion.div 
        className="flex flex-col lg:flex-row flex-1 p-5 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Side Navigation - Hidden on mobile by default */}
        <SideBar className="hidden md:flex w-full md:w-[278px]" />
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 gap-5">
          <UserProfile className="w-full" />
          <ProfileTabs className="w-full" />
          <ProfileDetails className="w-full" />
        </div>
        
        {/* Ads Section - Hidden on mobile */}
        <AdsSection className="hidden lg:flex" />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
