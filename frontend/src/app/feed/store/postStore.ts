import { create } from 'zustand';
import { Post } from '../types/page';

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  removePost: (id: number) => void;
  toggleLike: (id: number) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  removePost: (id) => set((state) => ({ posts: state.posts.filter(p => p.id !== id) })),
  toggleLike: (id) => set((state) => ({
    posts: state.posts.map(p =>
      p.id === id
        ? { ...p, likedByUser: !p.likedByUser, likes: p.likedByUser ? p.likes - 1 : p.likes + 1 }
        : p
    ),
  })),
}));
