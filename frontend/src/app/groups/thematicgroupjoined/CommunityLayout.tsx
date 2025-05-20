<<<<<<< HEAD
'use client';
import React from 'react';
import { motion } from 'framer-motion';
=======
import React from 'react';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import CommunityHeader from './CommunityHeader';
import ProfileEngagementStats from './ProfileEngagementStats';
import ProfileDescription from './ProfileDescription';
import ProfileActions from './ProfileActions';

<<<<<<< HEAD
interface CommunityLayoutProps {
  groupId: string;
  userId: string;
}

const CommunityLayout: React.FC<CommunityLayoutProps> = ({ groupId, userId }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full max-w-3xl mx-auto"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CommunityHeader groupId={groupId} />
      </motion.div>
      
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ProfileEngagementStats groupId={groupId} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4"
      >
        <ProfileDescription groupId={groupId} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <ProfileActions groupId={groupId} userId={userId} />
      </motion.div>
    </motion.div>
  );
};

export default CommunityLayout;
=======
const CommunityLayout: React.FC = () => {
  return (
    <div className="community-layout">
      <CommunityHeader 
        groupName="Planet Savers"
        isPrivate={true}
        backgroundImage="https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/unsplash.png"
      />
      <ProfileEngagementStats 
        posts={0}
        members={1}
      />
      <ProfileDescription 
        description="A community dedicated to communicating climate & justice. Another world is possible 🌍 Join us."
      />
      <ProfileActions 
        userName="Alfredo Donin"
        userAvatar="https://dashboard.codeparrot.ai/api/image/Z-zvcwz4-w8v6R9U/avatar.png"
        isVerified={true}
        requestStatus="pending"
      />
    </div>
  );
};

export default CommunityLayout;

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
