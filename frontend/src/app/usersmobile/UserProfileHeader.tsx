import React from 'react';
import Image from 'next/image';

interface UserProfileHeaderProps {
  name?: string;
  avatarUrl?: string;
  onSupport?: () => void;
  onMessage?: () => void;
  onSearch?: () => void;
  onMenu?: () => void;
  onBack?: () => void;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  name = "Ksenija Nikolova",
  avatarUrl = "https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-8.png",
  onSupport = () => {},
  onMessage = () => {},
  onSearch = () => {},
  onMenu = () => {},
  onBack = () => {},
}) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '393px',
      display: 'flex',
      flexDirection: 'column',
      background: 'inherit',
      margin: '0 auto'
    }}>
      {/* Status Bar */}
      <div style={{
        height: '54px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px'
      }}>
        <div style={{
          fontSize: '17px',
          fontWeight: 600,
          color: '#141414',
          fontFamily: 'Inter'
        }}>
          9:41
        </div>
        <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/levels-6.png" alt="Levels" width={54} height={21} />
      </div>

      {/* Header Bar */}
      <div style={{
        height: '46px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 12px',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
      }}>
        <button onClick={onBack} style={{
          width: '30px',
          height: '30px',
          borderRadius: '1000px',
          border: '1px solid #fefefe',
          background: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/arrow-ri-6.png" alt="Back" width={18} height={18} />
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onSearch} style={{
            width: '30px',
            height: '30px',
            borderRadius: '1000px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/search-6.png" alt="Search" width={18} height={18} />
          </button>
          <button onClick={onMenu} style={{
            width: '30px',
            height: '30px',
            borderRadius: '1000px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/dots-thr-8.png" alt="Menu" width={18} height={18} />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <Image src={avatarUrl} alt="Avatar" width={60} height={60} style={{ borderRadius: '30px' }} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '15px',
            fontWeight: 500,
            color: '#141414',
            fontFamily: 'Inter',
            letterSpacing: '-0.5px'
          }}>
            {name}
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onMessage} style={{
              width: '32px',
              height: '32px',
              borderRadius: '1000px',
              border: '1px solid #7171C1',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/paper-pl-8.png" alt="Message" width={16} height={16} />
            </button>
            <button onClick={onSupport} style={{
              height: '32px',
              padding: '4px 12px',
              borderRadius: '100px',
              border: 'none',
              background: 'linear-gradient(180deg, rgba(133,133,213,1) 0%, rgba(103,103,183,1) 100%)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Inter',
              letterSpacing: '-0.5px',
              cursor: 'pointer'
            }}>
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;

