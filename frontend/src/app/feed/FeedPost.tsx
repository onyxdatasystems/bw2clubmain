<<<<<<< HEAD
import React, { useState } from 'react';
import Image from 'next/image';
import { Post, User, Comment } from './store/types';

interface FeedPostProps {
  post: Post;
  currentUser: User;
  onLike: (postId: string) => Promise<void>;
  onCommentSubmit: (postId: string, content: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
}

const FeedPost: React.FC<FeedPostProps> = ({
  post,
  currentUser,
  onLike,
  onCommentSubmit,
  onDelete,
}) => {
  const [commentContent, setCommentContent] = useState('');

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentContent.trim()) {
      await onCommentSubmit(post.id, commentContent);
      setCommentContent('');
    }
  };

  const renderComment = (comment: Comment) => (
    <li key={comment.id} className="flex items-start">
      <div className="relative w-8 h-8 mr-2">
        <Image
          src={comment.author.avatar || '/default-avatar.png'}
          alt={comment.author.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 p-2 rounded-lg">
          <strong className="text-sm">{comment.author.name}</strong>
          <p className="text-sm">{comment.content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(comment.created_at).toLocaleString()}
        </p>
      </div>
    </li>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      {/* Author Info */}
      <div className="flex items-center mb-4">
        <div className="relative w-10 h-10 mr-3">
          <Image
            src={post.author.avatar || '/default-avatar.png'}
            alt={post.author.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{post.author.name}</h3>
          <p className="text-xs text-gray-500">
            {new Date(post.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4">{post.content}</p>

      {/* Media */}
      {post.media.length > 0 && (
        <div className="mb-4">
          {post.media.map((media) => (
            <div key={media.id} className="relative w-full h-64 rounded-lg overflow-hidden mb-2">
              {media.type === 'image' ? (
                <Image
                  src={media.url}
                  alt="Post media"
                  fill
                  className="object-cover"
                  unoptimized={media.url.startsWith('blob:')}
                />
              ) : (
                <video controls src={media.url} className="w-full h-full object-contain" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reactions */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center ${post.reactions.some(r => r.userReacted) ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <span className="mr-1">👍</span>
          <span>
            {post.reactions.reduce((sum, reaction) => sum + reaction.count, 0)}
          </span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="border-t pt-3">
        <h4 className="font-semibold mb-2">Comments ({post.comments.length})</h4>
        <ul className="space-y-3 mb-4">
          {post.comments.map((comment: Comment) => renderComment(comment))}
        </ul>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="flex gap-2">
          <input
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="flex-1 border rounded-full px-4 py-2 text-sm"
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm"
            disabled={!commentContent.trim()}
          >
            Post
          </button>
        </form>
      </div>

      {/* Delete Button for Author */}
      {post.author.id === currentUser.id && (
        <button
          onClick={() => onDelete(post.id)}
          className="mt-2 text-red-500 text-sm hover:underline"
        >
          Delete Post
        </button>
      )}
=======
import React from 'react';
import Image from 'next/image';

interface FeedPostProps {
  userName?: string;
  timeAgo?: string;
  content?: string;
  imageUrl?: string;
  avatarUrl?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  userName = "Jackie Jonnes",
  timeAgo = "30 mins",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. Fusce vulputate odio varius, lacinia nisi in, ultrices mauris. Fusce dignissim nec massa non luctusfdfdfdfdfd.",
  imageUrl = "https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/image-ty.png",
  avatarUrl = "https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/avatar.png"
}) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '546px',
      backgroundColor: '#ffffff',
      border: '1px solid #ebecef',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      padding: '4px 0',
      margin: '10px 0'
    }}>
      {/* User Info Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '8px 16px',
        alignItems: 'center',
        height: '56px',
        position: 'relative'
      }}>
        <div style={{ width: '40px', height: '40px', position: 'relative' }}>
          <Image
            src={avatarUrl}
            alt="User avatar"
            fill
            style={{ borderRadius: '50%' }}
          />
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '16px',
          flex: 1
        }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#292b32',
            letterSpacing: '-0.41px',
            lineHeight: '140%'
          }}>{userName}</span>
          <span style={{
            fontSize: '14px',
            color: '#636878',
            letterSpacing: '-0.41px',
            lineHeight: '140%'
          }}>{timeAgo}</span>
        </div>

        <button style={{
          width: '24px',
          height: '40px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 4px'
        }}>
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-0LOgz4-w8v6R-X/frame-20.png"
            alt="More options"
            width={15}
            height={4}
          />
        </button>
      </div>

      {/* Content Section */}
      <div style={{
        padding: '8px 16px',
        fontSize: '14px',
        color: '#292b32',
        letterSpacing: '-0.41px',
        lineHeight: '140%'
      }}>
        {content}
      </div>

      {/* Image Section */}
      <div style={{
        width: '100%',
        height: 'auto',
        position: 'relative',
        marginTop: '8px'
      }}>
        <Image
          src={imageUrl}
          alt="Post image"
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
        />
      </div>

      {/* Divider */}
      <div style={{
        width: '100%',
        height: '1px',
        backgroundColor: '#ebecef',
        marginTop: '8px'
      }} />
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    </div>
  );
};

export default FeedPost;
<<<<<<< HEAD
=======

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
