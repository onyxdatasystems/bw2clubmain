"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

interface CompetitionCardProps {
  image: string;
  title: string;
  description: string;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ image, title, description }) => {
  const card = new BaseCard(image, title, description);

  return (
    <motion.div
      className="w-full sm:w-[260px] h-[330px] flex flex-col bg-white shadow-lg rounded-xl overflow-hidden"
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
      {card.renderContent()}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 hover:opacity-20 transition-opacity duration-300"
        initial={{ opacity: 0 }}
      />
    </motion.div>
  );
};

export default CompetitionCard;