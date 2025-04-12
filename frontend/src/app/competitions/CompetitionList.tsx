"use client"
import React from "react";
import CompetitionCard from './CompetitionCard';
import { motion } from "framer-motion";

// Competition Data Manager
class CompetitionManager {
  private competitions = {
    ongoing: [
      { image: "/ongoing1.png", title: "Competition A", description: "Join now!" },
      { image: "/ongoing2.png", title: "Competition B", description: "Exciting challenges await!" }
    ],
    past: [
      { image: "/past1.png", title: "Past Competition 1", description: "Great memories!" },
      { image: "/past2.png", title: "Past Competition 2", description: "Awesome event!" }
    ]
  };

  getCompetitions(type: 'ongoing' | 'past') {
    return this.competitions[type];
  }
}

interface CompetitionListProps {
  className?: string;
}

const CompetitionList: React.FC<CompetitionListProps> = ({ className = "" }) => {
  const manager = new CompetitionManager();

  return (
    <div className={`competition-list px-4 py-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-[#5A67D8] to-[#8B5CF6] bg-clip-text text-transparent">
          Ongoing Competitions
        </h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          {manager.getCompetitions('ongoing').map((comp, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <CompetitionCard {...comp} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-[#5A67D8] to-[#8B5CF6] bg-clip-text text-transparent">
          Past Competitions
        </h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4
              }
            }
          }}
        >
          {manager.getCompetitions('past').map((comp, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <CompetitionCard {...comp} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompetitionList;