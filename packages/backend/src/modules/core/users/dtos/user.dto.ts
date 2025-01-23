import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Brand } from 'utility-types';

import { User } from '@stock-tax-app/database';

export class UserDto implements Brand<User, 'UserDto'> {
  __brand: 'UserDto';

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
