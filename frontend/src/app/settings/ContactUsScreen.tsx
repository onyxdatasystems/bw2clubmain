'use client';

import AnimatedScreen from './AnimatedScreen';
import StatusBar from './StatusBar';
import ScreenHeader from './ScreenHeader';
import HomeIndicator from './HomeIndicator';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ContactUsScreen() {
  return (
    <AnimatedScreen>
      <StatusBar />
      <ScreenHeader title="Contact Us" />
      
      <motion.div 
        className="px-5 font-inter font-normal text-sm tracking-tight text-gray-700 text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Your contact content */}
      </motion.div>

      <motion.div 
        className="absolute right-5 top-[460px] flex flex-col gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-1Ttwz4-w8v6SCL/componen-8.png"
            alt="Message"
            width={43}
            height={27}
            className="cursor-pointer"
          />
        </motion.div>
        {/* Other icons */}
      </motion.div>

      <HomeIndicator />
    </AnimatedScreen>
  );
}