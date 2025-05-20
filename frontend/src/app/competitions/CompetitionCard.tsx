"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

<<<<<<< HEAD
=======
// Base Card Component with OOP principles
class BaseCard {
  constructor(
    public image: string,
    public title: string,
    public description: string
  ) {}

  renderContent() {
    return (
      <>
        <div className="h-[200px] relative overflow-hidden">
          <Image
            src={this.image}
            alt={this.title}
            fill
            className="object-cover rounded-t-xl"
          />
        </div>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <h3 className="text-[#5A67D8] text-lg font-semibold">{this.title}</h3>
          <p className="text-gray-700 text-sm">{this.description}</p>
        </div>
      </>
    );
  }
}

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
interface CompetitionCardProps {
  image: string;
  title: string;
  description: string;
<<<<<<< HEAD
  startDate?: string;
  endDate?: string;
  participants?: number;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  image,
  title,
  description,
  startDate,
  endDate,
  participants
}) => {
  return (
    <motion.div
      className="w-full sm:w-[260px] h-[380px] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden relative"
=======
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ image, title, description }) => {
  const card = new BaseCard(image, title, description);

  return (
    <motion.div
      className="w-full sm:w-[260px] h-[330px] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden"
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0px 8px 24px rgba(90, 103, 216, 0.3)",
        transition: { duration: 0.3 }
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
    >
<<<<<<< HEAD
      <div className="h-[200px] relative overflow-hidden">
        <Image
          src={image || "/default-competition.png"}
          alt={title}
          fill
          className="object-cover rounded-t-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-[#5A67D8] text-lg font-semibold">{title}</h3>
          <p className="text-gray-700 text-sm mt-2">{description}</p>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          {startDate && endDate && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between mb-2"
            >
              <span>Start: {new Date(startDate).toLocaleDateString()}</span>
              <span>End: {new Date(endDate).toLocaleDateString()}</span>
            </motion.div>
          )}
          {participants !== undefined && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center pt-2 border-t border-gray-100"
            >
              {participants} participants
            </motion.div>
          )}
        </div>
      </div>
      
=======
      {card.renderContent()}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-20 transition-opacity duration-300"
        initial={{ opacity: 0 }}
      />
    </motion.div>
  );
};

export default CompetitionCard;