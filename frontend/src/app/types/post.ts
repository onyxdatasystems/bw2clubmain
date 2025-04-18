
export interface Post {
    id: string;
    content: string;
    author: User;
    media: Media[];
    reactions: Reaction[];
    comments: Comment[];
    created_at: string;
    saved: boolean;
  }
  
  export interface User {
    id: string;
    name: string;
    avatar: string;
  }
  
  export interface Media {
    id: string;
    url: string;
    type: 'image' | 'video';
  }
  
  export interface Reaction {
    type: string;
    count: number;
    userReacted: boolean;
  }
  
  export interface Comment {
    id: string;
    content: string;
    author: User;
    created_at: string;
    reactions: Reaction[];
  }