// lib/apiService.ts
export default class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
  }

  async fetchRecommendedGroups() {
    return this.get('/groups/recommended');
  }

  async fetchTrendingGroups() {
    return this.get('/groups/trending');
  }

  async fetchGroupDetails() {
    return this.get('/groups_details/{groupId}');
  }
  async fetchCategories() {
    return this.get('/categories');
  }
  async fetchGroupsByCategory(categoryId: string) {
    return this.get(`/groups/category/${categoryId}`);
  }

  private async get(endpoint: string) {
    const res = await fetch(`${this.baseUrl}${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
  }
}
