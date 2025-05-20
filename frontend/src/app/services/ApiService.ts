<<<<<<< HEAD
// services/apiService.ts
import { Post, Comment, Reaction, Story, Media, Ad } from '../types/post';
=======

import { Post, Comment, Reaction } from '../types/post';

>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
class ApiService {
  private baseUrl: string;

  constructor() {
<<<<<<< HEAD
    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in environment variables');
    }
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  }

  private async request<T>(method: string, endpoint: string, data?: unknown): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
=======
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bw2club.onyxdatasystems.com/backend/api/v1';
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const headers: HeadersInit = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272

    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include'
    };

    if (data) {
      config.body = data instanceof FormData ? data : JSON.stringify(data);
    }

<<<<<<< HEAD
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
=======
    const response = await fetch(`${this.baseUrl}/${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  }

  // Posts
  async getTimeline(): Promise<Post[]> {
    return this.request('GET', 'timeline');
  }

<<<<<<< HEAD
  async loadMorePosts(offset: number): Promise<Post[]> {
    return this.request('GET', `load_timeline?offset=${offset}`);
  }

  async createPost(content: string, mediaFiles: File[]): Promise<Post> {
    const formData = new FormData();
    formData.append('content', content);
    mediaFiles.forEach(file => formData.append('media[]', file));
=======
  async createPost(content: string, mediaFiles: File[]): Promise<Post> {
    const formData = new FormData();
    formData.append('content', content);
    mediaFiles.forEach(file => formData.append('media', file));
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    return this.request('POST', 'create_post', formData);
  }

  async editPost(id: string, content: string): Promise<Post> {
    return this.request('POST', `edit_post/${id}`, { content });
  }

<<<<<<< HEAD
  async deletePost(postId: string): Promise<void> {
    return this.request('POST', `delete_post/${postId}`);
  }

  async getPostReactions(postId: string): Promise<Reaction[]> {
    return this.request('GET', `getPostReactions/${postId}`);
=======
  async loadMorePosts(offset: number): Promise<Post[]> {
    return this.request('GET', `load_post_by_scrolling?offset=${offset}`);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  }

  // Reactions
  async reactToPost(postId: string, reactionType: string): Promise<Reaction> {
<<<<<<< HEAD
    return this.request('POST', 'reaction', { post_id: postId, reaction_type: reactionType });
=======
    return this.request('POST', 'https://bw2club.onyxdatasystems.com/backend/api/v1/my_react', { postId, reactionType });
  }

  async reactToComment(commentId: string, reactionType: string): Promise<Reaction> {
    return this.request('POST', 'https://bw2club.onyxdatasystems.com/backend/api/v1/my_comment_react', { commentId, reactionType });
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  }

  // Comments
  async postComment(postId: string, content: string): Promise<Comment> {
<<<<<<< HEAD
    return this.request('POST', 'post_comment', { post_id: postId, content });
  }

  async loadComments(postId: string): Promise<Comment[]> {
    return this.request('GET', `load_post_comments?post_id=${postId}`);
  }

  // Stories
 // services/apiService.ts


// ... (keep the existing code above)

  // Stories
  async getStories(): Promise<Story[]> {
    return this.request('GET', 'stories');
  }

  async createStory(mediaFile: File, caption?: string): Promise<Story> {
    const formData = new FormData();
    formData.append('media', mediaFile);
    if (caption) formData.append('caption', caption);
    return this.request('POST', 'create_story', formData);
  }

  // Media
  async getPostMedia(postId: string): Promise<Media[]> {
    return this.request('GET', `post_media_file/${postId}`);
  }

  async deleteMedia(mediaId: string): Promise<{ success: boolean }> {
    return this.request('POST', `delete_media_file/${mediaId}`);
  }

  // Reports
  async reportPost(postId: string, reason: string): Promise<{ success: boolean }> {
    return this.request('POST', 'save_post_report', { post_id: postId, reason });
  }

  // Ads
  async getAds(): Promise<Ad[]> {
    return this.request('GET', 'user/ads');
=======
    return this.request('POST', 'https://bw2club.onyxdatasystems.com/backend/api/v1/post_comment', { postId, content });
  }

  async loadComments(postId: string): Promise<Comment[]> {
    return this.request('GET', `https://bw2club.onyxdatasystems.com/backend/api/v1/load_post_comments?postId=${postId}`);
  }

  // Post Actions
  async savePost(postId: string): Promise<void> {
    return this.request('GET', `https://bw2club.onyxdatasystems.com/backend/api/v1save-post/${postId}`);
  }

  async unsavePost(postId: string): Promise<void> {
    return this.request('GET', `https://bw2club.onyxdatasystems.com/backend/api/v1/unsave-post/${postId}`);
  }

  async deletePost(postId: string): Promise<void> {
    return this.request('DELETE', 'https://bw2club.onyxdatasystems.com/backend/api/v1/delete/my/post', { postId });
  }

  // Media
  async deleteMedia(mediaId: string): Promise<void> {
    return this.request('DELETE', `https://bw2club.onyxdatasystems.com/backend/api/v1/media/file/delete/${mediaId}`);
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  }
}

export const apiService = new ApiService();