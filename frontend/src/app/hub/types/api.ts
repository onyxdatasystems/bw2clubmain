// src/types/api.ts

export interface User {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
    avatar?: string;  
  bio?: string;  
}

export interface Company {
  id: number;
  name: string;
logo?: string;      
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ad {
  id: number;
  imageUrl: string;
  link: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
