import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

import { Prisma } from '@stock-tax-app/database';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
