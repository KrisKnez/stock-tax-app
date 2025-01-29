import { ApiPropertyOptional } from '@nestjs/swagger';
import { Brand } from 'utility-types';

import { Prisma } from '@stock-tax-app/database';
import { IsOptional } from 'class-validator';

export class FilterUserDto implements Brand<object, 'FilterUserDto'> {
  __brand: 'FilterUserDto';

  @ApiPropertyOptional()
  @IsOptional()
  nameContains?: string;

  @ApiPropertyOptional()
  @IsOptional()
  nameStartsWith?: string;

  @ApiPropertyOptional()
  @IsOptional()
  nameEndsWith?: string;

  @ApiPropertyOptional()
  @IsOptional()
  nameEquals?: string;

  @ApiPropertyOptional()
  @IsOptional()
  emailContains?: string;

  @ApiPropertyOptional()
  @IsOptional()
  emailStarsWith?: string;

  @ApiPropertyOptional()
  @IsOptional()
  emailEndsWith?: string;

  @ApiPropertyOptional()
  @IsOptional()
  emailEquals?: string;

  toPrismaWhere(): Prisma.UserWhereInput {
    return {
      name: {
        contains: this.nameContains,
        startsWith: this.nameStartsWith,
        endsWith: this.nameEndsWith,
        equals: this.nameEquals,
        mode: 'insensitive',
      },
      email: {
        contains: this.emailContains,
        startsWith: this.emailStarsWith,
        endsWith: this.emailEndsWith,
        equals: this.emailEquals,
        mode: 'insensitive',
      },
    };
  }
}
