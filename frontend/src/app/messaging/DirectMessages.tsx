"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageItem from './MessageItem';
import { MESSAGES } from './constants';

interface DirectMessagesProps {
  onClose: () => void;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ onClose }) => (
  <motion.div
    initial={{ y: '100%' }}
    animate={{ y: 0 }}
    exit={{ y: '100%' }}
    transition={{ type: 'spring', damping: 25 }}
    className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl z-50 max-h-[60vh] overflow-y-auto"
  >
    <div className="flex justify-between items-center p-4 border-b border-gray-100">
      <h2 className="text-base font-medium text-gray-800">Direct messages</h2>
      <motion.button
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="text-gray-500 hover:text-gray-800 text-xl"
      >
        ✕
      </motion.button>
    </div>
    
    <div>
      {MESSAGES.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  </motion.div>
);

export default DirectMessages;