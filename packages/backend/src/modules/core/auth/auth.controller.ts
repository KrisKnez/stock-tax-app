import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserDto } from '../users/dtos/user.dto';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { AuthTokenDto } from './dtos/auth-token.dto';
import { FilterUserDto } from '../users/dtos/filter-user.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ChangePasswordDto } from './dtos/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiOkResponse({ type: LoginResponseDto, description: 'User logged in' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    return this.authService.register(registerDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<UserDto> {
    const authToken = req.jwt as AuthTokenDto;

    const user = await this.usersService.readOne(
      FilterUserDto.fromObject({
        idEquals: authToken.id,
      }),
    );

    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const authToken = req.jwt as AuthTokenDto;

    return this.authService.changePassword(authToken.id, changePasswordDto);
  }
}
