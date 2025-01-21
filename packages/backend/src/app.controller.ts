import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@stock-tax-app/database';

@Controller()
export class AppController {
  prisma: PrismaClient = new PrismaClient();

  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<string> {
    const user = (await this.prisma.user.findMany())[0];

    const swaggerUiDistPath = require
      .resolve('swagger-ui-dist/package.json', {
        paths: [
          require
            .resolve('@nestjs/swagger/package.json')
            .replace('package.json', ''),
        ],
      })
      .replace('package.json', '');

    return (
      user.name +
      require('child_process').execSync(`ls ${swaggerUiDistPath}`).toString()
    );
  }
}
