// Example DTOs and types for API contracts
export interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface CreateItemDto {
  name: string;
  description: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  code?: string;
  details?: any;
}

export interface GetItemsResponse extends ApiResponse<Item[]> {}
export interface CreateItemResponse extends ApiResponse<Item> {}

// API endpoint paths (for type-safe client generation)
export const API_ENDPOINTS = {
  ITEMS: '/api/items',
  ITEM_BY_ID: (id: string) => `/api/items/${id}`,
  HEALTH: '/api/health',
} as const;
