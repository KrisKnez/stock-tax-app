import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MeController } from './me.controller';

@Module({
  controllers: [AuthController, MeController],
  providers: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'TODO_CHANGE',
      signOptions: { expiresIn: '600s' },
    }),
  ],
})
export class AuthModule {}
