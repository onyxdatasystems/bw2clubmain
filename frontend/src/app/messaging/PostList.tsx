"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Post from './Post';
import DirectMessages from './DirectMessages';
import { POSTS } from './constants';

interface PostListState {
  showMessages: boolean;
}

class PostList extends React.Component<{}, PostListState> {
  state = {
    showMessages: false
  };

  toggleMessages = () => {
    this.setState({ showMessages: !this.state.showMessages });
  };

  render() {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          {POSTS.map(post => (
            <Post key={post.id} {...post} />
          ))}
          
          {/* Floating message button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={this.toggleMessages}
            className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg z-40"
          >
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/message-icon.png" 
              alt="Messages" 
              width={24} 
              height={24} 
            />
          </motion.button>
          
          {/* Direct Messages */}
          <AnimatePresence>
            {this.state.showMessages && <DirectMessages onClose={this.toggleMessages} />}
          </AnimatePresence>
        </div>
      </div>
    );
  }
}

export default PostList;