import { Item, CreateItemDto, API_ENDPOINTS } from './contracts.js';

describe('contracts', () => {
  it('should export Item interface types', () => {
    const item: Item = {
      id: '1',
      name: 'Test Item',
      description: 'This is a test item',
      createdAt: '2023-01-01T00:00:00Z'
    };
    expect(item.id).toBe('1');
    expect(item.name).toBe('Test Item');
  });

  it('should export CreateItemDto interface', () => {
    const createItem: CreateItemDto = {
      name: 'Test Item',
      description: 'This is a test item'
    };
    expect(createItem.name).toBe('Test Item');
    expect(createItem.description).toBe('This is a test item');
  });

  it('should export API endpoints', () => {
    expect(API_ENDPOINTS.ITEMS).toBe('/api/items');
    expect(API_ENDPOINTS.ITEM_BY_ID('123')).toBe('/api/items/123');
    expect(API_ENDPOINTS.HEALTH).toBe('/api/health');
  });
});
