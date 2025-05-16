'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface ScreenHeaderProps {
  title: string;
}

export default class ScreenHeader extends React.Component<ScreenHeaderProps> {
  render() {
    return (
      <div className="w-full h-10 flex items-center px-5 mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/arrow-do-2.png"
            alt="Back"
            width={20}
            height={20}
            className="transition-transform duration-200 hover:scale-110"
          />
        </motion.button>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 text-center font-inter font-semibold text-sm tracking-tight text-gray-900"
        >
          {this.props.title}
        </motion.h1>
      </div>
    );
  }
}