// api.ts
import axios from 'axios';
import { Post } from '@/store/postsSlice'; // Now this import will work
import {Video} from '@/store/videoSlice';


const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced API configuration with interceptors
api.interceptors.request.use(config => {
  // Add auth token if exists
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized requests
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Posts API with proper typing

export const videoApi = {
  getAll: () => api.get<Video[]>('/videos'),
  create: (data: FormData) => api.post<Video>('/videos', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  view: (id: string) => api.post<Video>(`/videos/${id}/view`),
  save: (id: string) => api.post<Video>(`/videos/${id}/save`),
  unsave: (id: string) => api.post<Video>(`/videos/${id}/unsave`),
  delete: (id: string) => api.delete<void>(`/videos/${id}`),
  getRecommended: () => api.get<Video[]>('/videos/recommended'),
  search: (query: string) => api.get<Video[]>(`/videos/search?q=${query}`),
};

export const postApi = {
  create: (data: FormData) => api.post<Post>('/posts', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  edit: (id: string, data: { content: string }) => api.patch<Post>(`/posts/${id}`, data),
  delete: (id: string) => api.delete<void>(`/posts/${id}`),
  getTimeline: () => api.get<Post[]>('/posts/timeline'),
  loadMoreTimeline: (lastId: string) => api.get<Post[]>(`/posts/timeline?lastId=${lastId}`),
  getMedia: (id: string) => api.get(`/posts/${id}/media`),
  deleteMedia: (id: string) => api.delete(`/posts/media/${id}`),
  report: (data: { postId: string; reason: string }) => api.post('/posts/report', data),
};

// Reactions API
export const reactionApi = {
  react: (data: { postId: string; type: string }) => api.post('/reactions', data),
  getPostReactions: (postId: string) => api.get(`/reactions/${postId}`),
};



export default api;