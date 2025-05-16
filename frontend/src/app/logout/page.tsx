// App.tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';
import LogoutButton from './LogoutButton';

class App extends React.Component {
  handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here
  };

  render() {
    return (
      <motion.div 
        className="flex justify-center items-center min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Settings</h2>
          <LogoutButton 
            onClick={this.handleLogout}
            className="hover:bg-gray-100"
          />
        </motion.div>
      </motion.div>
    );
  }
}

export default App;