"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { apiService } from '../services/ApiService';
import { Comment } from '../types/post';

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const loadComments = async () => {
    setLoading(true);
    try {
      const comments = await apiService.loadComments(postId);
      setComments(comments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const comment = await apiService.postComment(postId, newComment);
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="border-t pt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Post Comment
        </button>
      </form>

      {loading ? (
        <div>Loading comments...</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <Image
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="ml-2 font-semibold">{comment.author.name}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;