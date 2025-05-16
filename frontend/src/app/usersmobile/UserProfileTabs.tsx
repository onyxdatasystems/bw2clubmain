import React, { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
}

const tabs: TabItem[] = [
  { id: 'about', label: 'About' },
  { id: 'board', label: 'Board' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'support-bonds', label: 'Support Bonds' }
];

const UserProfileTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('support-bonds');

  return (
    <div style={{
      width: '100%',
      maxWidth: '393px',
      height: '31px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      display: 'flex',
      justifyContent: 'center',
      padding: '0 16px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        height: '33px'
      }}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 6px',
              cursor: 'pointer',
              border: tab.id === activeTab ? '1px solid #7171C1' : 'none',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: tab.id === activeTab ? 500 : 400,
              letterSpacing: '-0.5px',
              color: tab.id === activeTab ? '#7171C1' : '#595959',
              textAlign: 'center',
              whiteSpace: 'nowrap'
            }}>
              {tab.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileTabs;
