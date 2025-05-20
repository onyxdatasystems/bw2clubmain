"use client"
import React from "react";
import Navbar from "../Navbar/page";
<<<<<<< HEAD
import Sidebar from "../SideBar/page"
import CompetitionList from "./CompetitionList";
import { motion } from "framer-motion";

const CompetitionPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
  <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 md:ml-64">
        
        <motion.main 
          className="flex-1 p-4 md:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Competitions
            </h1>
            <p className="text-gray-600 mt-2">
              Join exciting challenges and showcase your skills
            </p>
          </motion.div>
          
          <CompetitionList />
        </motion.main>
        </main>
      </div>
    </div>
=======
import SideBar from "../SideBar/page";
import CompetitionList from "./CompetitionList";
import { motion } from "framer-motion";

// Layout Manager
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

const CompetitionPage: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      {...LayoutManager.pageAnimation}
    >
      <Navbar />
      <div className="flex flex-grow">
        <SideBar />
        <motion.main 
          className="flex-1 p-6"
          {...LayoutManager.contentAnimation}
        >
          <CompetitionList />
        </motion.main>
      </div>
    </motion.div>
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  );
};

export default CompetitionPage;