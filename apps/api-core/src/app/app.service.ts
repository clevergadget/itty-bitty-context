import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string; timestamp: string; status: string } {
    return { 
      message: 'Welcome to api-core!',
      timestamp: new Date().toISOString(),
      status: 'healthy',
    };
  }
}
