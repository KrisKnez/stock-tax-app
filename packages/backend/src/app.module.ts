import { Module } from '@nestjs/common';

import { DatabaseModule } from './infrastructure/database/database.module';
import { UsersModule } from './modules/core/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [],
  exports: [],
})
export class AppModule {}
