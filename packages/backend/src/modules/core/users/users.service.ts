import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { DatabaseService } from 'src/infrastructure/database/database.service';

import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.prismaService.user
      .create({
        data: {
          ...createUserDto,
          password: await argon2.hash(createUserDto.password),
        },
      })
      .then((user) => UserDto.fromEntity(user));
  }

  readOne(id: number): Promise<UserDto> {
    return this.prismaService.user
      .findFirstOrThrow({
        where: { id },
      })
      .then((user) => UserDto.fromEntity(user));
  }

  readMany(): Promise<Array<UserDto>> {
    return this.prismaService.user
      .findMany()
      .then((users) => users.map((user) => UserDto.fromEntity(user)));
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    return this.prismaService.user
      .update({
        where: { id },
        data: {
          ...updateUserDto,
          ...(updateUserDto.password && {
            password: await argon2.hash(updateUserDto.password),
          }),
        },
      })
      .then((user) => UserDto.fromEntity(user));
  }

  delete(id: number): Promise<UserDto> {
    return this.prismaService.user
      .delete({
        where: {
          id,
        },
      })
      .then((user) => UserDto.fromEntity(user));
  }
}
