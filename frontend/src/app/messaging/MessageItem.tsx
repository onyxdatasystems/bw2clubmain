<<<<<<< HEAD
// components/MessageItem.tsx
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MessageItemProps {
  message: {
    id: string;
    userName: string;
    message: string;
    isActive?: boolean;
    avatar?: string;
  };
  onDelete?: (id: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onDelete }) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (onDelete) {
        await onDelete(message.id);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="flex items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <motion.div whileHover={{ rotate: 5 }} className="flex-shrink-0">
        <Image 
          src={message.avatar || "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/avatar.png"} 
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
          className="w-2 h-2 bg-purple-600 rounded-full mr-4"
        />
      )}
      {onDelete && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </motion.button>
      )}
    </div>
  );
};
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

export default MessageItem;