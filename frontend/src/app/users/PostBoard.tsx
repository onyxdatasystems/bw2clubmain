"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Post } from '../types/userProfileTypes';

interface PostBoardProps {
  posts: Post[];
  onCheer: (postId: number) => void;
  onFeedback: (postId: number, message: string) => void;
}

const PostBoard: React.FC<PostBoardProps> = ({ 
  posts, 
  onCheer, 
  onFeedback 
}) => {
  const [feedbackInputs, setFeedbackInputs] = useState<Record<number, string>>({});

  const handleFeedbackSubmit = (postId: number) => {
    const message = feedbackInputs[postId];
    if (message && message.trim()) {
      onFeedback(postId, message);
      setFeedbackInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 p-6">
      {posts.map((post) => (
        <motion.div
          key={post.id}
               className="w-full border border-gray-100 rounded-xl overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3 items-center">
                <Image 
                  src={post.avatar} 
                  alt="Avatar" 
                  width={48} 
                  height={348} 
                  className="rounded-full"
                />
                <div className="flex flex-col gap-0.5">
                <span className="text-lg font-medium text-gray-900">{post.author}</span>
                <span className="text-sm text-gray-900">{post.timeAgo}</span>
                </div>
              </div>
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/dots-thr-2.png" 
                alt="Menu" 
                width={20} 
                height={20} 
              />
            </div>

            {/* Content */}
            <p className="text-base leading-relaxed text-gray-900">
              {post.content}
           </p>
           <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt="Post"
            fill
            className="object-cover"
          />
        </div>

            {/* Interactions */}
            <div className="flex justify-between py-4 border-t border-gray-100">
              <div className="flex gap-3">
                <div className="flex gap-1 items-center">
                  <Image 
                    src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/like-but.png" 
                    alt="Cheers" 
                    width={20} 
                    height={20} 
                  />
                  <span className="text-sm text-gray-900">
                    {post.cheers} Cheers
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <Image 
                    src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/message.png" 
                    alt="Feedback" 
                    width={20} 
                    height={20} 
                  />
                  <span className="text-sm text-gray-900">
                    {post.feedbacks} Feedbacks
                  </span>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <Image 
                  src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/share-08.png" 
                  alt="Spread" 
                  width={20} 
                  height={20} 
                />
                <span className="text-sm text-gray-900">
                  {post.spread} Spread
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between py-3 border-t border-gray-100">
              <button 
                onClick={() => onCheer(post.id)}
                className="flex flex-col items-center gap-1"
              >
                <Image 
                  src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/like-but.png" 
                  alt="Cheers" 
                  width={20} 
                  height={20} 
                />
                <span className="text-sm text-gray-900">Cheers</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <Image 
                  src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/message.png" 
                  alt="Feedback" 
                  width={20} 
                  height={20} 
                />
                <span className="text-sm text-gray-900">Feedback</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <Image 
                  src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/share-08.png" 
                  alt="Spread" 
                  width={20} 
                  height={20} 
                />
                <span className="text-sm text-gray-900">Spread</span>
              </button>
              <button className="flex flex-col items-center gap-1">
                <Image 
                  src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/link-05.png" 
                  alt="Copy Link" 
                  width={20} 
                  height={20} 
                />
                <span className="text-sm text-gray-900">Copy Link</span>
              </button>
            </div>

            {/* Feedback Input */}
            <div className="flex gap-1 py-3 border-t border-gray-100">
              <input
                type="text"
                value={feedbackInputs[post.id] || ''}
                onChange={(e) => setFeedbackInputs(prev => ({ 
                  ...prev, 
                  [post.id]: e.target.value 
                }))}
                placeholder="Enter Feedback..."
                className="flex-1 h-10 bg-gray-50 rounded-lg border border-gray-100 px-3 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-200"
              />
              <button 
                onClick={() => handleFeedbackSubmit(post.id)}
                className="w-10 h-10 rounded-lg flex items-center justify-center"
              >
                <Image 
                  src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/paper-pl-2.png" 
                  alt="Send" 
                  width={22} 
                  height={22} 
                />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostBoard;