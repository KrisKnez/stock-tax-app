import { ApiPropertyOptional } from '@nestjs/swagger';
import { Brand } from 'utility-types';

import { Prisma } from '@stock-tax-app/database';
import { IsNumberString, IsOptional } from 'class-validator';
import { plainToClass } from 'class-transformer';

export interface IFilterUserDto {
  idEquals?: string;
  nameContains?: string;
  nameStartsWith?: string;
  nameEndsWith?: string;
  nameEquals?: string;
  emailContains?: string;
  emailStartsWith?: string;
  emailEndsWith?: string;
  emailEquals?: string;
}

export class FilterUserDto implements Brand<IFilterUserDto, 'FilterUserDto'> {
  __brand: 'FilterUserDto';

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  idEquals?: string;

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
  emailStartsWith?: string;

  @ApiPropertyOptional()
  @IsOptional()
  emailEndsWith?: string;

  @ApiPropertyOptional()
  @IsOptional()
  emailEquals?: string;

  static fromObject(filterUser: IFilterUserDto): FilterUserDto {
    return plainToClass(FilterUserDto, filterUser);
  }

  toPrismaWhere(): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};

    if (this.idEquals) {
      where.id = {
        equals: Number(this.idEquals),
      };
    }

    if (
      this.nameContains ||
      this.nameStartsWith ||
      this.nameEndsWith ||
      this.nameEquals
    ) {
      where.name = {
        contains: this.nameContains,
        startsWith: this.nameStartsWith,
        endsWith: this.nameEndsWith,
        equals: this.nameEquals,
        mode: 'insensitive',
      };
    }

    if (
      this.emailContains ||
      this.emailStartsWith ||
      this.emailEndsWith ||
      this.emailEquals
    ) {
      where.email = {
        contains: this.emailContains,
        startsWith: this.emailStartsWith,
        endsWith: this.emailEndsWith,
        equals: this.emailEquals,
        mode: 'insensitive',
      };
    }

    return where;
  }
}
