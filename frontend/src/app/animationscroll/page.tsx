"use client";
import { motion } from 'framer-motion';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
import UserProfile from './UserProfile';
import ProfileTabs from './ProfileTabs';
import ProfileDetails from './ProfileDetails';
import AdsSection from './AdsSection';

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