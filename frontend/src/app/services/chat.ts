// services/chat.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ChatMessage {
  message: string;
  threadId: string;
  senderId: string;
}

interface ThreadData {
  title: string;
  participants: string[];
}

interface ReactionData {
  chatId: string;
  reaction: string;
  userId: string;
}

export const ChatService = {
  getChats: async () => {
    const response = await fetch(`${BASE_URL}/chat`);
    return await response.json();
  },
  
  getChatMessages: async (threadId: string) => {
    const response = await fetch(`${BASE_URL}/chat_msg/${threadId}`);
    return await response.json();
  },
  
  saveChat: async (data: ChatMessage) => {
    const response = await fetch(`${BASE_URL}/chat_save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: data.message,
        msg_thrade: data.threadId, // Note: Using backend's expected field name
        user_id: data.senderId      // Note: Using backend's expected field name
      })
    });
    return await response.json();
  },
  
  saveThread: async (data: ThreadData) => {
    const response = await fetch(`${BASE_URL}/thread_save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  },
  
  removeChat: async (chatId: string) => {
    const response = await fetch(`${BASE_URL}/remove_chat/${chatId}`, {
      method: 'POST'
    });
    return await response.json();
  },
  
  markAsRead: async (userId: string) => {
    const response = await fetch(`${BASE_URL}/chat_read_option/${userId}`, {
      method: 'POST'
    });
    return await response.json();
  },
  
  reactToChat: async (data: ReactionData) => {
    const response = await fetch(`${BASE_URL}/react_chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: data.chatId,
        reaction: data.reaction,
        user_id: data.userId
      })
    });
    return await response.json();
  }
};