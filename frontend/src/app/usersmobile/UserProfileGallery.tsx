import React from 'react';
import Image from 'next/image';

const UserProfileGallery: React.FC = () => {
  const thumbnails = [
    'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai.png',
    'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai-2.png',
    'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai-3.png',
    'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai-4.png',
    'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/thumbnai-5.png'
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      gap: '6px',
      width: '100%',
      maxWidth: '361px',
      padding: '16px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {thumbnails.map((src, index) => (
        <div 
          key={index}
          style={{
            width: '116.33px',
            height: '120px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
          }}
        >
          <Image
            src={src}
            alt={`Gallery thumbnail ${index + 1}`}
            fill
            style={{
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default UserProfileGallery;

