<<<<<<< HEAD
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PostInputProps {
  groupId: string;
  userId: string;
  onPostCreated?: () => void;
}

const PostInput: React.FC<PostInputProps> = ({ groupId, userId, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePostSubmit = async () => {
    if (!content.trim()) return;
    
    setIsPosting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/groups_discussion/${groupId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            content
          })
        }
      );
      
      if (response.ok) {
        setContent('');
        if (onPostCreated) onPostCreated();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4"
    >
      <div className="flex items-center">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/avatar-i.png"
            alt="User Avatar"
            fill
            className="object-cover"
          />
        </div>
        <input
          type="text"
          placeholder="What's going on..."
          className="flex-grow ml-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handlePostSubmit()}
        />
        <motion.button
          onClick={handlePostSubmit}
          disabled={isPosting || !content.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`ml-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition ${isPosting || !content.trim() ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isPosting ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Posting...
            </div>
          ) : (
            'Post'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PostInput;
=======
import React from 'react';
import Image from 'next/image';

const PostInput: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center">
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-zpcQz4-w8v6R87/avatar-i.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <input
          type="text"
          placeholder="What's going on..."
          className="flex-grow ml-4 p-2 border border-gray-300 rounded"
        />
        <button className="ml-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostInput;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
