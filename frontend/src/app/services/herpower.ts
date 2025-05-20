import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    // Only run this in the browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchRecommendedCards = async () => {
  try {
    const response = await api.get('/recommended-cards');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recommended cards');
    }
    throw new Error('Failed to fetch recommended cards');
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/profile'); // Adjusted endpoint
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
    throw new Error('Failed to fetch user profile');
  }
};

export const joinClub = async (clubId: string) => {
  try {
    const response = await api.post(`/groups/join/${clubId}`); // Fixed endpoint
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to join club');
    }
    throw new Error('Failed to join club');
  }
};