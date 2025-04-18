
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define your API response type
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

// Custom error type
export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public response?: AxiosResponse
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// Create axios instance with TypeScript types
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config: axios.InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // You can transform the response here
    return {
      ...response,
      data: response.data
    };
  },
  (error: AxiosError) => {
    // Handle global error messages
    if (error.response) {
      const message = (error.response.data as { message?: string })?.message || 'An error occurred';
      return Promise.reject(new ApiError(
        message,
        error.response.status,
        error.response
      ));
    }
    return Promise.reject(new ApiError('Network error - unable to reach server'));
  }
);

// Helper functions with TypeScript generics
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

// Add other HTTP methods as needed (put, delete, etc.)

export default api;