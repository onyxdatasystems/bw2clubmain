// src/components/InitiativeDetails.tsx
'use client';
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {  Animations } from '../../config/AppConfig';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Initiative {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  imageUrl: string;
  cheersCount: number;
  feedbackCount: number;
  spreadCount: number;
}

interface InitiativeDetailsProps {
  initiativeId?: string;
}

export const InitiativeDetails: React.FC<InitiativeDetailsProps> = ({ initiativeId }) => {
  const [initiative, setInitiative] = useState<Initiative | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interactionState, setInteractionState] = useState({
    cheered: false,
    feedbackAdded: false,
    spread: false
  });

  useEffect(() => {
    const fetchInitiative = async () => {
      try {
        const endpoint = initiativeId 
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/initiatives/${initiativeId}`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/initiatives/latest`;
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch initiative');
        const data = await response.json();
        setInitiative(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchInitiative();
  }, [initiativeId]);

  const handleCheer = async () => {
    if (!initiative) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/initiatives/${initiative.id}/cheer`,
        { method: 'POST' }
      );
      if (response.ok) {
        setInitiative(prev => prev ? {
          ...prev,
          cheersCount: prev.cheersCount + (interactionState.cheered ? -1 : 1)
        } : null);
        setInteractionState(prev => ({ ...prev, cheered: !prev.cheered }));
      }
    } catch (err) {
      console.error('Error cheering:', err);
    }
  };

  const handleFeedback = async () => {
    if (!initiative) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/initiatives/${initiative.id}/feedback`,
        { method: 'POST' }
      );
      if (response.ok) {
        setInitiative(prev => prev ? {
          ...prev,
          feedbackCount: prev.feedbackCount + (interactionState.feedbackAdded ? -1 : 1)
        } : null);
        setInteractionState(prev => ({ ...prev, feedbackAdded: !prev.feedbackAdded }));
      }
    } catch (err) {
      console.error('Error adding feedback:', err);
    }
  };

  const handleSpread = async () => {
    if (!initiative) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/initiatives/${initiative.id}/spread`,
        { method: 'POST' }
      );
      if (response.ok) {
        setInitiative(prev => prev ? {
          ...prev,
          spreadCount: prev.spreadCount + (interactionState.spread ? -1 : 1)
        } : null);
        setInteractionState(prev => ({ ...prev, spread: !prev.spread }));
      }
    } catch (err) {
      console.error('Error spreading:', err);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (loading) return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 mx-auto"
      initial="hidden"
      animate="visible"
      variants={Animations.fadeIn}
    >
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </motion.div>
  );

  if (error) return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 mx-auto"
      initial="hidden"
      animate="visible"
      variants={Animations.fadeIn}
    >
      <div className="text-red-500">Error: {error}</div>
    </motion.div>
  );

  if (!initiative) return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 mx-auto"
      initial="hidden"
      animate="visible"
      variants={Animations.fadeIn}
    >
      <div>No initiative found</div>
    </motion.div>
  );

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
            src={initiative.author.avatarUrl}
            alt={`${initiative.author.name}'s avatar`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </motion.div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">{initiative.author.name}</p>
          <p className="text-sm text-gray-500">{formatTimeAgo(initiative.createdAt)}</p>
        </div>
      </motion.div>

      {/* Initiative Image with animation */}
      <motion.div 
        className="mb-4"
        variants={Animations.scaleIn}
      >
        <Image
          src={initiative.imageUrl}
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
          {initiative.title}
        </motion.h2>
        <motion.p 
          className="text-[14px] text-[#292b32] tracking-[-0.4px] leading-[140%] whitespace-pre-line mb-6"
          variants={Animations.fadeIn}
        >
          {initiative.content}
        </motion.p>
      </motion.div>

      {/* Engagement stats with animations */}
      <motion.div 
        className="border-t border-[#e5e5e5] pt-4 flex justify-between"
        variants={Animations.fadeIn}
      >
        <button 
          onClick={handleCheer}
          className={`flex items-center space-x-1 ${interactionState.cheered ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <span>👍</span>
          <span>{initiative.cheersCount}</span>
        </button>
        
        <button 
          onClick={handleFeedback}
          className={`flex items-center space-x-1 ${interactionState.feedbackAdded ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <span>💬</span>
          <span>{initiative.feedbackCount}</span>
        </button>
        
        <button 
          onClick={handleSpread}
          className={`flex items-center space-x-1 ${interactionState.spread ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <span>↗️</span>
          <span>{initiative.spreadCount}</span>
        </button>
      </motion.div>
    </motion.div>
  );
};
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
