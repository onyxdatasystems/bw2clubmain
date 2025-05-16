'use client';

import AnimatedScreen from './AnimatedScreen';
import { motion } from 'framer-motion';

export default function PrivacyPolicyScreen() {
  return (
    <AnimatedScreen title="Privacy Policy">
      <motion.div 
        className="prose prose-sm max-w-none text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p>Last updated September 30, 2023</p>
        <p><strong>Privacy Statement Summary:</strong></p>
        <p>We take the protection of your personal data seriously. This Privacy Policy ("Policy") explains how your information is collected, used and disclosed by us.</p>
        
        <h3>Who are we:</h3>
        <p>[Add Information about what your company does]</p>
        
        <h3>Why do we process data:</h3>
        <p>We gather data to enhance your experience on our platform and refine our services.</p>
        
        {/* Add more content as needed */}
      </motion.div>
    </AnimatedScreen>
  );
}