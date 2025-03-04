import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { Brand } from 'utility-types';

import { Role, User } from '@stock-tax-app/database';

export class UserDto implements Brand<User, 'UserDto'> {
  __brand: 'UserDto';

  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  password: string;

  @Exclude({
    toPlainOnly: true,
  })
  roles: Role[];

  static fromEntity(user: User): UserDto {
    return plainToInstance(UserDto, user);
  }
}
