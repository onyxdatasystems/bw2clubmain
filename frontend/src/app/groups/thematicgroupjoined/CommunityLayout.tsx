import React from 'react';
import CommunityHeader from './CommunityHeader';
import ProfileEngagementStats from './ProfileEngagementStats';
import ProfileDescription from './ProfileDescription';
import ProfileActions from './ProfileActions';

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

