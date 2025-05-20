<<<<<<< HEAD
// components/DirectMessages.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MessageItem from './MessageItem';
import { ChatService } from '../services/chat';

interface Thread {
  id: string;
  name: string;
  lastMessage?: string;
  avatar?: string;
  isActive?: boolean;
}

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  userName: string;
  message: string;
  isActive: boolean;
  avatar?: string;
}

interface DirectMessagesProps {
  onClose: () => void;
  userId: string;
}

const DirectMessages: React.FC<DirectMessagesProps> = ({ onClose, userId }) => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ChatService.getChats();
        setThreads(data);
      } catch (error) {
        console.error('Error fetching threads:', error);
        setError('Failed to load threads');
      } finally {
        setLoading(false);
      }
    };
    fetchThreads();
  }, []);

  const fetchMessages = async (threadId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ChatService.getChatMessages(threadId);
      setMessages(data);
      await ChatService.markAsRead(userId);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedThread) return;
    
    setLoading(true);
    setError(null);
    try {
      await ChatService.saveChat({
        message: newMessage,
        threadId: selectedThread,
        senderId: userId
      });
      setNewMessage('');
      await fetchMessages(selectedThread);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await ChatService.removeChat(messageId);
      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message');
    }
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
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

      {loading && (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      )}

      {error && (
        <div className="p-4 text-center text-red-500">{error}</div>
      )}

      {selectedThread ? (
        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedThread(null)}
            className="mb-4 text-purple-600"
          >
            ← Back
          </motion.button>
          <div className="space-y-4 mb-4">
            {messages.map(message => (
              <MessageItem 
                key={message.id} 
                message={{
                  ...message,
                  avatar: message.avatar || "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/avatar.png"
                }}
                onDelete={handleDeleteMessage}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 text-sm"
              placeholder="Type a message..."
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              className="px-4 py-2 bg-purple-600 text-white rounded-full disabled:opacity-50"
              disabled={loading || !newMessage.trim()}
            >
              {loading ? 'Sending...' : 'Send'}
            </motion.button>
          </div>
        </div>
      ) : (
        <div>
          {threads.map(thread => (
            <motion.div
              key={thread.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedThread(thread.id);
                fetchMessages(thread.id);
              }}
              className="cursor-pointer"
            >
              <MessageItem 
                message={{
                  id: thread.id,
                  userName: thread.name || 'Unknown User',
                  message: thread.lastMessage || 'No messages yet',
                  isActive: thread.isActive || false,
                  avatar: thread.avatar || "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/avatar.png"
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

export default DirectMessages;