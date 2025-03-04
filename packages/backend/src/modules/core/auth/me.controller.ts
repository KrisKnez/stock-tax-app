import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserDto } from '../users/dtos/user.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('me')
export class MeController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get()
  async getProfile(@Request() req): Promise<UserDto> {
    const user = req.user as UserDto;

    return user;
  }

  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = req.user as UserDto;

    return this.authService.changePassword(String(user.id), changePasswordDto);
  }
}
