import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_KEY } from './roles.decorator';
import { AuthToken } from './types/auth-token.type';
import { UsersService } from '../users/users.service';
import { FilterUserDto } from '../users/dtos/filter-user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService
      .verifyAsync<AuthToken>(token)
      .catch(() => {
        throw new UnauthorizedException();
      });

    const user = await this.usersService
      .readOne(
        FilterUserDto.fromObject({
          idEquals: payload.id,
        }),
      )
      .catch(() => {
        throw new UnauthorizedException();
      });

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (
      requiredRoles &&
      !requiredRoles.some((role) => user.roles.includes(role))
    ) {
      return false;
    }

    request['user'] = user;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
