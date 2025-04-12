import React from 'react';
import Image from 'next/image';

interface FeedPostProps {
  userName?: string;
  timeAgo?: string;
  content?: string;
  imageUrl?: string;
  avatarUrl?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  userName = "Jackie Jonnes",
  timeAgo = "30 mins",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. Fusce vulputate odio varius, lacinia nisi in, ultrices mauris. Fusce dignissim nec massa non luctusfdfdfdfdfd.",
  imageUrl = "https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/image-ty.png",
  avatarUrl = "https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/avatar.png"
}) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '546px',
      backgroundColor: '#ffffff',
      border: '1px solid #ebecef',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      padding: '4px 0',
      margin: '10px 0'
    }}>
      {/* User Info Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 16px',
        alignItems: 'center',
        height: '56px',
        position: 'relative'
      }}>
        <div style={{ width: '40px', height: '40px', position: 'relative' }}>
          <Image
            src={avatarUrl}
            alt="User avatar"
            fill
            style={{ borderRadius: '50%' }}
          />
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '16px',
          flex: 1
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#292b32',
            letterSpacing: '-0.41px',
            lineHeight: '140%'
          }}>{userName}</span>
          <span style={{
            fontSize: '14px',
            color: '#636878',
            letterSpacing: '-0.41px',
            lineHeight: '140%'
          }}>{timeAgo}</span>
        </div>

        <button style={{
          width: '24px',
          height: '40px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 4px'
        }}>
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/frame-20.png"
            alt="More options"
            width={15}
            height={4}
          />
        </button>
      </div>

      {/* Content Section */}
      <div style={{
        padding: '8px 16px',
        fontSize: '14px',
        color: '#292b32',
        letterSpacing: '-0.41px',
        lineHeight: '140%'
      }}>
        {content}
      </div>

      {/* Image Section */}
      <div style={{
        width: '100%',
        height: 'auto',
        position: 'relative',
        marginTop: '8px'
      }}>
        <Image
          src={imageUrl}
          alt="Post image"
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>

      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#ebecef',
        marginTop: '8px'
      }} />
    </div>
  );
};

export default FeedPost;

