import { Message, PostProps } from './types';

export const MESSAGES: Message[] = [
  { 
    id: '1',
    userName: "Ksenija Nikolova", 
    message: "What can I help with today?", 
    isActive: true,
    avatar: "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/avatar.png"
  },
  { 
    id: '2',
    userName: "Daniel Mac", 
    message: "How are you doing?",
    avatar: "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/avatar.png"
  },
  { 
    id: '3',
    userName: "Akin Davis", 
    message: "Hi Davis",
    avatar: "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/avatar.png"
  },
];

export const POSTS: PostProps[] = [
  {
    id: '1',
    userName: "Ksenija Nikolova",
    timeAgo: "30 mins",
    content: "Consectetur adipiscing elit. Vivamus in mi quis augue rhoncus euismod id ac neque. Fusce vulputate odio varius, lacinia nisi in...",
    imageUrl: "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/rectangl.png",
    cheersCount: 3,
    feedbackCount: 4,
    spreadCount: 2,
    avatar: "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/avatar.png"
  },
  {
    id: '2',
    userName: "Ksenija Nikolova",
    timeAgo: "1 hour",
    content: "Sagittis quam mauris aliquam feugiat leo nunc lectus. Mi purus sagittis odio eu. Massa ut facilisi vitae id diam.",
    imageUrl: "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/rectangl.png",
    cheersCount: 5,
    feedbackCount: 2,
    spreadCount: 1,
    avatar: "https://dashboard.codeparrot.ai/api/image/Z-0QtQz4-w8v6R-t/avatar.png"
  },
];