import axios from 'axios';
import { Post, UserInfo, PaymentHistory } from '../types/userProfileTypes';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables.');
}

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const fetchUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data.user || {};
  } catch (error) {
    console.error('Error fetching user info:', error);
    return {} as UserInfo;
  }
};

export const fetchSupportBonds = async (): Promise<UserInfo[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user`);
    return response.data.supportBonds || [];
  } catch (error) {
    console.error('Error fetching support bonds:', error);
    return [];
  }
};

export const fetchPaymentHistory = async (): Promise<PaymentHistory[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/payment-histories`);
    return response.data.history || [];
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return [];
  }
};

export const cheerPost = async (postId: number): Promise<boolean> => {
  try {
    await axios.post(`${API_BASE_URL}/user/post/cheer`, { postId });
    return true;
  } catch (error) {
    console.error('Error cheering posts:', error);
    return false;
  }
};

export const sendFeedback = async (postId: number, message: string): Promise<boolean> => {
  try {
    await axios.post(`${API_BASE_URL}/user/post/feedback`, { postId, message });
    return true;
  } catch (error) {
    console.error('Error sending feedback:', error);
    return false;
  }
};
