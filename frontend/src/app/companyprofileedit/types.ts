export type Post = {
  id: number;
  content: string;
  image?: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
};
