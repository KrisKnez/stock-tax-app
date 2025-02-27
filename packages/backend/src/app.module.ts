import { Module } from '@nestjs/common';

import { DatabaseModule } from './infrastructure/database/database.module';
import { UsersModule } from './modules/core/users/users.module';
import { AuthModule } from './modules/core/auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
  providers: [],
  exports: [],
})
export class AppModule {}
