export interface Post {
    id: number;
    author: string;
    timeAgo: string;
    content: string;
    image: string;
    cheers: number;
    feedbacks: number;
    spread: number;
    avatar: string;
  }
  
  export interface UserInfo {
    id: number;
    name: string;
    avatar: string;
    worksAt?: string;
    education?: string;
    birthDate?: string;
    zodiac?: string;
    language?: string;
  }
  
  export interface PaymentHistory {
    id: number;
    amount: number;
    date: string;
    status: string;
    description: string;
  }
  
  export interface TabItem {
    id: string;
    label: string;
  }