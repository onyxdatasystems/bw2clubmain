"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { UserInfo } from '../types/userProfileTypes';

interface SupportBondsProps {
  bonds: UserInfo[];
}

const SupportBonds: React.FC<SupportBondsProps> = ({ bonds }) => {
  return (
    <motion.div 
      className="p-6 flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
       <h3 className="text-xl font-medium text-gray-900">Support Bonds</h3>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {bonds.map((user) => (
      <motion.div
        key={user.id}
        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
        whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Image 
              src={user.avatar} 
              width={48} 
              height={48} 
              alt={user.name}
              className="rounded-full"
            />
            <span className="text-lg font-medium text-gray-900">
          {user.name}
        </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SupportBonds;