"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Message } from './types';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center py-3 px-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
  >
    <motion.div whileHover={{ rotate: 5 }}>
      <Image 
        src={message.avatar} 
        alt="Avatar" 
        width={40} 
        height={40} 
        className="rounded-full"
      />
    </motion.div>
    <div className="ml-4 flex-1">
      <h3 className="text-sm font-medium text-gray-800">{message.userName}</h3>
      <p className="text-xs text-gray-500">{message.message}</p>
    </div>
    {message.isActive && (
      <motion.span 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-2 h-2 bg-purple-600 rounded-full"
      />
    )}
  </motion.div>
);

export default MessageItem;