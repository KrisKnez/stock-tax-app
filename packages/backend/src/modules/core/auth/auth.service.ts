import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { FilterUserDto } from '../users/dtos/filter-user.dto';
import { UserDto } from '../users/dtos/user.dto';
import { RegisterDto } from './dtos/register.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';

import * as argon2 from 'argon2';
import { LoginResponseDto } from './dtos/login-response.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { AuthToken } from './types/auth-token.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verifyPassword(user: UserDto, password: string): Promise<boolean> {
    return argon2.verify(user.password, password);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService
      .readOne(
        FilterUserDto.fromObject({
          emailEquals: loginDto.email,
        }),
      )
      .catch(() => {
        throw new UnauthorizedException('Incorrect credentials');
      });

    if (!(await this.verifyPassword(user, loginDto.password))) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const token = await this.jwtService.signAsync({
      id: String(user.id),
      roles: user.roles,
    } as AuthToken);

    return new LoginResponseDto(token);
  }

  async register(registerDto: RegisterDto): Promise<UserDto> {
    const user = await this.usersService.create(
      CreateUserDto.fromObject({
        name: registerDto.name,
        email: registerDto.email,
        password: await this.hashPassword(registerDto.password),
      }),
    );

    return UserDto.fromEntity(user);
  }

  async changePassword(
    userId: string,
    { currentPassword, newPassword }: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.usersService.readOne(
      FilterUserDto.fromObject({
        idEquals: userId,
      }),
    );

    if (!(await this.verifyPassword(user, currentPassword))) {
      throw new UnauthorizedException('Incorrect password');
    }

    user.password = await this.hashPassword(newPassword);

    await this.usersService.update(user.id, UpdateUserDto.fromObject(user));
  }
}
