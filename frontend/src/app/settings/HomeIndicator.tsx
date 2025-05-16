'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default class HomeIndicator extends React.Component {
  render() {
    return (
      <motion.div 
        className="w-full h-6 mt-auto flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/home-ind-2.png"
          alt="Home Indicator"
          width={393}
          height={21}
          className="w-full"
        />
      </motion.div>
    );
  }
}