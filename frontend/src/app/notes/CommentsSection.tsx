<<<<<<< HEAD
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface Comment {
=======
"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BaseComponent from './BaseComponent';

interface Comment {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  cheers: number;
<<<<<<< HEAD
}

export interface CommentsSectionProps {
  className?: string;
  postId: string | number;
  comments: Comment[];
}

export interface Post {
  id: string;
  content: string;
  author: string;
  created_at: string;
  comments?: Comment[];
}

 const CommentsSection: React.FC<CommentsSectionProps> = ({
  className,
  postId,
  comments,
}) => {
  const defaultComments: Comment[] = [
    {
      id: "1",
      author: "Jackie Jones",
      avatar:
        "https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/avatar-2.png",
      content: "Cras id blandit augue",
      timestamp: "12 mins",
      cheers: 0,
    },
    {
      id: "2",
      author: "Anika Press",
      avatar:
        "https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/avatar-3.png",
      content:
        "Nulla neque massa, lacinia vitae maximus eu, pharetra a nunc. Quisque congue eros in metus consectetur.",
      timestamp: "10 mins",
      cheers: 12,
    },
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className={`w-full max-w-2xl mx-auto ${className || ""}`}>
      {allComments.map((comment) => (
        <motion.div
          key={comment.id}
          className="w-full bg-white rounded-xl shadow-sm p-6 mb-4 transition-all duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)" }}
        >
          <h2 className="text-lg font-semibold mb-4">
  Comments for Post #{postId}
</h2>

          <div className="flex items-center mb-4">
            <div className="relative w-10 h-10 mr-3">
              <Image
                src={comment.avatar}
                alt={`${comment.author}'s avatar`}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {comment.author}
              </span>
              <span className="text-xs text-gray-500">{comment.timestamp}</span>
            </div>
          </div>

          <motion.div
            className="bg-gray-50 p-4 rounded-lg mb-4 ml-12 transition-colors duration-300"
            whileHover={{ backgroundColor: "#f0f1f5" }}
          >
            <p className="text-sm text-gray-800 leading-relaxed">
              {comment.content}
            </p>
          </motion.div>

          <div className="flex items-center gap-4 ml-12">
            <motion.button
              className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/like-but-3.png"
                alt="Like"
                width={20}
                height={20}
              />
              <span>{comment.cheers || "Cheers"}</span>
            </motion.button>

            <motion.button
              className="text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reply
            </motion.button>

            <motion.button
              className="ml-auto text-gray-500 text-xl"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ⋯
            </motion.button>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full w-fit ml-16 mb-6 cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/expand.png"
          alt="Expand"
          width={16}
          height={16}
        />
        <span className="text-xs font-medium text-gray-600">View replies</span>
      </motion.div>

      <motion.div
        className="px-4 py-2 font-semibold text-gray-900 cursor-pointer w-fit"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        View all feedbacks...
      </motion.div>
    </div>
  );
};
export default CommentsSection
=======
  replies?: Comment[];
}

interface CommentsSectionProps {
  className?: string;
}

class CommentsSection extends BaseComponent<CommentsSectionProps> {
  private defaultComments: Comment[] = [
    {
      id: '1',
      author: 'Jackie Jones',
      avatar: 'https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/avatar-2.png',
      content: 'Cras id blandit augue',
      timestamp: '12 mins',
      cheers: 0,
    },
    {
      id: '2',
      author: 'Anika Press',
      avatar: 'https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/avatar-3.png',
      content: 'Nulla neque massa, lacinia vitae maximus eu, pharetra a nunc. Quisque congue eros in metus consectetur, mollis pulvinar velit accumsan. Donec posuere orci vel turpis dignissim, ut pellentesque est venenatis.',
      timestamp: '10 mins',
      cheers: 12,
    }
  ];

  private renderComment(comment: Comment) {
    return (
      <motion.div 
        key={comment.id}
        className="w-full bg-white rounded-xl shadow-sm p-6 mb-4 transition-all duration-300"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
      >
        <div className="flex items-center mb-4">
          <div className="relative w-10 h-10 mr-3">
            <Image
              src={comment.avatar}
              alt={`${comment.author}'s avatar`}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
            <span className="text-xs text-gray-500">{comment.timestamp}</span>
          </div>
        </div>

        <motion.div 
          className="bg-gray-50 p-4 rounded-lg mb-4 ml-12 transition-colors duration-300"
          whileHover={{ backgroundColor: '#f0f1f5' }}
        >
          <p className="text-sm text-gray-800 leading-relaxed">{comment.content}</p>
        </motion.div>

        <div className="flex items-center gap-4 ml-12">
          <motion.button 
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/like-but-3.png"
              alt="Like"
              width={20}
              height={20}
            />
            <span>{comment.cheers || 'Cheers'}</span>
          </motion.button>

          <motion.button 
            className="text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reply
          </motion.button>

          <motion.button 
            className="ml-auto text-gray-500 text-xl"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            ⋯
          </motion.button>
        </div>
      </motion.div>
    );
  }

  render() {
    return (
      <div className={`w-full max-w-2xl mx-auto ${this.props.className || ''}`}>
        {this.defaultComments.map(comment => this.renderComment(comment))}
        
        <motion.div 
          className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full w-fit ml-16 mb-6 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/expand.png"
            alt="Expand"
            width={16}
            height={16}
          />
          <span className="text-xs font-medium text-gray-600">View replies</span>
        </motion.div>

        <motion.div 
          className="px-4 py-2 font-semibold text-gray-900 cursor-pointer w-fit"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          View all feedbacks...
        </motion.div>
      </div>
    );
  }
}

export default CommentsSection;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
