'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StatusBar() {
  return (
    <div className="w-full h-14 flex justify-between items-center px-5">
      <motion.span 
        className="font-inter font-semibold text-lg text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        9:41
      </motion.span>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/levels-2.png"
          alt="Status"
          width={140}
          height={54}
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}