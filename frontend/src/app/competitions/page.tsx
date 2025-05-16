"use client"
import React from "react";
import Navbar from "../Navbar/page";
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
  );
};

export default CompetitionPage;