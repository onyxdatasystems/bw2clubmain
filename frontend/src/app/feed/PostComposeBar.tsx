import React from 'react';
import Image from 'next/image';

const PostComposeBar: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '546px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <div style={{
        flex: 1,
        padding: '16px 16px 16px 12px',
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        background: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #ebecef',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '72px',
          background: '#fa53f7',
          position: 'relative'
        }}>
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/asset-2.png"
            alt="Avatar"
            fill
            style={{ borderRadius: '72px' }}
          />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1
        }}>
          <div style={{
            padding: '14px 12px',
            background: '#ffffff',
            borderRadius: '4px',
            border: '1px solid #ebecef',
            boxSizing: 'border-box'
          }}>
            <input
              type="text"
              placeholder="What's going on..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontFamily: 'Inter',
                fontSize: '14px',
                letterSpacing: '-0.41px',
                lineHeight: '140%',
                color: '#898e9e'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '8px'
            }}>
              <AttachmentButton icon="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/image-2.png" />
              <AttachmentButton icon="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/play-circ-2.png" />
              <AttachmentButton icon="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/papercli-2.png" />
            </div>

            <button style={{
              padding: '4px 12px',
              background: 'linear-gradient(180deg, rgba(133,133,213,1) 0%, rgba(103,103,183,1) 100%)',
              borderRadius: '100px',
              border: 'none',
              color: '#ffffff',
              fontFamily: 'Inter',
              fontSize: '14px',
              lineHeight: '20px',
              cursor: 'pointer'
            }}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AttachmentButton: React.FC<{icon: string}> = ({icon}) => {
  return (
    <div style={{
      width: '32px',
      height: '32px',
      position: 'relative',
      cursor: 'pointer'
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: '#ebecef',
        opacity: 0.6
      }} />
      <div style={{
        position: 'absolute',
        top: '4px',
        left: '4px',
        width: '24px',
        height: '24px'
      }}>
        <Image
          src={icon}
          alt="Attachment"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default PostComposeBar;

