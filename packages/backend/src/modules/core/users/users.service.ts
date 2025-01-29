import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { DatabaseService } from 'src/infrastructure/database/database.service';

import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { OffsetPaginationQueryDto } from 'src/common/dtos/offset-pagination-query.dto';
import { PaginatedUserDto } from './dtos/paginated-user.dto';
import { FilterUserDto } from './dtos/filter-user.dto';
import { SortUserDto } from './dtos/sort-user.dto';

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

  async readMany(
    { offset, limit }: OffsetPaginationQueryDto,
    filterUserDto?: FilterUserDto,
    sortUserDto?: SortUserDto,
  ): Promise<PaginatedUserDto> {
    const users = await this.prismaService.user
      .findMany({
        skip: offset,
        take: limit,
        ...(filterUserDto && { where: filterUserDto.toPrismaWhere() }),
        ...(sortUserDto && { orderBy: sortUserDto.toPrismaOrderBy() }),
      })
      .then((users) => users.map((user) => UserDto.fromEntity(user)));

    const count = await this.prismaService.user.count({
      ...(filterUserDto && { where: filterUserDto.toPrismaWhere() }),
    });

    return PaginatedUserDto.fromEntityArray(users, count, offset, limit);
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
