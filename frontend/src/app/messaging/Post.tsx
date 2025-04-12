"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PostProps } from './types';

interface PostState {
  isExpanded: boolean;
  isLiked: boolean;
  likeCount: number;
}

class Post extends React.Component<PostProps, PostState> {
  state = {
    isExpanded: false,
    isLiked: false,
    likeCount: this.props.cheersCount
  };

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  handleLike = () => {
    this.setState(prev => ({
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1
    }));
  };

  render() {
    const { userName, timeAgo, content, imageUrl, feedbackCount, spreadCount, avatar } = this.props;
    const { isExpanded, isLiked, likeCount } = this.state;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl bg-white rounded-xl shadow-md overflow-hidden mb-6"
      >
        <div className="flex items-center p-4">
          <motion.div whileHover={{ rotate: 5 }}>
            <Image 
              src={avatar} 
              alt="Avatar" 
              width={50} 
              height={50} 
              className="rounded-full"
            />
          </motion.div>
          <div className="ml-4">
            <h3 className="text-base font-medium text-gray-800">{userName}</h3>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>

        <div className="px-4 pb-3">
          <p className="text-sm text-gray-800">
            {isExpanded ? content : `${content.substring(0, 100)}...`}
            <motion.span 
              whileHover={{ scale: 1.05 }}
              onClick={this.toggleExpand}
              className="ml-1 text-purple-600 cursor-pointer"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </motion.span>
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.01 }}>
          <Image 
            src={imageUrl} 
            alt="Post Image" 
            width={600} 
            height={300} 
            className="w-full object-cover"
          />
        </motion.div>

        <div className="flex justify-between items-center p-3 border-b border-gray-100">
          <div className="flex space-x-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={this.handleLike}
              className="flex items-center space-x-1"
            >
              <Image 
                src={isLiked ? 
                  "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/line-88-filled.png" : 
                  "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/line-88.png"} 
                alt="Cheers" 
                width={16} 
                height={16} 
              />
              <span className={`text-sm ${isLiked ? 'text-purple-600 font-bold' : 'text-purple-600'}`}>
                {likeCount} Cheers
              </span>
            </motion.button>
            
            <button className="flex items-center space-x-1">
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/line-89.png" 
                alt="Feedback" 
                width={16} 
                height={16} 
              />
              <span className="text-sm text-purple-600">{feedbackCount} Feedbacks</span>
            </button>
            
            <button className="flex items-center space-x-1">
              <Image 
                src="https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/line-90.png" 
                alt="Spread" 
                width={16} 
                height={16} 
              />
              <span className="text-sm text-purple-600">{spreadCount} Spread</span>
            </button>
          </div>
          
          <button className="flex items-center space-x-1">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/line-91.png" 
              alt="Copy Link" 
              width={16} 
              height={16} 
            />
            <span className="text-sm text-purple-600">Copy Link</span>
          </button>
        </div>

        <div className="p-3">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            placeholder="Enter Feedback..."
            className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200 text-sm"
          />
        </div>
      </motion.div>
    );
  }
}

export default Post;