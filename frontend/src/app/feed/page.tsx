"use client";
import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { apiService } from '../services/ApiService';
import FeedPost from './FeedPost';
import PostComposeBar from './PostComposeBar';
import { Post } from '../types/post';

const DynamicSideBar = dynamic(() => import('../SideBar/page'), { ssr: false });
const DynamicAdsSection = dynamic(() => import('./AdsSection'), { ssr: false });

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = useCallback(async () => {
    try {
      const newPosts = await apiService.loadMorePosts(page);
      setPosts(prev => [...prev, ...newPosts]);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }, [page]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleCreatePost = async (content: string, mediaFiles: File[]) => {
    try {
      const newPost = await apiService.createPost(content, mediaFiles);
      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <DynamicSideBar />

      <main className="flex-1 p-4 max-w-2xl mx-auto">
        <PostComposeBar onCreatePost={handleCreatePost} />
        
        {posts.map(post => (
          <FeedPost key={post.id} post={post} onUpdate={loadPosts} />
        ))}

        {hasMore && (
          <button 
            onClick={() => setPage(prev => prev + 1)}
            className="w-full py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Load More
          </button>
        )}
      </main>

      <aside className="hidden lg:block w-64 p-4">
        <DynamicAdsSection />
      </aside>
    </div>
  );
};

export default HomePage;