// Timeline.tsx
import React from 'react';
import FeedPost from './FeedPost';
import { Post, User } from './store/types';

interface TimelineProps {
  posts: Post[];
  currentUser: User;
  onLike: (postId: string) => Promise<void>;
  onCommentSubmit: (postId: string, content: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({
  posts,
  currentUser,
  onLike,
  onCommentSubmit,
  onDelete,
  loading = false,
  error = null,
  onLoadMore,
  hasMore = false
}) => {
  return (
    <div className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      {posts.map((post) => (
        <FeedPost
          key={post.id}
          post={post}
          currentUser={currentUser}
          onLike={onLike}
          onCommentSubmit={onCommentSubmit}
          onDelete={onDelete}
        />
      ))}

      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {hasMore && onLoadMore && (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Timeline;