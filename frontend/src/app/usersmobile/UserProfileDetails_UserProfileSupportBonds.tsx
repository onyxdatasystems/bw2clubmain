import React from 'react';
import Image from 'next/image';

interface UserInfo {
  name: string;
  avatar: string;
}

const defaultSupportBonds: UserInfo[] = [
  { name: 'Alfredo Donin', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-9.png' },
  { name: 'Anika Ekstrom Bothman', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-10.png' },
  { name: 'Ashlynn Dias', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-11.png' },
  { name: 'Aspen Mango', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-12.png' },
  { name: 'Chance Press', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-13.png' },
  { name: 'Cheyenne Vetrovs', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-14.png' },
  { name: 'Craig Franci', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-15.png' },
  { name: 'Davis Dorwart', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-16.png' },
  { name: 'Martin Westervelt', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-17.png' },
  { name: 'Zaire Herwitz', avatar: 'https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-18.png' },
];

const UserProfileDetails_UserProfileSupportBonds: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '393px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      padding: '16px',
      background: 'inherit'
    }}>
      {/* Details Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/briefcas-6.png" width={14} height={14} alt="work" />
          <span style={{
            fontFamily: 'Inter',
            fontSize: '14px',
            letterSpacing: '-0.6px',
            color: '#212121'
          }}>
            Works as Founder at Better Women Better World
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
        }}>
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/graduati-6.png" width={14} height={14} alt="education" />
          <span style={{
            fontFamily: 'Inter',
            fontSize: '14px',
            letterSpacing: '-0.6px',
            lineHeight: '130%',
            color: '#212121'
          }}>
            Studied Bachelor of Arts in Tourism and Leisure Management at EU Business School Barcelona
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/cake-1-6.png" width={14} height={14} alt="birthday" />
          <span style={{
            fontFamily: 'Inter',
            fontSize: '14px',
            letterSpacing: '-0.6px',
            color: '#212121'
          }}>
            Born on August 2, 1988
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '24px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/leo-svgr-6.png" width={14} height={14} alt="zodiac" />
            <span style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              letterSpacing: '-0.6px',
              color: '#212121'
            }}>
              Leo
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/globe-2-6.png" width={14} height={14} alt="language" />
            <span style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              letterSpacing: '-0.6px',
              color: '#212121'
            }}>
              English
            </span>
          </div>
        </div>
      </div>

      {/* Support Bonds Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}>
        {defaultSupportBonds.map((user, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '0',
            }}
          >
            <Image 
              src={user.avatar} 
              width={36} 
              height={36} 
              alt={user.name}
              style={{ borderRadius: '50%' }}
            />
            <span style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '-0.5px',
              color: '#212121',
              marginLeft: '10px'
            }}>
              {user.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileDetails_UserProfileSupportBonds;

