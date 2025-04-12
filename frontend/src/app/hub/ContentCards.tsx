// src/components/ContentCards.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Animations } from '../../config/Config';

interface CardData {
  id: number;
  image: string;
  companyName: string;
  description: string;
}

interface ContentCardsProps {
  className?: string;
}

const defaultCards: CardData[] = [
  // Your card data here
];

const ContentCards: React.FC<ContentCardsProps> = ({ className = '' }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }),
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
    }
  };

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 ${className}`}>
      {defaultCards.map((card, i) => (
        <motion.div
          key={card.id}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover="hover"
          className="relative flex flex-col items-center bg-white rounded-lg border border-[#b9b9b9] min-w-[177px] h-[201px] shadow-md hover:shadow-lg transition-all"
        >
          <div className="absolute top-0 -mt-10">
            <Image
              src={card.image}
              alt={card.companyName}
              width={81}
              height={81}
              className="rounded-full"
              priority={i < 3} // Only prioritize first few images
            />
          </div>
          <div className="mt-16 flex flex-col items-center">
            <h3 className="text-[14px] text-[#3a3a3a] font-inter text-center leading-[140%] tracking-[-0.41px]">
              {card.companyName}
            </h3>
            <p className="mt-2 text-[11px] text-[#636878] font-inter text-center leading-[140%] tracking-[-0.41px] px-4">
              {card.description}
            </p>
            <motion.button 
              className="mt-4 px-6 py-2 bg-gradient-to-b from-[#8585D5] to-[#6767B7] text-white rounded-full text-[14px] font-inter"
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.98 }}
            >
              View
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContentCards;