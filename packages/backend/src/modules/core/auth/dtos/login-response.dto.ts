import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  authToken: string;

  constructor(token: string) {
    this.authToken = token;
  }
}
