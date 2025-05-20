<<<<<<< HEAD
// Layout.tsx
"use client"
import React, { useEffect, useRef } from 'react';
import Navbar from '../Navbar/page';
import Sidebar from '../SideBar/page';
=======
"use client"
import React from 'react';
import Navbar from '../Navbar/page';
import SideBar from '../SideBar/page';
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
import PostCompose from './PostCompose';
import Post from './Post';
import Ads from './Ads';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchPosts } from '@/store/postsSlice';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import VideoUploadForm from './VideoUploadForm';
import VideoList from './VideoList';

export default function CreatePostPage() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const status = useAppSelector((state) => state.posts.status);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <motion.div
      className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <motion.div
        className="flex flex-row flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
     <div className="flex">
      <Sidebar joinedGroups={[{id: '1', name: 'Group A'}]} />
      <main className="flex-1 p-6 md:ml-64">
         <PostCompose className="flex-none w-full max-w-2xl mb-6" />

          {status === 'loading' && (
            <div className="w-full max-w-2xl flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {status === 'succeeded' && posts.length === 0 && (
            <div className="w-full max-w-2xl text-center py-8 text-gray-500">
              No posts yet. Be the first to post!
            </div>
          )}
          
          {posts.map((post) => (
            <Post 
              key={post.id} 
              className="flex-grow w-full max-w-2xl mb-6" 
              post={post} 
            />
          ))}
        </main>
          </div>
        <Ads className="hidden lg:flex flex-none w-1/5 ml-4" />
      </motion.div>
      <div className="space-y-8">
        <VideoUploadForm />
        <VideoList />
      </div>
    
    </motion.div>
  );
};
=======

// Layout Manager with responsive design
class LayoutManager {
  static pageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  };

  static contentAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3 }
  };
}

const Layout: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100"
      {...LayoutManager.pageAnimation}
    >
      <Navbar />
      <motion.div 
        className="flex flex-row flex-grow"
        {...LayoutManager.contentAnimation}
      >
        <SideBar className="hidden md:flex flex-none w-1/5" />
        <main className="flex-grow flex flex-col items-center p-4 overflow-y-auto">
          <PostCompose className="flex-none w-full max-w-2xl mb-6" />
          <Post className="flex-grow w-full max-w-2xl" />
        </main>
        <Ads className="hidden lg:flex flex-none w-1/5 ml-4" />
      </motion.div>
    </motion.div>
  );
};

export default Layout;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
