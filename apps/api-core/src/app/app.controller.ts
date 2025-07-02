import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'API is healthy',
    schema: {
      properties: {
        message: { type: 'string', example: 'Welcome to api-core!' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        status: { type: 'string', example: 'healthy' },
      },
    },
  })
  getData() {
    return this.appService.getData();
  }
}
