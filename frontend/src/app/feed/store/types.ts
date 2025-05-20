// In store/type.ts
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

export interface Ad {
  id: string;
  title: string;
  image_url?: string;
  video_url?: string;
  description?: string;
  link: string;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  created_at: string;
  reactions: Reaction[];
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  post_id: string;
}

export interface Reaction {
  type: 'like';
  count: number;
  userReacted: boolean;
}
