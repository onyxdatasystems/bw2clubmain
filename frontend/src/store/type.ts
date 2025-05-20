// types.ts
export interface User {
    id: string;
    name: string;
    avatar: string;
  }

  export interface Author{ id: string;
      content: string;
      created_at: string; 
      likes_count: number;
      comments_count: number;
      media: string | undefined;
      comments: never[]; }


  export interface Reactions {
    cheers: number;
    feedback: number;
    spread: number;
  }
  
  export interface Post {
    id: string;
    content: string;
    created_at: string;
    media?: string;
    likes_count: number;
    comments_count: number;
    author: string;
    comments?: Comment[];
    user: User;
  }
  export interface Comment {
    id: string;
    content: string;
    created_at: string;
    author: User;
  }
  
  export interface Ad {
    id: string;
    title: string;
    image_url: string;
    link: string;
    description?: string;  
  
  }
  
 

  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }


export interface Comment {
  id: string;
  author: User;
  avatar: string;
  content: string;
  timestamp: string;
  cheers: number;
  replies?: Comment[];
}

