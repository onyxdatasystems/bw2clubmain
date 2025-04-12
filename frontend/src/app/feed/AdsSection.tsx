import React from 'react';
import Image from 'next/image';

const AdsSection: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '225px',
      height: 'auto',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minWidth: '225px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <span style={{
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 400,
          letterSpacing: '-0.41px',
          lineHeight: '140%',
          color: '#000000'
        }}>
          Advertising
        </span>
        <div style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#CBD5E1',
          opacity: 0.52
        }} />
      </div>

      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#CBD5E1',
        opacity: 0.52
      }} />

      <div style={{
        width: '100%',
        height: 'auto',
        position: 'relative',
        borderRadius: '13.57px',
        overflow: 'hidden'
      }}>
        <Image
          src="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/rectangl-2.png"
          alt="Advertisement"
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default AdsSection;

