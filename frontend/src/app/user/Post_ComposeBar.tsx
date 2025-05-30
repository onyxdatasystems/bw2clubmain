"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';

interface PostComposerProps {
  userAvatar?: string;
  placeholder?: string;
  onPostCreated?: () => void;
}

const PostComposer: React.FC<PostComposerProps> = ({
  userAvatar = 'https://dashboard.codeparrot.ai/api/image/Z-ujinn5m-GBkPPu/avatar-6.png',
  placeholder = "What's going on...",
  onPostCreated
}) => {
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mediaOptions = [
    { icon: 'image.png', alt: 'Image' },
    { icon: 'play-circ.png', alt: 'Video' },
    { icon: 'papercli.png', alt: 'Attachment' }
  ];

  const handlePostSubmit = async () => {
    if (!postContent.trim()) return;
    
    setIsSubmitting(true);
    try {
      await axios.post('/api/posts', { content: postContent });
      setPostContent('');
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col w-full bg-white rounded-lg border border-[#ebecef] p-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex flex-row gap-3">
        <motion.div 
          className="w-10 h-10 rounded-full overflow-hidden bg-[#fa53f7]"
          whileHover={{ rotate: 10 }}
        >
          <Image 
            src={userAvatar}
            alt="User avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </motion.div>
        
        <div className="flex flex-col flex-grow gap-3">
          <motion.div 
            className="flex flex-row items-center border border-[#ebecef] rounded p-3.5"
            whileFocus={{ borderColor: '#7171c1' }}
          >
            <input
              type="text"
              placeholder={placeholder}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="flex-grow text-sm text-[#898e9e] outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handlePostSubmit()}
            />
          </motion.div>
          
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              {mediaOptions.map((option, index) => (
                <motion.button
                  key={index}
                  className="w-8 h-8 rounded-full bg-[#ebecef] bg-opacity-60 flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: '#e0e0ff' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image 
                    src={`https://dashboard.codeparrot.ai/api/image/Z-ujinn5m-GBkPPu/${option.icon}`}
                    alt={option.alt}
                    width={24}
                    height={24}
                  />
                </motion.button>
              ))}
            </div>
            
            <motion.button 
              className="px-3 py-2 bg-gradient-to-b from-[#8585d5] to-[#6767b7] text-white rounded-full disabled:opacity-50"
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(103, 103, 183, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              disabled={!postContent || isSubmitting}
              onClick={handlePostSubmit}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostComposer;