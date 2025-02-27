import { PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';
import { Prisma } from '@stock-tax-app/database';
import { plainToInstance } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  static fromObject(updateUserDto: Prisma.UserUpdateInput): UpdateUserDto {
    return plainToInstance(UpdateUserDto, updateUserDto);
  }
}
