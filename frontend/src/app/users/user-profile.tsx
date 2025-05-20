
// UserProfile.tsx
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UserProfileHeader from './UserProfileHeader';
import UserProfileTabs from './UserProfileTabs';
import UserProfileDetails from './UserProfileDetails';
import SupportBonds from './SupportBonds';
import UserGallery from './UserGallery';
import PostBoard from './PostBoard';
import PaymentHistory from './PaymentHistory';
import { UserInfo, Post, PaymentHistory as PaymentHistoryType } from '../types/userProfileTypes';

interface UserProfileProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserInfo;
  posts: Post[];
  supportBonds: UserInfo[];
  paymentHistory: PaymentHistoryType[];
  onCheer: (postId: number) => void;
  onFeedback: (postId: number, message: string) => void;
  onSupport: () => void;
  onMessage: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  activeTab,
  setActiveTab,
  user,
  posts,
  supportBonds,
  paymentHistory,
  onCheer,
  onFeedback,
  onSupport,
  onMessage,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-b from-white to-indigo-50 min-h-screen">
      {/* Only show header on mobile */}
      <div className="lg:hidden">
        <UserProfileHeader 
          user={user} 
          onSupport={onSupport} 
          onMessage={onMessage} 
        />
      </div>
      
      <UserProfileTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserProfileDetails user={user} />
            </motion.div>
          )}
          
          {activeTab === 'board' && (
            <motion.div
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostBoard 
                posts={posts} 
                onCheer={onCheer} 
                onFeedback={onFeedback} 
              />
            </motion.div>
          )}
          
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <UserGallery images={[
                'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai.png',
                'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai-2.png',
                'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai-3.png',
                'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai-4.png',
                'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai-5.png'
              ]} />
            </motion.div>
          )}
          
          {activeTab === 'support-bonds' && (
            <motion.div
              key="support-bonds"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SupportBonds bonds={supportBonds} />
              <PaymentHistory payments={paymentHistory} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;