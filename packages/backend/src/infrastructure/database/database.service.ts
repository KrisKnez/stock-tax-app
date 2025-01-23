import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@stock-tax-app/database';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
