// types/post.ts

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  likes: string[]; // or User[] depending on your app
  comments: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
    };
  }[];
}
