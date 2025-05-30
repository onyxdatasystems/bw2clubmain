"use client";
<<<<<<< HEAD

import React, { useState, useEffect } from 'react';
import UserProfile from './user-profile';
import {
  fetchPosts,
  fetchUserInfo,
  fetchSupportBonds,
  fetchPaymentHistory,
  cheerPost,
  sendFeedback
} from './apiService';

import { UserInfo, Post, PaymentHistory as PaymentHistoryType } from '../types/userProfileTypes';

// 🔧 Import Navbar and SideBar (assuming you have them in the same folder or update the path accordingly)
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('board');
  const [user, setUser] = useState<UserInfo>({} as UserInfo);
  const [posts, setPosts] = useState<Post[]>([]);
  const [supportBonds, setSupportBonds] = useState<UserInfo[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userData, postsData, bondsData, paymentsData] = await Promise.all([
          fetchUserInfo(),
          fetchPosts(),
          fetchSupportBonds(),
          fetchPaymentHistory()
        ]);

        setUser(userData);
        setPosts(postsData);
        setSupportBonds(bondsData);
        setPaymentHistory(paymentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCheer = async (postId: number) => {
    const success = await cheerPost(postId);
    if (success) {
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, cheers: post.cheers + 1 } : post
        )
      );
    }
  };

  const handleFeedback = async (postId: number, message: string) => {
    const success = await sendFeedback(postId, message);
    if (success) {
      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, feedbacks: post.feedbacks + 1 } : post
        )
      );
    }
  };

  const handleSupport = () => {
    console.log('Support button clicked');
  };

  const handleMessage = () => {
    console.log('Message button clicked');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 relative">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <main className="flex flex-col flex-1 overflow-y-auto p-2 md:p-4">
          <UserProfile
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={user}
            posts={posts}
            supportBonds={supportBonds}
            paymentHistory={paymentHistory}
            onCheer={handleCheer}
            onFeedback={handleFeedback}
            onSupport={handleSupport}
            onMessage={handleMessage}
          />
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;
=======
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/page";
import SideBar from "../SideBar/page"; 
import ProfileSection from "./ProfileSection";
import Post_ComposeBar from "./Post_ComposeBar";
import Image from "next/image";

const Layout: React.FC = () => {
  const [isSideNavVisible, setSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setSideNavVisible(!isSideNavVisible);
  };

  return (
    <motion.div 
      className="flex flex-col h-screen bg-[#f9f9f9]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      {/* Toggle Button for Sidebar (Only visible on mobile) */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={toggleSideNav}
      >
        <Image 
          src={isSideNavVisible 
            ? "https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/close-icon.png"
            : "https://dashboard.codeparrot.ai/api/image/Z-0CIgz4-w8v6R93/menu-icon.png"}
          alt="Toggle Sidebar"
          width={24}
          height={24}
        />
      </button>

      <motion.div 
        className="flex flex-grow"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        
        {/* Sidebar (Hidden on Mobile, Click to Open) */}
        <AnimatePresence>
          {isSideNavVisible && (
            <>
              {/* Background Overlay */}
              <motion.div
                className="fixed inset-0 z-40 bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleSideNav} // Close sidebar when clicking outside
              />

              {/* Sliding Sidebar */}
              <motion.div
                className="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg"
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <SideBar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div 
          className="flex flex-col flex-grow p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <ProfileSection />
          
          <motion.div 
            className="flex flex-col flex-grow mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Post_ComposeBar />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Layout;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
