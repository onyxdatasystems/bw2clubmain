'use client';

import AnimatedScreen from './AnimatedScreen';
import StatusBar from './StatusBar';
import ScreenHeader from './ScreenHeader';
import HomeIndicator from './HomeIndicator';
import { motion } from 'framer-motion';
import React from 'react';

export default class TermsAndConditionsScreen extends React.Component {
  render() {
    return (
      <AnimatedScreen>
        <StatusBar />
        <ScreenHeader title="Terms and Conditions" />
        
        <motion.div 
          className="px-4 flex-1 overflow-y-auto font-inter font-normal text-sm tracking-tight text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>Last updated September 30, 2023</p>
          <br />
          <p>AGREEMENT TO OUR LEGAL TERMS</p>
          {/* Rest of the content */}
        </motion.div>

        <HomeIndicator />
      </AnimatedScreen>
    );
  }
}