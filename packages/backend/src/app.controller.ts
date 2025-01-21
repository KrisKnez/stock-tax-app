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

    console.log(process.env.NODE_ENV);

    return user.name;

    // return this.appService.getHello();
  }
}
