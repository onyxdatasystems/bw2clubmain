"use client";
<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
import PostComposeBar from "./PostComposeBar";
import Timeline from "./Timeline";
import AdsSection from "./AdsSection";
import { Post, Ad, User, Comment, Media, Reaction } from "./store/types";
import Navbar from "../Navbar/page";
import SideBar from "../SideBar/page";

const HomeFeed: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingAds, setLoadingAds] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);
  const [errorAds, setErrorAds] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchUser = useCallback(async (): Promise<User> => {
    setLoadingUser(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: 'user-1',
        name: 'Azuka Chukwunonso',
        avatar: '/default-avatar.png',
      };
    } catch (error) {
      setErrorUser('Failed to load user');
      throw error;
    } finally {
      setLoadingUser(false);
    }
  }, []);

  const loadPosts = useCallback(async (pageNum: number): Promise<Post[]> => {
    try {
      setLoadingPosts(true);
      setErrorPosts(null);

      await new Promise(resolve => setTimeout(resolve, 500));

      const mockPosts: Post[] = Array.from({ length: 5 }, (_, i) => {
        const reactions: Reaction[] = [{
          type: 'like',
          count: Math.floor(Math.random() * 10),
          userReacted: false,
        }];

        return {
          id: `post-${pageNum}-${i}`,
          content: `This is post ${i + 1} on page ${pageNum}`,
          author: {
            id: `user-${Math.floor(Math.random() * 10)}`,
            name: `User ${Math.floor(Math.random() * 10)}`,
            avatar: '/default-avatar.png',
          },
          media: [{
            id: `media-${pageNum}-${i}`,
            url: '/sample-image.jpg',
            type: 'image',
            post_id: `post-${pageNum}-${i}`
          }],
          reactions,
          comments: [],
          created_at: new Date().toISOString(),
          saved: false,
        };
      });

      setHasMore(pageNum < 3);
      return mockPosts;
    } catch (error) {
      setErrorPosts('Failed to load posts');
      throw error;
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  const loadAds = useCallback(async (): Promise<Ad[]> => {
    try {
      setLoadingAds(true);
      setErrorAds(null);

      await new Promise(resolve => setTimeout(resolve, 300));

      return [{
        id: 'ad-1',
        title: 'Special Offer',
        image_url: '/images/ad.png',
        link: '#',
        description: 'Limited time deal!',
        created_at: new Date().toISOString(),
      }];
    } catch (error) {
      setErrorAds('Failed to load ads');
      throw error;
    } finally {
      setLoadingAds(false);
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [user, initialPosts, initialAds] = await Promise.all([
          fetchUser(),
          loadPosts(1),
          loadAds()
        ]);
        setCurrentUser(user);
        setPosts(initialPosts);
        setAds(initialAds);
      } catch (error) {
        console.error('Initial load error:', error);
      }
    };
    loadInitialData();
  }, [fetchUser, loadPosts, loadAds]);

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loadingPosts) return;
    const newPage = page + 1;
    const newPosts = await loadPosts(newPage);
    setPosts(prev => [...prev, ...newPosts]);
    setPage(newPage);
  }, [hasMore, loadingPosts, page, loadPosts]);

  const handleCreatePost = useCallback(async (content: string, mediaFiles: File[]) => {
    try {
      if (!currentUser) return;

      const media: Media[] = mediaFiles.map((file, index) => ({
        id: `media-${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video') ? 'video' : 'image',
        post_id: `post-${Date.now()}`
      }));

      const newPost: Post = {
        id: `post-${Date.now()}`,
        content,
        author: currentUser,
        media,
        reactions: [{
          type: 'like',
          count: 0,
          userReacted: false,
        }],
        comments: [],
        created_at: new Date().toISOString(),
        saved: false,
      };
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
<<<<<<< HEAD
  }, [currentUser]);

  const handleLike = useCallback(async (postId: string) => {
    try {
      setPosts(prev =>
        prev.map(post => {
          if (post.id === postId) {
            const updatedReactions = post.reactions.map(r =>
              r.type === 'like'
                ? {
                    ...r,
                    count: r.userReacted ? r.count - 1 : r.count + 1,
                    userReacted: !r.userReacted
                  }
                : r
            );
            return { ...post, reactions: updatedReactions };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }, []);

  const handleCommentSubmit = useCallback(async (postId: string, content: string) => {
    try {
      if (!currentUser) return;

      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            const newComment: Comment = {
              id: `comment-${Date.now()}`,
              content,
              author: currentUser,
              created_at: new Date().toISOString(),
              reactions: [],
            };
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }, [currentUser]);

  const handleDeletePost = useCallback(async (postId: string) => {
    try {
      setPosts(prev => {
        const postToDelete = prev.find(post => post.id === postId);
        if (postToDelete) {
          postToDelete.media.forEach(media => {
            if (media.url.startsWith('blob:')) {
              URL.revokeObjectURL(media.url);
            }
          });
        }
        return prev.filter(post => post.id !== postId);
      });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }, []);

  useEffect(() => {
    return () => {
      posts.forEach(post => {
        post.media.forEach(media => {
          if (media.url.startsWith('blob:')) {
            URL.revokeObjectURL(media.url);
          }
        });
      });
    };
  }, [posts]);

  if (loadingUser) {
    return <div className="text-center py-10">Loading user...</div>;
  }

  if (errorUser || !currentUser) {
    return <div className="text-center text-red-500 py-10">Failed to load user.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <SideBar />
        <main className="flex flex-1 flex-col lg:flex-row">
          <div className="flex-1 w-full max-w-4xl mx-auto p-4 lg:ml-64">
            <PostComposeBar onSubmit={handleCreatePost} />
            <Timeline
              posts={posts}
              currentUser={currentUser}
              onLike={handleLike}
              onCommentSubmit={handleCommentSubmit}
              onDelete={handleDeletePost}
              loading={loadingPosts}
              error={errorPosts}
              onLoadMore={loadMorePosts}
              hasMore={hasMore}
            />
          </div>
          <aside className="hidden lg:block w-80 p-4">
            <AdsSection ads={ads} loading={loadingAds} error={errorAds} />
          </aside>
        </main>
      </div>
=======
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
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

<<<<<<< HEAD
export default HomeFeed;
=======
export default HomePage;
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
