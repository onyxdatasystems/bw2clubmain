'use client';

import AnimatedScreen from './AnimatedScreen';
import StatusBar from './StatusBar';
import ScreenHeader from './ScreenHeader';
import HomeIndicator from './HomeIndicator';
import { motion } from 'framer-motion';
import React from 'react';

export default class FAQsScreen extends React.Component {
  render() {
    return (
      <AnimatedScreen>
        <StatusBar />
        <ScreenHeader title="FAQs" />
        
        <motion.div 
          className="px-5 flex-1 overflow-y-auto font-inter font-normal text-sm tracking-tight text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>Last updated November 19, 2023</p>
          <br />
          <p>This Cookie Policy explains how Better Women Better World, Inc ("Company," "we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website at https://bw2club.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
          {/* Rest of the content */}
        </motion.div>

        <HomeIndicator />
      </AnimatedScreen>
    );
  }
}