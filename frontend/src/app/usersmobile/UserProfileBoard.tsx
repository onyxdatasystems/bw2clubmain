import React from 'react';
import Image from 'next/image';

interface Post {
  id: number;
  author: string;
  timeAgo: string;
  content: string;
  image: string;
  cheers: number;
  feedbacks: number;
  spread: number;
  avatar: string;
}

const UserProfileBoard: React.FC = () => {
  const posts: Post[] = [
    {
      id: 1,
      author: "Ksenija Nikolova",
      timeAgo: "30 mins",
      content: "Consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. Fusce vulputate odio varius, lacinia nisi in,...Read more",
      image: "https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/picture.png",
      cheers: 3,
      feedbacks: 4,
      spread: 2,
      avatar: "https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-2.png"
    },
    {
      id: 2,
      author: "Ksenija Nikolova",
      timeAgo: "30 mins",
      content: "Consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. Fusce vulputate odio varius, lacinia nisi in,...Read more",
      image: "https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/picture-2.png",
      cheers: 3,
      feedbacks: 4,
      spread: 2,
      avatar: "https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/avatar-3.png"
    }
  ];

  return (
    <div style={{ width: '100%', maxWidth: '393px', display: 'flex', flexDirection: 'column', gap: '20px', margin: '0 auto' }}>
      {posts.map((post) => (
        <div key={post.id} style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                <Image src={post.avatar} alt="Avatar" width={36} height={36} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, letterSpacing: '-0.5px', color: '#212121' }}>
                    {post.author}
                  </span>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', letterSpacing: '-0.5px', color: '#212121' }}>
                    {post.timeAgo}
                  </span>
                </div>
              </div>
              <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/dots-thr-2.png" alt="Menu" width={20} height={20} />
            </div>

            {/* Content */}
            <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.6px', lineHeight: '130%', color: '#212121' }}>
              {post.content}
            </p>

            <Image src={post.image} alt="Post" width={361} height={212} style={{ borderRadius: '8px' }} />

            {/* Interactions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/like-but.png" alt="Cheers" width={20} height={20} />
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.5px', color: '#212121' }}>
                    {post.cheers} Cheers
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/message.png" alt="Feedback" width={20} height={20} />
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.5px', color: '#212121' }}>
                    {post.feedbacks} Feedbacks
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/share-08.png" alt="Spread" width={20} height={20} />
                <span style={{ fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.5px', color: '#212121' }}>
                  {post.spread} Spread
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/like-but.png" alt="Cheers" width={20} height={20} />
                <span style={{ fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.5px', color: '#212121' }}>Cheers</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/message.png" alt="Feedback" width={20} height={20} />
                <span style={{ fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.5px', color: '#212121' }}>Feedback</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/share-08.png" alt="Spread" width={20} height={20} />
                <span style={{ fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.5px', color: '#212121' }}>Spread</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/link-05.png" alt="Copy Link" width={20} height={20} />
                <span style={{ fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.5px', color: '#212121' }}>Copy Link</span>
              </div>
            </div>

            {/* Feedback Input */}
            <div style={{ display: 'flex', gap: '4px', padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ 
                flex: 1, 
                height: '40px',
                background: '#fcfdfe',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px'
              }}>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', letterSpacing: '-0.5px', color: '#747474' }}>
                  Enter Feedback...
                </span>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image src="https://dashboard.codeparrot.ai/api/image/Z-1e0Qz4-w8v6SCg/paper-pl-2.png" alt="Send" width={22} height={22} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfileBoard;

