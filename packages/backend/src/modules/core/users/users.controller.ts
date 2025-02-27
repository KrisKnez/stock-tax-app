import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { OffsetPaginationDto } from 'src/common/dtos/offset-pagination.dto';
import { PaginatedUserDto } from './dtos/paginated-user.dto';
import { FilterUserDto } from './dtos/filter-user.dto';
import { SortUserDto } from './dtos/sort-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({ type: UserDto, description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  readOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService
      .readOne(
        FilterUserDto.fromObject({
          idEquals: id,
        }),
      )
      .catch(() => {
        throw new NotFoundException(`User with ID ${id} not found`);
      });
  }

  @Get()
  @ApiOkResponse({
    type: PaginatedUserDto,
    description: 'Users found',
  })
  readMany(
    @Query() sortUserDto: SortUserDto,
    @Query() filterUserDto: FilterUserDto,
    @Query() offsetPaginationDto: OffsetPaginationDto,
  ): Promise<PaginatedUserDto> {
    return this.usersService.readMany(
      offsetPaginationDto,
      filterUserDto,
      sortUserDto,
    );
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto, description: 'User updated' })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.update(id, updateUserDto).catch(() => {
      throw new NotFoundException(`User with ID ${id} not found`);
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto, description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  delete(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.delete(id).catch(() => {
      throw new NotFoundException(`User with ID ${id} not found`);
    });
  }
}
