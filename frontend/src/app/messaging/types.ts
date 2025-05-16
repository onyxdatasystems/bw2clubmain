export interface Message {
  id: string;
  userName: string;
  message: string;
  isActive?: boolean;
  avatar: string;
}

export interface PostProps {
  id: string;
  userName: string;
  timeAgo: string;
  content: string;
  imageUrl: string;
  cheersCount: number;
  feedbackCount: number;
  spreadCount: number;
  avatar: string;
}