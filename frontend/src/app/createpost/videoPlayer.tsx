"use client"
import React, { useRef, useEffect } from 'react';
import { Video } from '@/store/videoSlice';

interface VideoPlayerProps {
  video: Video;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  video, 
  autoPlay = false, 
  controls = true,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().catch(e => console.error('Autoplay prevented:', e));
    }
  }, [autoPlay]);

  // SVG Play Icon
  const PlayIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className="w-8 h-8"
    >
      <path 
        fillRule="evenodd" 
        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" 
        clipRule="evenodd" 
      />
    </svg>
  );

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={video.url}
        poster={video.thumbnail}
        controls={controls}
        className="w-full h-auto rounded-lg"
      />
      {!controls && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={() => videoRef.current?.play()}
            className="p-4 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
          >
            <PlayIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;