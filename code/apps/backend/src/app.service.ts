import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return require.resolve('@nestjs/swagger');
    // return 'Hello World!';
  }
}
