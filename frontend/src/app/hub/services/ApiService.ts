// src/services/ApiService.ts
import { User, Company, Ad, Category, PaginatedResponse } from '../types/api';

type QueryParams = Record<string, string | number | boolean>;

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  }

  protected async fetchData<TResponse>(
    endpoint: string,
    params: QueryParams = {}
  ): Promise<TResponse> {
    try {
      const cleanedBase = this.baseUrl.replace(/\/+$/, '');
      const cleanedEndpoint = endpoint.replace(/^\/+/, '');
      const url = new URL(`${cleanedBase}/${cleanedEndpoint}`);

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json() as TResponse;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
}

export class UserService extends ApiService {
  async getUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    return this.fetchData<PaginatedResponse<User>>('/users', { page, limit });
  }

  async getUserById(id: number): Promise<User> {
    return this.fetchData<User>(`/users/${id}`);
  }
}

export class CompanyService extends ApiService {
  async getCompanies(page = 1, limit = 10): Promise<PaginatedResponse<Company>> {
    return this.fetchData<PaginatedResponse<Company>>('/companies', { page, limit });
  }

  async getCompanyById(id: number): Promise<Company> {
    return this.fetchData<Company>(`/companies/${id}`);
  }
}

export class AdService extends ApiService {
  async getAds(): Promise<Ad[]> {
    return this.fetchData<Ad[]>('/ads');
  }

  async getAdById(id: number): Promise<Ad> {
    return this.fetchData<Ad>(`/ads/${id}`);
  }
}

export class CategoryService extends ApiService {
  async getCategories(): Promise<Category[]> {
    return this.fetchData<Category[]>('/categories');
  }

  async getCategoryById(id: number): Promise<Category> {
    return this.fetchData<Category>(`/categories/${id}`);
  }
}