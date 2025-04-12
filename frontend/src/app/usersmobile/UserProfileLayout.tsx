import React from 'react';
import UserProfileHeader from './UserProfileHeader';
import UserProfileTabs from './UserProfileTabs';
import UserProfileDetails_UserProfileSupportBonds from './UserProfileDetails_UserProfileSupportBonds';
import UserProfileGallery from './UserProfileGallery';
import UserProfileBoard from './UserProfileBoard';
import Image from 'next/image';

const UserProfileLayout: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '393px',
      margin: '0 auto',
      background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(240,240,255,1) 100%)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <UserProfileHeader />
      <UserProfileTabs />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <UserProfileDetails_UserProfileSupportBonds />
        <UserProfileGallery />
        <UserProfileBoard />
      </div>
      <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/rectangl.png" alt="Background" layout="responsive" width={393} height={184} />
    </div>
  );
};

export default UserProfileLayout;

