import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import type { CreateItemDto, Item, CreateItemResponse, GetItemsResponse, ApiResponse as ApiResponseType } from '@/contracts';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  private items: Item[] = [
    {
      id: '1',
      name: 'Sample Item',
      description: 'This is a sample item for demonstration',
      createdAt: new Date().toISOString(),
    },
  ];

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ 
    status: 200, 
    description: 'Successfully retrieved items',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '1' },
                  name: { type: 'string', example: 'Sample Item' },
                  description: { type: 'string', example: 'This is a sample item for demonstration' },
                  createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
                },
              },
            },
          },
        },
      },
    },
  })
  async getItems(): Promise<GetItemsResponse> {
    return { data: this.items };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'New Item' },
        description: { type: 'string', example: 'A description of the new item' },
      },
      required: ['name', 'description'],
    },
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Item successfully created',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '2' },
                name: { type: 'string', example: 'New Item' },
                description: { type: 'string', example: 'A description of the new item' },
                createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Validation failed',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Validation failed: name and description are required' },
            code: { type: 'string', example: 'VALIDATION_ERROR' },
            details: { type: 'object', example: {} },
          },
        },
      },
    },
  })
  async createItem(@Body() createItemDto: CreateItemDto): Promise<CreateItemResponse> {
    // Basic validation
    if (!createItemDto.name || !createItemDto.description) {
      return {
        error: 'Validation failed: name and description are required',
        code: 'VALIDATION_ERROR',
      };
    }

    // Check if item already exists
    if (this.items.find(item => item.name === createItemDto.name)) {
      return {
        error: 'Item with this name already exists',
        code: 'ITEM_EXISTS',
      };
    }

    const newItem: Item = {
      id: (this.items.length + 1).toString(),
      name: createItemDto.name,
      description: createItemDto.description,
      createdAt: new Date().toISOString(),
    };

    this.items.push(newItem);
    return { data: newItem };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Item found',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '1' },
                name: { type: 'string', example: 'Sample Item' },
                description: { type: 'string', example: 'This is a sample item for demonstration' },
                createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Item not found',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Item not found' },
            code: { type: 'string', example: 'ITEM_NOT_FOUND' },
          },
        },
      },
    },
  })
  async getItemById(@Param('id') id: string): Promise<ApiResponseType<Item>> {
    const item = this.items.find(i => i.id === id);
    
    if (!item) {
      return {
        error: 'Item not found',
        code: 'ITEM_NOT_FOUND',
      };
    }

    return { data: item };
  }
}
