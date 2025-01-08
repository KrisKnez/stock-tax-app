import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const nestjsSwaggerPath = require
      .resolve('@nestjs/swagger')
      .replace('index.js', '');

    return nestjsSwaggerPath;
    // return this.appService.getHello();
  }

  @Get('cats')
  getCats(): string {
    const nestjsSwaggerPath = require
      .resolve('@nestjs/swagger')
      .replace('index.js', '');

    const swaggerUiDistPath = require.resolve('swagger-ui-dist', {
      paths: [nestjsSwaggerPath],
    });

    return swaggerUiDistPath;
  }

  @Get('dogs')
  getDOgs(): string {
    const swaggerUiDistPath = require.resolve('swagger-ui-dist', {
      paths: ['/'],
    });

    return swaggerUiDistPath;
  }
}
