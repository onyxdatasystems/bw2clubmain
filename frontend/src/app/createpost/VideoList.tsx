"use client"
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchVideos } from '@/store/videoSlice';
import VideoPlayer from './videoPlayer';
import { motion } from 'framer-motion';

const VideoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { videos, status, error } = useAppSelector((state) => state.videos);

  React.useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading videos...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <VideoPlayer video={video} autoPlay={false} />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{video.description}</p>
            <div className="flex items-center mt-3 text-sm text-gray-500">
              <span>{video.views} views</span>
              <span className="mx-2">•</span>
              <span>{new Date(video.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VideoList;