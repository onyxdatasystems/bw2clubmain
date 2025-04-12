"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="w-full min-h-[80px] flex items-center justify-center bg-inherit"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.5 }}
    >
      <motion.p 
        className="text-[#292b32] text-center text-xs font-normal leading-7 font-inter"
        whileHover={{ scale: 1.05 }}
      >
        Copyright © 2025 BW2CLUB. Developed with ❤️ by EmpowerSphere
      </motion.p>
    </motion.footer>
  );
};

export default Footer;