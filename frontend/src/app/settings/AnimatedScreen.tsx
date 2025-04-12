'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedScreenProps {
  children: ReactNode;
  title?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export default function AnimatedScreen({ children, title }: AnimatedScreenProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="w-full bg-white rounded-xl shadow-sm p-6 h-full flex flex-col"
    >
      {title && (
        <motion.h2 
          className="text-2xl font-bold mb-6 text-gray-800"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
        >
          {title}
        </motion.h2>
      )}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
}