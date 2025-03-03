import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @ApiProperty()
  @Expose()
  authToken: string;

  constructor(token: string) {
    this.authToken = token;
  }
}
