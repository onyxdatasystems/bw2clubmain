// src/components/InitiativeDetails.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AppConfig, Animations } from '../../config/AppConfig';

interface InitiativeDetailsProps {
  title?: string;
  content?: string;
  author?: string;
  timePosted?: string;
  imageUrl?: string;
  cheersCount?: number;
  feedbackCount?: number;
  spreadCount?: number;
}

export class InitiativeDetails extends React.Component<InitiativeDetailsProps> {
  private defaultProps = {
    title: "Feed the Streets",
    content: "Join us for \"Feed the Streets,\" a community-driven event...",
    author: "Jackie Jonnes",
    timePosted: "2hrs ago",
    imageUrl: "https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/rectangl-10.png",
    cheersCount: 3,
    feedbackCount: 4,
    spreadCount: 2
  };

  render() {
    const { 
      title, 
      content, 
      author, 
      timePosted, 
      imageUrl, 
      cheersCount, 
      feedbackCount, 
      spreadCount 
    } = { ...this.defaultProps, ...this.props };

    return (
      <motion.div 
        className="bg-white rounded-lg shadow-md p-6 mx-auto"
        initial="hidden"
        animate="visible"
        variants={Animations.fadeIn}
      >
        {/* User Info with animation */}
        <motion.div 
          className="flex items-center mb-4"
          variants={Animations.slideUp}
        >
          <motion.div whileHover={Animations.hover} whileTap={Animations.tap}>
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/avatar.png"
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </motion.div>
          {/* ... rest of user info */}
        </motion.div>

        {/* Initiative Image with animation */}
        <motion.div 
          className="mb-4"
          variants={Animations.scaleIn}
        >
          <Image
            src={imageUrl}
            alt="Initiative"
            width={416}
            height={316}
            className="rounded-lg w-full hover:scale-[1.01] transition-transform duration-300"
          />
        </motion.div>

        {/* Content with staggered animations */}
        <motion.div
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.h2 
            className="text-xl font-medium text-[#292b32] tracking-[-0.5px] mb-2"
            variants={Animations.slideUp}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-[14px] text-[#292b32] tracking-[-0.4px] leading-[140%] whitespace-pre-line mb-6"
            variants={Animations.fadeIn}
          >
            {content}
          </motion.p>
        </motion.div>

        {/* Engagement stats with animations */}
        <motion.div 
          className="border-t border-[#e5e5e5] pt-4"
          variants={Animations.fadeIn}
        >
          {/* ... engagement stats and buttons with hover effects */}
        </motion.div>
      </motion.div>
    );
  }
}