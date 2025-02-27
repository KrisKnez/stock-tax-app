import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { Prisma } from '@stock-tax-app/database';
import { plainToInstance } from 'class-transformer';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  email: string;
  password: string;

  static fromObject(createUserDto: Prisma.UserCreateInput): CreateUserDto {
    return plainToInstance(CreateUserDto, createUserDto);
  }
}
