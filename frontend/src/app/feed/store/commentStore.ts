import { create } from 'zustand';
import { Comment, Post } from '../types/page';

interface CommentStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addComment: (postId: number, comment: Comment) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addComment: (postId, comment) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), comment] }
          : post
      );
      return { posts: updatedPosts };
    }),
}));
