
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
<<<<<<< HEAD
  }
  // types/post.ts
export interface Story {
  id: string;
  media_url: string;
  caption?: string;
  created_at: string;
  user: User;
  views_count: number;
}

export interface Media {
  id: string;
  url: string;
  type: 'image' | 'video';
  post_id: string;
}

export interface Ad {
  id: string;
  title: string;
  image_url: string;
  link: string;
  description?: string;
  created_at: string;
}
=======
  }
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
