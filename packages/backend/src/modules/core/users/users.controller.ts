import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto, description: 'User created' })
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto, description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  readOne(@Param('id') id: number): Promise<UserDto> {
    return this.usersService
      .readOne(id)
      .catch(() => {
        throw new NotFoundException(`User with ID ${id} not found`);
      });
  }

  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true, description: 'Users found' })
  readMany(): Promise<Array<UserDto>> {
    return this.usersService.readMany();
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
