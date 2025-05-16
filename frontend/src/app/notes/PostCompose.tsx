// PostCompose.tsx
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BaseComponent from './BaseComponent';

interface PostComposeProps {
  className?: string;
}

class PostCompose extends BaseComponent<PostComposeProps> {
  state = {
    postText: ''
  };

  render() {
    return (
      <div className={`${this.props.className || ''} w-full max-w-2xl mx-auto`}>
        <div className="flex p-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
            <Image 
              src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/asset.png"
              alt="Avatar"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col flex-grow gap-3">
            <div className="w-full">
              <input
                type="text"
                placeholder="What's going on..."
                value={this.state.postText}
                onChange={(e) => this.setState({ postText: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <motion.button 
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image 
                    src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/image.png"
                    alt="Image"
                    width={20}
                    height={20}
                  />
                </motion.button>
                <motion.button 
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image 
                    src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/play-circ.png"
                    alt="Video"
                    width={20}
                    height={20}
                  />
                </motion.button>
                <motion.button 
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image 
                    src="https://dashboard.codeparrot.ai/api/image/Z-vBjwz4-w8v6R0l/papercli.png"
                    alt="Attachment"
                    width={20}
                    height={20}
                  />
                </motion.button>
              </div>
              
              <motion.button 
                className="px-4 py-2 bg-gradient-to-b from-indigo-500 to-indigo-700 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Handle post submission
                  this.setState({ postText: '' });
                }}
              >
                Post
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostCompose;