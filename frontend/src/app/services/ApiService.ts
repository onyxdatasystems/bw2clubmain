
import { Post, Comment, Reaction } from '../types/post';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bw2club.onyxdatasystems.com/backend/api/v1';
  }

  private async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const headers: HeadersInit = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };

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

    const response = await fetch(`${this.baseUrl}/${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Posts
  async getTimeline(): Promise<Post[]> {
    return this.request('GET', 'timeline');
  }

  async createPost(content: string, mediaFiles: File[]): Promise<Post> {
    const formData = new FormData();
    formData.append('content', content);
    mediaFiles.forEach(file => formData.append('media', file));
    return this.request('POST', 'create_post', formData);
  }

  async editPost(id: string, content: string): Promise<Post> {
    return this.request('POST', `edit_post/${id}`, { content });
  }

  async loadMorePosts(offset: number): Promise<Post[]> {
    return this.request('GET', `load_post_by_scrolling?offset=${offset}`);
  }

  // Reactions
  async reactToPost(postId: string, reactionType: string): Promise<Reaction> {
    return this.request('POST', 'https://bw2club.onyxdatasystems.com/backend/api/v1/my_react', { postId, reactionType });
  }

  async reactToComment(commentId: string, reactionType: string): Promise<Reaction> {
    return this.request('POST', 'https://bw2club.onyxdatasystems.com/backend/api/v1/my_comment_react', { commentId, reactionType });
  }

  // Comments
  async postComment(postId: string, content: string): Promise<Comment> {
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
  }
}

export const apiService = new ApiService();