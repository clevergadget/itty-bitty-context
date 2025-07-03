import type { Item, CreateItemDto, GetItemsResponse, CreateItemResponse } from '@/contracts';
import { API_ENDPOINTS } from '@/contracts';

class ApiService {
  private baseUrl: string;

  constructor() {
    // Default to localhost:3000 for development
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Items API methods
  async getItems(): Promise<Item[]> {
    const response = await this.request<GetItemsResponse>(API_ENDPOINTS.ITEMS);
    return response.data || [];
  }

  async createItem(itemData: CreateItemDto): Promise<Item> {
    const response = await this.request<CreateItemResponse>(API_ENDPOINTS.ITEMS, {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
    
    if (!response.data) {
      throw new Error('Failed to create item');
    }
    
    return response.data;
  }

  async updateItem(id: string, itemData: CreateItemDto): Promise<Item> {
    const response = await this.request<CreateItemResponse>(API_ENDPOINTS.ITEM_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
    
    if (!response.data) {
      throw new Error('Failed to update item');
    }
    
    return response.data;
  }

  async deleteItem(id: string): Promise<void> {
    await this.request(API_ENDPOINTS.ITEM_BY_ID(id), {
      method: 'DELETE',
    });
  }

  async getItem(id: string): Promise<Item> {
    const response = await this.request<CreateItemResponse>(API_ENDPOINTS.ITEM_BY_ID(id));
    
    if (!response.data) {
      throw new Error('Item not found');
    }
    
    return response.data;
  }
}

export const apiService = new ApiService();
